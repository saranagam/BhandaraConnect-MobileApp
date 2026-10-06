'use client';

import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#f59e0b',
          colorBackground: '#fafaf9',
          colorText: '#1c1917',
          borderRadius: '1rem',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
