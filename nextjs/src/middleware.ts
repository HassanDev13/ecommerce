import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuth } from '../hooks/auth'
 
// This function can be marked `async` if using `await` inside


export function middleware(request: NextRequest) {
 
  
  // if(user){
  //   return NextResponse.redirect(new URL('/artisan/projects', request.url))
  // }else{
  //   return NextResponse.redirect(new URL('/home', request.url))
  // }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/artisan/:path*',
}