import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

const isConfigured =
  Boolean(publishableKey) &&
  !publishableKey?.includes('xxxxxxxx') &&
  !publishableKey?.includes('example.com') &&
  Boolean(secretKey) &&
  !secretKey?.includes('xxxxxxxx');

const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
]);

const middlewareHandler = isConfigured
  ? clerkMiddleware(async (auth: any, request: any) => {
      if (!isPublicRoute(request)) {
        try {
          await auth.protect({
            unauthenticatedUrl: new URL('/login/', request.url).toString(),
          });
        } catch {
          return NextResponse.redirect(new URL('/login/', request.url));
        }
      }
    })
  : () => NextResponse.next();

export default middlewareHandler;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};

