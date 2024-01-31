import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useProfileContext } from "../../../../context/profileContext";
import Rating from "./rating";
import { useAddRating } from "../../../../hooks/prodect-hook";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "../../../../hooks/auth";
import { useOrderContext } from "../../../../context/OrderContext";

export const RatingSheet = () => {
  const { product, isRateSheetOpen, setIsRateOpen  } = useProfileContext();
  const {order} = useOrderContext();
  const addRating = useAddRating();
  const { user } = useAuth({ middleware: "auth" });
  const handleRatingChange = (value: number) => {
    console.log(`Rating changed to: ${value}`);
    if(!user) return toast({
      title: "error",
      description: "Please login to add rating",
    });

    const rating: SendRating = {
      rating: value,
      product_id: product?.id,
      consumer_id: user.id,
      ratingType: "Product",
    };
    addRating.mutate(rating, {
      onSuccess: () => {
        toast({
          title: "success",
          description: "Rating added successfully",
        });
      },
    });
  };
  const handleRatingChangeArtisan = (value: number) => {
    console.log(`Rating changed to: ${value}`);
    if(!user) return toast({
      title: "error",
      description: "Please login to add rating",
    });
    
    const rating: SendRating = {
      rating: value,
      artisan_id: product?.user.artisan.id,
      consumer_id: user.id,
      ratingType: "Artisan",
    };
    addRating.mutate(rating, {
      onSuccess: () => {
        toast({
          title: "success",
          description: "Rating added successfully",
        });
      },
    });
  };
  const handleRatingChangeDeliveryBoy = (value: number) => {
    if(!order?.delivery_personnel_id){
      toast({
        title: "error",
        description: `Rating changed to: ${value} d id ${order?.delivery_personnel_id} / ${order?.delivery_personnel.id}`,
      });
    }
    console.log(`Rating changed to: ${value} d id ${order?.delivery_personnel_id}`);
    if(!user) return toast({
      title: "error",
      description: "Please login to add rating",
    });
    
    const rating: SendRating = {
      rating: value,
      delivery_personnel_id : order?.delivery_personnel_id,
      consumer_id: user.id,
      ratingType: "DeliveryPersonnel",
    };
    addRating.mutate(rating, {
      onSuccess: () => {
        toast({
          title: "success",
          description: "Rating added successfully",
        });
      },
    });
  };
  return (
    <Sheet open={isRateSheetOpen} onOpenChange={(open) => setIsRateOpen(open)}>
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
          <div className="flex w-full  justify-between">
            <h1>Product rating</h1>
            <Rating initialValue={0} onChange={handleRatingChange} />
          </div>
          <div className="flex w-full  justify-between">
            <h1>Artisan rating</h1>
            <Rating initialValue={0} onChange={handleRatingChangeArtisan} />
          </div>
          <div className="flex w-full  justify-between">
            <h1>Delivery boy rating</h1>
            <Rating initialValue={0} onChange={handleRatingChangeDeliveryBoy} />
          </div>
         
        </div>
      </SheetContent>
    </Sheet>
  );
};
