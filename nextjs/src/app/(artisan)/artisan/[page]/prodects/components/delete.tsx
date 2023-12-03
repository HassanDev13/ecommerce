
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
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast";
import { useDeleteProduct } from "../../../../../../../hooks/prodect-hook";

export default function DeleteProduct() {
    const { isDeleteDialogOpen, setIsDeleteDialogOpen } = useProductContext();
    const deleteProduct = useDeleteProduct();
    const { product } = useProductContext();
    const deleteBtn = () => {
        if (product) {
            console.log('delete product', product.id);
            deleteProduct.mutate(product.id, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    toast({
                        title: "Product deleted Successfully",
                        description: "Prodect deleted Successfully",
                    })
                }
                , onError: () => {
                    setIsDeleteDialogOpen(false);

                }
            });

        }
    }
    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={(open) => setIsDeleteDialogOpen(open)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deleteBtn}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}