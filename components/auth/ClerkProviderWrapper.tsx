'use client';

import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

const FALLBACK_CLERK_KEY = 'pk_test_Y2xlcmsuZXhhbXBsZS5jb20k';

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const publishableKey = (key && !key.includes('xxxxxxxx')) ? key : FALLBACK_CLERK_KEY;

  return (
    <ClerkProvider
      publishableKey={publishableKey}
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
