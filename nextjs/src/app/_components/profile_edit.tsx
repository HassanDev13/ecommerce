"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "../../../hooks/auth";

const ProfileEdit = () => {
  const { user } = useAuth({ middleware: "auth" });
  const profileSchema = z.object({
    firstName: z.string().min(2).max(255),
    last_name: z.string().min(2).max(255),
    address: z.string().min(2).max(255),
    phoneNumber: z.string().min(2).max(255),
  });

  const formProduct = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.first_name,
      last_name: user?.last_name,
      address: user?.address,
      phoneNumber: user?.phone_number,
    },
  });

  const onSubmitProfile = (values: z.infer<typeof profileSchema>) => {
    console.log("Profile Form Values", values);
  };

  return (
    <aside className=" overflow-y-auto max-h-screen  w-[25%]  border-r-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <Accordion type="single" defaultValue="item-1" className="m-2">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-bold">Profile</AccordionTrigger>
          <AccordionContent>
            <Form {...formProduct}>
              <form
                onSubmit={formProduct.handleSubmit(onSubmitProfile)}
                className="space-y-4 p-2"
              >
                <FormField
                  control={formProduct.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter search term" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formProduct.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              

                <FormField
                  control={formProduct.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formProduct.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>phoneNumber</FormLabel>
                      <FormControl>
                        <Input placeholder="phoneNumber" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-4 w-full font-bold g-yellow-700"
                >
                  Update
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default ProfileEdit;
