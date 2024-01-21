
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useProductContext } from "../../../../../../../context/ProductContext";
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
                     window.location.reload();

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