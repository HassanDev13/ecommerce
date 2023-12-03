import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountForm } from './_components/accountForm'


export default function Page() {

  return (
    <>

      <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none  lg:px-0">

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] divide-y">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to login
            </p>
          </div>
          <Tabs defaultValue="consumer" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="consumer">Consumer</TabsTrigger>
              <TabsTrigger value="artisan">Artisan</TabsTrigger>
              <TabsTrigger value="delivry">Delivery Man</TabsTrigger>
            </TabsList>
            <TabsContent value="consumer">
              <AccountForm accountType='consumer' redirectPath='/' formType='login' />
            </TabsContent>
            <TabsContent value="artisan">
              <AccountForm accountType='artisan' redirectPath='/artisan/prodects' formType='login' />
            </TabsContent>
            <TabsContent value="delivry">
              <AccountForm accountType='delivry' redirectPath='/delivery' formType='login' />
            </TabsContent>
          </Tabs>



          <div className='w-[400px]'>
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
    </>
  )
}
