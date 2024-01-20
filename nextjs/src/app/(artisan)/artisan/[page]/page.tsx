"use client";

import { Icons } from "@/components/ui/icons";
import { useEffect, useState } from "react";
import Orders from "./orders/page";
import Products from "./prodects/page";
import Dashboard from "./dashboard/page";

export default function Page({ params }: { params: { page: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const getChildren = (id: string): JSX.Element => {
    switch (id) {
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "dashboard":
        return <Dashboard />;

      default:
        return <Products />;
    }
  };
  return (
    <>
      <>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          getChildren(params.page)
        )}
      </>
    </>
  );
}
