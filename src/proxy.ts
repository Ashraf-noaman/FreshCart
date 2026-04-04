import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = await getToken({req : request})
    //const isAuthPages = pathname === '/login' || pathname === '/register' || pathname === '/forgotPass';
    const isAuthPages = ["/login", "/register", "/forgotPass"].includes(pathname);

    if(token && isAuthPages) {
        return NextResponse.redirect(new URL('/products', request.url))
    }
    if(!token && !isAuthPages) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

  return NextResponse.next()
}
 
export const config = {
  matcher: ["/login", "/register", "/forgotPass", "/cart"],
}

