import { ReactNode } from 'react';

import type { Metadata } from 'next';

import ClientLayout from '@/app/client-layout';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'KMU:DB Playground',
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
