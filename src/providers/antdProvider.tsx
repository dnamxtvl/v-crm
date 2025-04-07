'use client';

import { useState, useMemo, useEffect } from 'react';
import { StyleProvider, createCache } from '@ant-design/cssinjs';

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const cache = useMemo(() => createCache(), []);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      setIsReady(false);
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
