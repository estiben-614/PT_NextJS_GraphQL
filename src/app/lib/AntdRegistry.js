'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';
import MainLayout from '../Components/MainLayout';

const cache = createCache();
const StyledComponentsRegistry = ({ children }) => {
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return <>
    
        <StyleProvider cache={cache}>
            <MainLayout >{children}</MainLayout>
            </StyleProvider>;
    
    
    
  
  </>
};

export default StyledComponentsRegistry;