"use client"

import { useAuth } from "../../../../hooks/auth"




export default function Page() {

  const { logout } = useAuth({ middleware: 'auth' })


  return (
   <div>
      hellooo
   </div>
  )
}