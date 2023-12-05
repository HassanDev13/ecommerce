import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuth } from '../hooks/auth'
 
// This function can be marked `async` if using `await` inside


export function middleware(request: NextRequest) {
  
  console.log("user",request);
  

  // if (user) {
  //   if(user.user_type == 'Consumers'){
  //       // router.push('/');
  //       console.log("user", user?.consumer);
  //   }else if(user.user_type == 'Artisans'){
  //       // router.push('/artisan');
  //       console.log("user", user?.artisan);
  //   }else if(user.user_type == 'DeliveryPersonnel'){
  //       // router.push('/delivery');
  //       console.log("user", user?.deliveryPersonnel);
  //   }
}
  // if(user){
  //   return NextResponse.redirect(new URL('/artisan/projects', request.url))
  // }else{
  //   return NextResponse.redirect(new URL('/home', request.url))
  // }
 

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/artisan/:path*','/login'],
}


// export const config = {
//   matcher: ['/about/:path*', '/dashboard/:path*'],
// }
