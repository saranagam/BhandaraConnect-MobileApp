'use client';

import React, { useEffect, useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Compass, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace('/');
    }
  }, [authLoaded, isSignedIn, router]);

  const handleGoogleLogin = async () => {
    if (!signInLoaded || !signIn) return;

    setError(null);
    setIsRedirecting(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback/',
        redirectUrlComplete: '/',
      });
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'errors' in err
          ? (err as { errors?: { message?: string }[] }).errors?.[0]?.message
          : null;
      setError(message || 'Google sign-in failed. Please try again.');
      setIsRedirecting(false);
    }
  };

  const ready = authLoaded && signInLoaded;

  if (authLoaded && isSignedIn) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-[#FAF9F6] dark:bg-slate-950">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#FAF9F6] dark:bg-slate-950 relative overflow-hidden">
      {/* Soft brand atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245, 158, 11, 0.22), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(234, 179, 8, 0.12), transparent 50%)',
        }}
      />

      <div className="relative flex-1 flex flex-col justify-between px-6 pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]">
        {/* Brand hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-600 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/30">
            <Compass className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-xs">
            <h1 className="font-black text-3xl tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-400 dark:via-amber-300 dark:to-yellow-400 bg-clip-text text-transparent">
              BhandaraConnect
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Discover nearby community bhandaras, live menus, and volunteer together.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 w-full max-w-sm mx-auto">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={!ready || isRedirecting}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-stone-100 font-semibold text-base py-3.5 px-4 rounded-2xl shadow-sm hover:bg-stone-50 dark:hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-60 disabled:pointer-events-none"
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                Redirecting to Google…
              </>
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </button>

          <div className="flex items-center gap-3 text-xs text-stone-400">
            <div className="flex-1 h-px bg-stone-200 dark:bg-slate-700" />
            or
            <div className="flex-1 h-px bg-stone-200 dark:bg-slate-700" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="/sign-in/"
              className="text-center text-sm font-semibold py-3 rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-100"
            >
              Sign in
            </a>
            <a
              href="/sign-up/"
              className="text-center text-sm font-semibold py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white"
            >
              Sign up
            </a>
          </div>

          <p className="text-center text-xs text-stone-500 dark:text-stone-500 px-4">
            By continuing, you agree to BhandaraConnect&apos;s community guidelines.
          </p>
        </div>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
