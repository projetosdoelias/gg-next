import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  let userSession = request.cookies.get('userSession')
  if(! userSession && (! (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup') ) )) {
    return NextResponse.redirect(new URL('/login', request.url))  
  }

  if ((request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup') ) && userSession) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}