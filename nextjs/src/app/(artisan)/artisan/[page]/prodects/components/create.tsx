
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
import {
    Form,
    FormControl,
  
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
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
import { useCreateProduct } from "../../../../../../../hooks/prodect-hook";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price_per_piece: z.coerce.number(),
    min_order: z.coerce.number(),
    type: z.string(),
    child_type: z.string()
});

export default function CreateProduct() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const { user } = useAuth({ middleware: 'auth' });
    const craeteProduct = useCreateProduct();
    const { isCreateSheetOpen, setIsCreateProductOpen } = useProductContext();
    const formAct = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price_per_piece: 0,
            min_order: 0,
            type: "",
            child_type: "",
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

        if (user && user.id) {
            console.log(values, user.id);
            console.log('Selected Images:', selectedImages);

            const formdata: InsertProduct = { ...values, user_id: user.id }
            craeteProduct.mutate(formdata, {
                onSuccess: () => {
                    setIsCreateProductOpen(false);
                    toast({
                        title: "Product created Successfully",
                        description: "Prodect created Successfully",
                    })
                },
                onError: (error) => {
                    console.log(error);
                }

            });

        }

    }

    return (
        <Sheet open={isCreateSheetOpen} onOpenChange={(open) => setIsCreateProductOpen(open)}>
            <SheetContent className="w-[800px]">
                <SheetHeader >
                    <SheetTitle>Create new product</SheetTitle>
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
                                        <SelectContent>
                                            <SelectItem value="sugar">Pizza</SelectItem>
                                            <SelectItem value="salt">Pizza 2</SelectItem>
                            
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Image upload field */}
                        <FormItem>
                            <FormLabel>Upload Images</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        <Button className="w-full" type="submit">Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}