import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
        {children}
    </RootProvider>
  );
}
