import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

const isConfigured = Boolean(
  publishableKey &&
  secretKey &&
  !publishableKey.includes('xxxxxxxx') &&
  !publishableKey.includes('example.com')
);

const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
]);

const clerkHandler = isConfigured
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
  : null;

export default async function middleware(request: NextRequest, event: any) {
  if (clerkHandler) {
    try {
      return await clerkHandler(request, event);
    } catch (err) {
      console.error('Clerk middleware error:', err);
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};

