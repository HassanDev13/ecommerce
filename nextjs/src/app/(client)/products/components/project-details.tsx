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
import Rating from "../../profile/rating";

export const ProjectDetails = () => {
  const { isCreateSheetOpen, setIsCreateProductOpen, product } =
    useProductContext();
  const { setCardProducts } = useCardContext();
  return (
    <Sheet
      open={isCreateSheetOpen}
      onOpenChange={(open) => setIsCreateProductOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>{product?.name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-start items-center space-y-4">
          <div className="text-left w-full">
            <p className="text-sm">{product?.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {product?.images.map((product, index) => (
              <Image
                key={index}
                width={100}
                height={100}
                src={process.env.NEXT_PUBLIC_URL_IMAGE + product.path}
                alt="Picture of the author"
                className="w-full rounded-lg"
              />
            ))}
          </div>

          <div className="w-full flex justify-between">
            <p className="text-sm">Price per piece</p>
            <p className="text-sm text-bold">{product?.price_per_piece} DA</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm">Min Order</p>
            <p className="text-sm text-bold">{product?.min_order}</p>
          </div>
          <div className="w-full flex justify-between">
            <h1>Rating </h1>
            <div className="flex space-x-1">
              <Rating initialValue={product?.averageRating} desabled={true}/>
              <p>({product?.ratings.length})</p>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              if (product === null) return;
              const orderProduct: OrderProduct = {
                ...product,
                quantity: product.min_order,
              };
              setCardProducts((currentProducts) => {
                // If currentProducts is null, return a new array with the productToAdd
                if (currentProducts === null) {
                  return [orderProduct];
                }

                // Otherwise, return a new array that includes all current products and the new one
                return [...currentProducts, orderProduct];
              });
              setIsCreateProductOpen(false);
            }}
          >
            Add To Card
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
