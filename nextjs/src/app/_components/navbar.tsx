"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../../../hooks/auth";
import { Button } from "@/components/ui/button";
import EditProfileIcon from "@/components/ui/edit-button-icon";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function Navbar() {
  const { logout , user} = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/artisan",
  });
  const hiddenRoutes = ["/login", "/register"];
  const pathname = usePathname();
  return (
    <nav className="bg-primary w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          Welcome {user?.first_name} {user?.last_name} 
          </span>
        </Link>

        <div className="flex md:order-2 items-center space-x-2">
          <EditProfileIcon hiddenRoutes={hiddenRoutes} pathname={pathname} />
          <Button className="bg-white text-black" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
