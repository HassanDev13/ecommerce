"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useProfileContext } from "../../../context/profileContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProfile } from "../../../hooks/user-hook";
import { useAuth } from "../../../hooks/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useEditProfileContext } from "../../../context/EditProfileContext";
import { useEffect } from "react";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { toast } from "./use-toast";

export const EditProfileSheet = () => {
  const editProfile = useUpdateProfile();
  const { user } = useAuth({ middleware: "auth" });

  const profileSchema = z.object({
    email: z.optional(z.string()),
    first_name: z.optional(z.string()),
    last_name: z.optional(z.string()),
    description: z.optional(z.string()),
    address: z.optional(z.string()),
    phone_number: z.optional(z.string()),
    user_type: z.enum(["Consumer", "Artisan", "DeliveryPersonnel"]),
    business_name: z.optional(z.string()),
    open_at: z.optional(z.string()),
    close_at:  z.optional(z.string()),
    availability: z.optional(z.boolean()),
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      description: user?.description,
      address: user?.address,
      phone_number: user?.phone_number,
      user_type: "Consumer", // Default value based on your use case
      business_name: user?.artisan?.business_name,
      open_at: user?.artisan?.open_at,
      close_at:  user?.artisan?.close_at,
      availability: user?.delivery_personnel?.availability,
    },
  });

  useEffect(() => {
    if (!user) return;
    form.reset({
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      description: user?.description,
      address: user?.address,
      phone_number: user?.phone_number,
      user_type: user?.user_type, // Default value based on your use case
      business_name: user?.artisan?.business_name,
      open_at: user?.artisan?.open_at,
      close_at: user?.artisan?.close_at,
      availability: user?.delivery_personnel?.availability,
    });
  }, [form, user]);

  const onSubmitProfile = (values: z.infer<typeof profileSchema>) => {
    console.log("Profile Form Values", values);
    if (!user?.id) return;
    editProfile.mutate(
      { id: user?.id, profileInfo: values },
      {
        onSuccess: () => {
          console.log("Profile updated successfully");
          toast({
            title: "Success",
            description: "Profile updated successfully",
        
          });
          
        },
        onError: (error) => {
          console.log("Error while updating profile", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Error while updating profile",
          });
        },
      }
    );
  };

  const { isEditProfileSheetOpen, setEditProfileSheetOpen } =
    useEditProfileContext();
  return (
    <Sheet
      open={isEditProfileSheetOpen}
      onOpenChange={(open) => setEditProfileSheetOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>Edit Prodile</SheetTitle>
        </SheetHeader>
        <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitProfile)}
                className="space-y-4 p-2"
              >
                <FormField
                  control={form.control}
                  name="email"
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
                  control={form.control}
                  name="first_name"
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
                  name="phone_number"
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
                {form.watch().user_type === "Artisan" && (
                  <>
                    <FormField
                      control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                {form.watch().user_type === "DeliveryPersonnel" && (
                  <FormField
                    control={form.control}
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
                <Button
                  type="submit"
                  className="mt-4 w-full font-bold g-yellow-700"
                >
                  Update
                </Button>
              </form>
            </Form>
      </SheetContent>
    </Sheet>
  );
};
