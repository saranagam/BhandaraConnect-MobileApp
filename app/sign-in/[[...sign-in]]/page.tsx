import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen bg-[#FAF9F6] dark:bg-slate-950 px-4 py-10">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-lg border border-stone-200',
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/"
      />
    </main>
  );
}
