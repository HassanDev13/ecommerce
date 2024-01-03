import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOrderArtisanContext } from "../../../../../../../context/OrderArtisanContext";


export default function ShowOrderProduct() {
 
  

  const { isShowOrderProductOpen , setIsShowOrderProductOpen , order} =
    useOrderArtisanContext();
 
  return (
    <Sheet
      open={isShowOrderProductOpen}
      onOpenChange={(open) => setIsShowOrderProductOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>Products</SheetTitle>
        </SheetHeader>
        {order?.products.map((product) => (
          <div key={product.id} className="flex flex-row justify-between">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="text-sm font-semibold">{product.name}</div>
                <div className="text-sm font-semibold">{product.price_per_piece}</div>
              </div>
            </div>
          </div>
        ))}

      </SheetContent>
    </Sheet>
  );
}
