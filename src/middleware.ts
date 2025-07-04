import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
    '/dashboard',
    '/business-intelligence',
    '/financial-analysis',
    '/credit-management',
    '/customer-management',
    '/customer-service',
    '/hr',
    '/process-automation',
    '/settings',
    '/reports'
];
const AUTH_COOKIE_NAME = 'metanoia-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);

  // Redireccionar la ruta raíz
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = sessionCookie ? '/dashboard' : '/login';
    return NextResponse.redirect(url);
  }

  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  // Si el usuario está autenticado y trata de acceder a /login, redirigir a dashboard
  if (sessionCookie && pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Si el usuario no está autenticado y trata de acceder a una ruta protegida, redirigir a /login
  if (!sessionCookie && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (PWA icons)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json).*)',
  ],
};
