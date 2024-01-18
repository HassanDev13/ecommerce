"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOrderArtisanContext } from "../../../../../../../context/OrderArtisanContext";
import { useAllDelivery } from "../../../../../../../hooks/user-hook";
import { Button } from "@/components/ui/button";
import { useAssignOrderToDeliveryPerson } from "../../../../../../../hooks/order-hook";
import { toast } from "@/components/ui/use-toast";

export default function Assigned() {
  const { isAssignedSheetOpen, setIsAssignedOrderArtisanOpen, order } =
    useOrderArtisanContext();
  const data = useAssignOrderToDeliveryPerson();
  const { data: delivery } = useAllDelivery();
  return (
    <Sheet
      open={isAssignedSheetOpen}
      onOpenChange={(open) => setIsAssignedOrderArtisanOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>Assigned #{order?.id} to :</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          {delivery?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row border p-4 w-full justify-between items-center space-x-4"
            >
              <div className="flex flex-col">
                <div className="flex  justify-between items-center space-x-2">
                  <h1 className="text-sm font-bold">{item.user.first_name}</h1>
                  <h1 className="text-sm font-bold">{item.user.last_name}</h1>
                </div>
                <p className="text-sm">
                  {item.availability === 1 ? "Available" : "Not Available"}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    if (order?.id)
                      data.mutate(
                        {
                          orderId: String(order?.id),
                          deliveryPersonnelId: String(item.id),
                          orderStatus : "assigned"
                        },
                        {
                          onSuccess : () => {
                            toast({
                              title: "Assigned",
                              description: "Assigned Successfully",
                            });
                          },  
                          onError : () => {
                            toast({
                              title: "Error",
                              description: "Error Occured",
                            });
                          }
                        }
                      );
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
