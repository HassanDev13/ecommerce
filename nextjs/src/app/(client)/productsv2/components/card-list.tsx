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

export const CardList = () => {
  const { product } = useProductContext();
  const { cardProducts, setCardOpen, isCardOpen } = useCardContext();
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
                  <div className="absolute z-40 -mt-2 ml-[55px]">X</div>

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
                    <p>{product.price_per_piece * product.min_order} DA</p>
                    <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                      <Button onClick={
                        () => {
                          console.log("add")
                          // update min order 
                          // set as new value to product object
                          // update card context
                          
                        }
                      }>+</Button>
                      <p className="w-6 text-center">
                        <span className="w-full text-sm">{product.min_order}</span>
                      </p>
                      <Button
                      onClick={
                        () => {
                          console.log("remove")
                        }
                      }
                      >-</Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex-none w-full space-y-2 py-4">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p>Total</p>
              <p className="text-sm text-bold">{product?.price_per_piece} DA</p>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setCardOpen(false);
              }}
            >
              Order
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
