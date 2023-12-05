"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

import * as z from "zod"
import { IApiRequest, useAuth } from "../../../../../hooks/auth"
import { Select } from "@/components/ui/select"
import { useEffect } from "react"

const userSchemaRegister = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email().min(2).max(255),
    password: z.string().min(8).max(255),
    first_name: z.string().min(2).max(255),
    last_name: z.string().min(2).max(255),
    description: z.string().max(255),
    adresse: z.string().max(255),
    phone_number: z.string().max(20),
    user_type: z.enum(['Consumers', 'Artisans', 'DeliveryPersonnel']),
});

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
});

interface FormData {
    formType: 'register' | 'login';
    accountType: 'consumer' | 'artisan' | 'delivry';
    redirectPath: string;
}
interface ChildComponentProps {
    login: (loginData: any) => void;
    register: (registerData: any) => void;
}


export function AccountForm({ formType, accountType, redirectPath }: FormData) {
    const router = useRouter();
    const { login, register, user, logout } = useAuth({ middleware: 'guest'});

   // get user data in real time 
    useEffect(() => {
        userFlow();
    }, [user])
    const userFlow = () => {
        if (user) {
            if(user.user_type == 'Consumer'){
                // router.push('/');
                console.log("user", user?.consumer);
                router.push('/');
            }else if(user.user_type == 'Artisan'){
                // router.push('/artisan');
                console.log("user", user?.artisan);
                router.push('/artisan/products');
            }else if(user.user_type == 'DeliveryPersonnel'){
                // router.push('/delivery');
                router.push('/delivery');
                console.log("user", user?.deliveryPersonnel);
            }
        }
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const requestData: IApiRequest = {

            setErrors: (errors) => {
                Object.values(errors).forEach((error) => {
                    console.log("errors when login ", error[0])
                });
            },
            // You might need to handle errors here
            setStatus: (status) => {
                console.log("login good" + status);
                console.log("user", user?.address);
                userFlow();

            }, // You might need to handle status here
            ...values,
            // Add other properties as needed by IApiRequest
        };
        await login(requestData);


    }

    const formlogin = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    return (
        <div>
            {
                <Form {...formlogin}>
                    <form onSubmit={formlogin.handleSubmit(onSubmit)} className="space-y-6 ">
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
                        <button className="p-2 ml-10  w-[470px]     bg-yellow-400 text-black font-bold rounded-lg" type="submit">Login</button>
                    </form>
                </Form>
            }

        </div>
    )
}



function Register({ login, register }: ChildComponentProps) {

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const requestData: IApiRequest = {
            setErrors: (errors) => {
                Object.values(errors).forEach((error) => {
                    console.log("errors when login ", error[0])
                });

            }, // You might need to handle errors here
            setStatus: (status) => {
                console.log("login good" + status)
            }, // You might need to handle status here
            ...values,
            // Add other properties as needed by IApiRequest
        };
        await login(requestData)

    }

    const formRegister = useForm<z.infer<typeof userSchemaRegister>>({
        resolver: zodResolver(userSchemaRegister),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            description: '',
            adresse: '',
            phone_number: '',
            user_type: 'Consumers', // Set a default user_type if needed
        },
    });


    return (
        <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(onSubmit)} className="space-y-4 ">
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

                <FormField
                    control={formRegister.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <FormField
                    control={formRegister.control}
                    name="adresse"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse</FormLabel>
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
                                <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={formRegister.control}
                    name="user_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Type</FormLabel>
                            <FormControl>
                                <Select {...field}>
                                    <option value="Consumers">Consumer</option>
                                    <option value="Artisans">Artisan</option>
                                    <option value="DeliveryPersonnel">Delivery Personnel</option>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <button className="w-full" type="submit">Register</button>
            </form>
        </Form>

    )
}