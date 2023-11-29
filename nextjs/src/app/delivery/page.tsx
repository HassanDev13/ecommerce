"use client"


import { useAuth } from "../../../hooks/auth"



export default function page() {

  const { logout } = useAuth({ middleware: 'auth' })


  return (
   <div>
    
   </div>
  )
}