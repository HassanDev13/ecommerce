
import { useProductContext } from "../../../../../../../context/ProductContext";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from "../../../../../../../hooks/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateProduct } from "../../../../../../../hooks/prodect-hook";

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price_per_piece: z.coerce.number(),
    min_order: z.coerce.number(),
    type: z.string(),
    child_type: z.string()
});

export default function UpdateProduct() {

    const { user } = useAuth({ middleware: 'auth' });

    const { isUpdateSheetOpen, setIsUpdateProductOpen, product } = useProductContext();
    const updateProdect = useUpdateProduct();
    useEffect(() => {
        formAct.reset({
            name: product?.name || '',
            description: product?.description || '',
            price_per_piece: product?.price_per_piece || 0,
            min_order: product?.min_order || 0,
            type: product?.type || '',
            child_type: product?.child_type || '',
        })
    }, [product]);

    const formAct = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price_per_piece: 0,
            min_order: 0,
            type: '',
            child_type: '',
        },
    });


    async function onSubmit(values: z.infer<typeof productSchema>) {
        if (user && user.id && product && product.id) {
            console.log(values, user?.id);
            const productId = product?.id;
            const updatedProductData: Partial<Product> = { ...values };
            updateProdect.mutate({ productId, updatedProductData }, {
                onSuccess: () => {
                    setIsUpdateProductOpen(false);
                    toast({
                        title: "Product updated Successfully",
                        description: "Prodect updated Successfully",
                    })
                },
                onError: (error) => {
                    console.log(error);
                }
            });


        }

    }

    return (
        <Sheet open={isUpdateSheetOpen} onOpenChange={(open) => setIsUpdateProductOpen(open)}>
            <SheetContent className="w-[600px]">
                <SheetHeader >
                    <SheetTitle>Update product</SheetTitle>
                </SheetHeader>
                <Form {...formAct}>
                    <form onSubmit={formAct.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={formAct.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Product</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formAct.control}
                            name="description"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>


                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formAct.control}
                            name="min_order"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Min Order</FormLabel>
                                    <FormControl>
                                        <Input type="number"  {...field} />
                                    </FormControl>


                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formAct.control}
                            name="price_per_piece"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price per piece</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>


                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formAct.control}
                            name="type"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="sugar">Sugar</SelectItem>
                                            <SelectItem value="salt">Salt</SelectItem>

                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formAct.control}
                            name="child_type"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Child type" />
                                            </SelectTrigger>
                                        </FormControl>

                                        {formAct.watch('type') === 'sugar' ? (
                                            <SelectContent>
                                                <SelectItem value="brown_sugar">Brown Sugar</SelectItem>
                                                <SelectItem value="white_sugar">White Sugar</SelectItem>
                                                <SelectItem value="powdered_sugar">Powdered Sugar</SelectItem>
                                                <SelectItem value="organic_sugar">Organic Sugar</SelectItem>
                                                <SelectItem value="coconut_sugar">Coconut Sugar</SelectItem>
                                                <SelectItem value="raw_sugar">Raw Sugar</SelectItem>
                                                <SelectItem value="cane_sugar">Cane Sugar</SelectItem>
                                                <SelectItem value="maple_sugar">Maple Sugar</SelectItem>
                                                <SelectItem value="agave_syrup">Agave Syrup</SelectItem>
                                                <SelectItem value="honey">Honey</SelectItem>
                                            </SelectContent>
                                        ) : (
                                            <SelectContent>
                                                <SelectItem value="sea_salt">Sea Salt</SelectItem>
                                                <SelectItem value="table_salt">Table Salt</SelectItem>
                                                <SelectItem value="kosher_salt">Kosher Salt</SelectItem>
                                                <SelectItem value="pink_himalayan_salt">Pink Himalayan Salt</SelectItem>
                                                <SelectItem value="black_salt">Black Salt</SelectItem>
                                                <SelectItem value="celtic_salt">Celtic Salt</SelectItem>
                                                <SelectItem value="smoked_salt">Smoked Salt</SelectItem>
                                                <SelectItem value="garlic_salt">Garlic Salt</SelectItem>
                                                <SelectItem value="onion_salt">Onion Salt</SelectItem>
                                                <SelectItem value="rock_salt">Rock Salt</SelectItem>
                                            </SelectContent>

                                        )}



                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" type="submit">Submit</Button>
                    </form>
                </Form>

            </SheetContent>
        </Sheet>
    )
}