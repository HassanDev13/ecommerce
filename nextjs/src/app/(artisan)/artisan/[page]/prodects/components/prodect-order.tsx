import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProductContext } from "../../../../../../../context/ProductContext";


export const ProjectOrderDetails = () => {
  const {  product  , isSheetProductOrdersOpen , setIsSheetProductOrdersOpen } = useProductContext();

  return (
    <Sheet
      open={isSheetProductOrdersOpen}
      onOpenChange={(open) => setIsSheetProductOrdersOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>{product?.name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-start items-center space-y-4">
          {product?.orders?.length}
        </div>
      </SheetContent>
    </Sheet>
  );
};
