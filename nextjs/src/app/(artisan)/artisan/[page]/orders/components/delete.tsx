
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
import { useDeleteProduct } from "../../../../../../../hooks/prodect-hook";
import { useOrderArtisanContext } from "../../../../../../../context/OrderArtisanContext";

export default function DeleteOrder() {
    const { isDeleteDialogOpen, setIsDeleteDialogOpen } = useOrderArtisanContext();
    const deleteProduct = useDeleteProduct();
    const { order } = useOrderArtisanContext();
    const deleteBtn = () => {
        if (order && order.id) {
            console.log('delete order', order.id);
            
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