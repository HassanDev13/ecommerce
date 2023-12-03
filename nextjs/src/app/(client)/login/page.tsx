import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountForm } from './_components/accountForm';
import Image from 'next/image';
import Ficon1 from '/public/Ficon1.svg';

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 h-screen " >
        {/* Left Column */}
        <div className="hidden md:flex flex-col items-center justify-center ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] divide-y">
    
            <section className='rounded-xl bg-red-50 pb-5 pt-5 w-[550px]  '>
              <Tabs defaultValue="consumer" >
              <TabsList className="grid w-full grid-cols-3  ">
                <TabsTrigger className=' bg-yellow-400 text-bold px-4 py-2 mx-2 rounded-lg mb-2' value="consumer">Consumer</TabsTrigger>
                <TabsTrigger className=' bg-yellow-400 text-bold px-4 py-2 mx-2 rounded-lg mb-2' value="artisan">Artisan</TabsTrigger>
                <TabsTrigger className=' bg-yellow-400 text-bold px-4 py-2 mx-2  rounded-lg mb-2' value="delivry">Delivery Man</TabsTrigger>
              </TabsList>
              <TabsContent  value="consumer">
                <AccountForm  accountType='consumer' redirectPath='/' formType='login' />
              </TabsContent>
              <TabsContent value="artisan">
                <AccountForm accountType='artisan' redirectPath='/artisan/prodects' formType='login' />
              </TabsContent>
              <TabsContent value="delivry">
                <AccountForm accountType='delivry' redirectPath='/delivery' formType='login' />
              </TabsContent>
              </Tabs>
            </section>
          
            <div className='w-[550px]'>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Don't have an account yet?{" "}
                <Link
                  href="/register"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up here
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src={Ficon1} // Replace with your image path
            alt="Yummy!"
            width={350}
            height={200}
          />
        </div>
      </div>
    </>
  );
}
