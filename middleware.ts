import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const hasClerkKey =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('xxxxxxxx') &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('example.com');

const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
]);

export default clerkMiddleware(async (auth: any, request: any) => {
  if (!hasClerkKey) {
    return NextResponse.next();
  }

  if (!isPublicRoute(request)) {
    try {
      await auth.protect({
        unauthenticatedUrl: new URL('/login/', request.url).toString(),
      });
    } catch {
      // In case auth.protect fails or redirects
      return NextResponse.redirect(new URL('/login/', request.url));
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};

