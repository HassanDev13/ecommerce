import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProductContext } from "../../../../../../../context/ProductContext";

export const ProjectOrderDetails = () => {
  const { product, isSheetProductOrdersOpen, setIsSheetProductOrdersOpen } =
    useProductContext();

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
        
          {product?.orders.map((order) => (
            <div
              key={order.id}
              className="h-50 w-full border flex justify-between rounded-xl p-4"
            >
              <div className="flex flex-col">
                <p>
                  {" "}
                  {order.consumer.user.first_name +
                    " " +
                    order.consumer.user.last_name}
                </p>
                <p>{order.created_at}</p>
                <p className="bg-green-200 p-1 w-fit rounded-lg">{order.order_status}</p>
              </div>
             
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
