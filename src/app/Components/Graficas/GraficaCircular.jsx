'use client'
import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { useGetPrediosQuery } from '../../../../redux/api/Predios/predioApi';

export const GraficaCircular = () => {
  const [first, setFirst] = useState([]);

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2;

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  // Obtenemos los predios
  const { data: predios } = useGetPrediosQuery();

  useEffect(() => {
    if (predios) {
      const prediosByDepartamento = predios.data.predio;
      // Objeto para almacenar el recuento de predios por departamento (hashmap)
      const departamentoCount = {};

      // Recorremos el array de predios y contamos cuántos tienen cada departamento
      prediosByDepartamento.forEach((predio) => {
        const departamento = predio.departamento;
        if (departamentoCount[departamento]) {
          departamentoCount[departamento]++;
        } else {
          departamentoCount[departamento] = 1;
        }
      });

      console.log(departamentoCount);
      setFirst(
        Object.entries(departamentoCount).map(([departamento, count]) => ({
          type: departamento,
          value: count,
        }))
      );
    }
  }, [predios]);

  const config = {
    appendPadding: 10,
    data: first, 
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} `,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Total predios: ';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config} />;
};
