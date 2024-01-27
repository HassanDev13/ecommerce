"use client"
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IApiRequest, useAuth } from "../../../../../hooks/auth";
import { Select } from "@/components/ui/select";
import { useEffect, useState } from "react";
import * as z from "zod"
import { Spinnaker } from "next/font/google";
import { Icons } from "@/components/ui/icons";


const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

interface FormData {
  formType: "register" | "login";
  accountType: "consumer" | "artisan" | "delivry";
  redirectPath: string;
}

export function AccountForm({
  formType,
  accountType,
  redirectPath,
}: FormData) {
  const router = useRouter();
  const { login, register, user, logout } = useAuth({
    middleware: "guest",
  });

  const [loading, setLoading] = useState(false);

  // get user data in real time
  useEffect(() => {
    userFlow();
  }, [user]);

  const userFlow = () => {
    if (user) {
      if (user.user_type == "Consumer") {
        router.push("/profile");
      } else if (user.user_type == "Artisan") {
        router.push("/artisan/dashboard");
      } else if (user.user_type == "DeliveryPersonnel") {
        router.push("/delivery");
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
         console.log("loading" );
         await new Promise((resolve) => setTimeout(resolve, 2000));

      const requestData: IApiRequest = {
        setErrors: (errors) => {
          Object.values(errors).forEach((error) => {
            console.log("errors when login ", error[0]);
          });
        },
        setStatus: (status) => {
          console.log("login good" + status);
          console.log("user", user?.address);
          userFlow();
        },
        ...values,
      };
      await login(requestData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  }

  const formlogin = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <Form {...formlogin}>
        <form
          onSubmit={formlogin.handleSubmit(onSubmit)}
          className="space-y-6 "
        >
          <FormField
            control={formlogin.control}
            name="email"
            render={({ field }) => (
              <FormItem className="px-10 text-left">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formlogin.control}
            name="password"
            render={({ field }) => (
              <FormItem className="px-10 text-left">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="p-2 ml-10 w-[470px] bg-yellow-400 text-black font-bold rounded-lg relative"
            type="submit"
            disabled={loading}
          >
            {loading && (
                <Icons.spinner className="ml-[50%] h-6 w-4 animate-spin" />
            )}
            {!loading && "Login"}
          </button>
        </form>
      </Form>
    </div>
  );
}
