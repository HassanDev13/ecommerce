import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOrderArtisanContext } from "../../../../../../../context/OrderArtisanContext";
import Image from "next/image";

export default function ShowOrderProduct() {
  const { isShowOrderProductOpen, setIsShowOrderProductOpen, order } =
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
          <div
            key={product.id}
            className="flex flex-row h-20 space-x-3 my-2 items-center w-full"
          >
            <div className="w-20">
            <Image
              width={60}
              height={60}
              src={process.env.NEXT_PUBLIC_URL_IMAGE + product.images[0].path}
              alt="Picture of the product"
              className="w-full h-full rounded-lg"
            />
            </div>

            <div >
             
              <h1>{product.name} | Quantity :{product.pivot.quantity}</h1>
              <p>Artisan Location : {product.user.address}</p>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
}
