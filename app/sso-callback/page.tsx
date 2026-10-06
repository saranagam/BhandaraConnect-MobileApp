'use client';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function SSOCallbackPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] dark:bg-slate-950 gap-3">
      <AuthenticateWithRedirectCallback />
      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      <p className="text-sm text-stone-500">Finishing Google sign-in…</p>
    </div>
  );
}
