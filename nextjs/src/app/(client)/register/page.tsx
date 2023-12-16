"use client";
import React, { useState } from "react";
import Image from "next/image";
import Ficon1 from "/public/Ficon1.svg";
import { Input } from "@/components/ui/input";
//date-time-picker/time-picker
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { IApiRequest, useAuth } from "../../../../hooks/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const RegistrationPage = () => {
  const router = useRouter();
  const { login, register, user, logout } = useAuth({ middleware: "guest" });

  const userSchemaRegister = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email().min(2).max(255),
    password: z.string().min(8).max(255),
    password_confirmation: z.string().min(8).max(255),
    first_name: z.string().min(2).max(255),
    last_name: z.string().min(2).max(255),
    description: z.string().max(255),
    address: z.string().max(255),
    phone_number: z.string().max(20),
    user_type: z.enum(["Consumer", "Artisan", "DeliveryPersonnel"]),
    business_name: z.string().max(255),
    open_at: z.string().max(255),
    close_at: z.string().max(255),
    availability: z.boolean(),
  });

  useEffect(() => {
    userFlow();
  }, [user]);
  const userFlow = () => {
    if (user) {
      if (user.user_type == "Consumer") {
        // router.push('/');
        console.log("user", user?.consumer);
        router.push("/");
      } else if (user.user_type == "Artisan") {
        // router.push('/artisan');
        console.log("user", user?.artisan);
        router.push("/artisan/products");
      } else if (user.user_type == "DeliveryPersonnel") {
        // router.push('/delivery');
        router.push("/delivery");
        console.log("user", user?.deliveryPersonnel);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof userSchemaRegister>) {
    console.log("values", values);

    const requestData: IApiRequest = {
      setErrors: (errors) => {
        Object.values(errors).forEach((error) => {
          console.log("errors when login ", error[0]);
        });
      }, // You might need to handle errors here
      setStatus: (status) => {
        console.log("login good" + status);
      }, // You might need to handle status here
      ...values,
      // Add other properties as needed by IApiRequest
    };
    await register(requestData);
  }

  const formRegister = useForm<z.infer<typeof userSchemaRegister>>({
    resolver: zodResolver(userSchemaRegister),
    defaultValues: {
      name: "Test",
      email: "test@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
      first_name: "hacene",
      last_name: "zerrouk",
      description: "test desciprtion",
      address: "fake address ",
      phone_number: "0559326589",
      user_type: "Consumer", // Set a default user_type if needed
      availability: false,
      business_name: "Beratna",
      open_at: "13:51",
      close_at: "01:51",
    },
  });

  return (
    <section className="h-screen  w-screen">
      <div className="flex justify-center items-center h-full bg-white ">
        <div className="p-10">
          <Form {...formRegister}>
            <form
              onSubmit={formRegister.handleSubmit(onSubmit)}
              className="space-y-4 "
            >
              <FormField
                control={formRegister.control}
                name="user_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="User type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Consumer">Consumer</SelectItem>
                          <SelectItem value="Artisan">Artisan</SelectItem>
                          <SelectItem value="DeliveryPersonnel">
                            DeliveryPersonnel
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formRegister.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formRegister.watch().user_type === "Artisan" && (
                <FormField
                  control={formRegister.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your bessniss name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex space-x-2">
                <FormField
                  control={formRegister.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formRegister.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-2">
                <FormField
                  control={formRegister.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formRegister.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-2">
                <FormField
                  control={formRegister.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formRegister.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Confirmation</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirmation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {formRegister.watch().user_type === "Artisan" && (
                <>
                  <FormField
                    control={formRegister.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about your bessniess"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <FormField
                      control={formRegister.control}
                      name="open_at"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Open at</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formRegister.control}
                      name="close_at"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Close at</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              {formRegister.watch().user_type === "DeliveryPersonnel" && (
                // <FormField
                //   control={formRegister.control}
                //   name="availability"
                //   render={({ field }) => (
                //     <FormItem>
                //       <FormLabel>Availability</FormLabel>
                //       <FormControl>
                //         <Switch
                //           checked={field.value}
                //           onCheckedChange={field.onChange}
                //         />
                //       </FormControl>
                //       <FormMessage />
                //     </FormItem>
                //   )}
                // />
                <FormField
                  control={formRegister.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Availability
                        </FormLabel>
                        <FormDescription>
                          Your Default status will be available ?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
          </Form>
        </div>
        <div className="hidden md:flex  items-center justify-center">
          <Image
            src={Ficon1} // Replace with your image path
            alt="Yummy!"
            width={350}
            height={200}
          />
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
