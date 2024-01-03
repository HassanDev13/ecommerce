import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOrderArtisanContext } from "../../../../../../../context/OrderArtisanContext";


export default function Assigned() {
 
 

  const { isAssignedSheetOpen, setIsAssignedOrderArtisanOpen , order } =
    useOrderArtisanContext();
 
  return (
    <Sheet
      open={isAssignedSheetOpen}
      onOpenChange={(open) => setIsAssignedOrderArtisanOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>Assigned #{order?.id} to :</SheetTitle>
        </SheetHeader>
        
      </SheetContent>
    </Sheet>
  );
}
