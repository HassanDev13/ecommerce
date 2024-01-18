'use client';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProductContext } from "../../../../../context/ProductClientContext";
import Image from "next/image";
import { useCardContext } from "../../../../../context/CardContext";
import { set } from "react-hook-form";
import { XCircle } from "lucide-react";
import { useAuth } from "../../../../../hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { useCreateOrder } from "../../../../../hooks/order-hook";

export const CardList = () => {
  const { product } = useProductContext();
  const createOrderMutation = useCreateOrder();
  const { cardProducts, setCardOpen, isCardOpen, setCardProducts } =
    useCardContext();
  const { user } = useAuth({ middleware: "guest" });

  const calculateTotal = () => {
    if (cardProducts === null) return null;
    let total = 0;
    cardProducts.forEach((product) => {
      total += Number(product.price_per_piece )* product.quantity;
    });
    return total;
  };
  return (
    <Sheet open={isCardOpen} onOpenChange={(open) => setCardOpen(open)}>
      <SheetContent className="w-[800px] h-full">
        <SheetHeader>
          <SheetTitle>{product?.name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-start items-center space-y-4 h-full ">
          <div className=" flex-grow  overflow-y-auto w-full">
            {cardProducts &&
              cardProducts.map((product, index) => (
                <div
                  key={index}
                  className="relative flex w-full flex-row justify-between px-1 py-4"
                >
                  <div className="absolute z-40 -mt-2 ml-[55px]">
                    <XCircle
                      fill="white"
                      onClick={() => {
                        setCardProducts((currentProducts) => {
                          if (currentProducts === null) return null;

                          // Create a new array by filtering out the product to delete
                          const newProducts = currentProducts.filter(
                            (_, i) => i !== index
                          );

                          return newProducts.length > 0 ? newProducts : null;
                        });
                      }}
                    />
                  </div>

                  <div className=" relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 ">
                    <Image
                      width={60}
                      height={60}
                      src={
                        process.env.NEXT_PUBLIC_URL_IMAGE +
                        product.images[0].path
                      }
                      alt="Picture of the author"
                      className="w-full h-full rounded-lg"
                    />
                  </div>

                  <div className="flex flex-1 flex-col text-base px-4">
                    <span className="leading-tight">{product.name}</span>
                  </div>

                  <div className="flex h-16 flex-col justify-between">
                    <p>{product.price_per_piece} DA</p>
                    <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                      <Button
                        onClick={() => {
                          console.log("add");

                          setCardProducts((currentProducts) => {
                            if (currentProducts === null) return null;

                            // Create a new array by mapping over the currentProducts
                            const newProducts = currentProducts.map(
                              (product, i) => {
                                // If the current product is the one we want to update, return a new object
                                if (i === index) {
                                  return {
                                    ...product,
                                    quantity: product.quantity + 1,
                                  };
                                }

                                // Otherwise, return the original product
                                return product;
                              }
                            );

                            return newProducts;
                          });
                        }}
                      >
                        +
                      </Button>
                      <p className="w-6 text-center">
                        <span className="w-full text-sm">
                          {product.quantity}
                        </span>
                      </p>
                      <Button
                        onClick={() => {
                          setCardProducts((currentProducts) => {
                            if (currentProducts === null) return null;
                            if(product.min_order >= product.quantity){
                              toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Minimum order is " + product.min_order,
                              });
                              return currentProducts;
                            }
                            // Create a new array by mapping over the currentProducts
                            const newProducts = currentProducts.map(
                              (product, i) => {
                                // If the current product is the one we want to update, return a new object
                                
                                if (i === index) {
                                  return {
                                    ...product,
                                    quantity: product.quantity - 1,
                                  };
                                }

                                // Otherwise, return the original product
                                return product;
                              }
                            );

                            return newProducts;
                          });
                        }}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex-none w-full space-y-2 py-4">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p>Total</p>
              <p className="text-sm text-bold">{calculateTotal()} DA</p>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (!cardProducts) {
                  toast({
                    variant: "destructive",
                    title: "No orders provided",
                    description: "Select Order first",
                  });
                  return;
                }
                const transformedOrder: SendOrder | undefined =
                  transformOrdersToSendOrder(cardProducts);
                if (!transformedOrder) return;
                createOrderMutation.mutate(transformedOrder, {
                  onSuccess: () => {
                    setCardProducts(null);
                    setCardOpen(false);
                    toast({
                      title: "Success",
                      description: "Order created successfully",
                    });
                  },
                  onError: (error) => {
                   
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Error while creating order",
                    });
                  }
                });
                console.log(transformedOrder);
              
              }}
            >
              Order
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
  function transformOrdersToSendOrder(
    orderProducts: OrderProduct[]
  ): SendOrder | undefined {
    if (orderProducts.length === 0) {
      toast({
        variant: "destructive",
        title: "No orders provided",
        description: "Select Order first",
      });
      return;
    }
    if (!user) {
      toast({
        variant: "destructive",
        title: "Create account to order",
        description: "Register or login to order",
      });
      return;
    }
    // Assuming order status and delivery address are the same for all orders
    const orderStatus = "unprocessed";
    const deliveryAddress = user.address;

    const sendOrder: SendOrder = {
      orderProducts: orderProducts.map((orderProduct) => ({
        product_id: orderProduct.id,
        quantity: orderProduct.quantity,
        artisan_id : orderProduct.user.artisan.id
      })),
      orderStatus,
      delivery_address: deliveryAddress,
    };

    return sendOrder;
  }
};
