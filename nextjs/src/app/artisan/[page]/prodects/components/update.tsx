
import { useProductContext } from "../../../../../../context/ProductContext";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { z } from "zod";
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
import { useAuth } from "../../../../../../hooks/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price_per_piece: z.coerce.number(),
    min_order: z.coerce.number(),
    type: z.string(),
    child_type: z.string()
});

export default function UpdateProduct() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const { user } = useAuth({ middleware: 'auth' });

    const { isUpdateSheetOpen, setIsUpdateProductOpen, product } = useProductContext();

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            // Convert FileList to array and update state
            const imagesArray = Array.from(files);
            setSelectedImages(imagesArray);
        }
    };

    async function onSubmit(values: z.infer<typeof productSchema>) {
        console.log(values, user?.id);
        console.log('Selected Images:', selectedImages);
        toast({
            title: "Product updated Successfully",
            description: "Prodect updated Successfully",
        })
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
                                        <Input type="text" placeholder="Description" {...field} />
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
                                    <FormControl>
                                        <Input placeholder="Type" {...field} />
                                    </FormControl>


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