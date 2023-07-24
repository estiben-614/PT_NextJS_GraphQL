'use client'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { useGetConstruccionesQuery } from '../../../../redux/api/Construcciones/construccionesApi';

export const TipoDeConstrucciones = () => {
    const [tiposDeContrucciones, setTiposDeContrucciones] = useState([]);

    // Obtenemos los cosntrucciones
    const { data: construcciones } = useGetConstruccionesQuery();
    useEffect(() => {
        if (construcciones) {
        const construccionesTotales = construcciones.data.construcciones;
        // Objeto para almacenar el recuento de tipos de construcciones
        const tipoConstruccionCount = {};

        // Recorremos el array de construcciones y contamos cuántos 
        construccionesTotales.forEach((construccion) => {
            const tipoConstruccion = construccion.tipo_construccion;
            if (tipoConstruccionCount[tipoConstruccion]) {
                tipoConstruccionCount[tipoConstruccion]++;
            } else {
                tipoConstruccionCount[tipoConstruccion] = 1;
            }
        });

        setTiposDeContrucciones(
            Object.entries(tipoConstruccionCount).map(([tipoConstruccion, count]) => ({
            type: tipoConstruccion,
            value: count,
            }))
        );
        }
        else {
            setTiposDeContrucciones([])
        }
    }, [construcciones]);

  
  const config = {
    appendPadding: 20,
    data:tiposDeContrucciones,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

