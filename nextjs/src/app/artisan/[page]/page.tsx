'use client'
import Rating from './rating/page';
import Orders from './orders/page';
import Products from './prodects/page';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { Sheet } from '@/components/ui/sheet';
import Sidebar from '@/app/_components/sidebar';
import Navbar from '@/app/_components/navbar';


export default function page({ params }: { params: { page: string } }) {
 
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
      case "rating":
        return <Rating />;
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
          <div className="flex h-screen">
            <Sheet>
              {/* Sidebar */}
              <div className="hidden sm:inline-block ">
                <Sidebar />
              </div>
              <div className="sm:hidden inline-block ">
                <Sidebar />
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <>
                  <Navbar/>
                </>

                <main className="relative flex-1 overflow-x-hidden overflow-y-auto p-2">
                  {getChildren(params.page)}
                </main>
              </div>
            </Sheet>
          </div>
        )}
      </>
    </>
  )
}
