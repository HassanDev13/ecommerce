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

export const ArtisanDetails = () => {
  const { isSheetArtisanDetailsOpen, setIsSheetArtisanDetailsOpen, artisan } =
    useProductContext();
  const { setCardProducts } = useCardContext();
  return (
    <Sheet
      open={isSheetArtisanDetailsOpen}
      onOpenChange={(open) => setIsSheetArtisanDetailsOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>{artisan?.business_name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-start items-center space-y-4">
          <div className="text-left w-full">
            <p className="text-sm">{artisan?.description}</p>
          </div>

          <div className="w-full flex justify-between">
            <p className="text-sm">Open At</p>
            <p className="text-sm text-bold bg-green-200 p-1 w-fit rounded-lg">{artisan?.open_at}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm">Close At</p>
            <p className="text-sm text-bold bg-green-200 p-1 w-fit rounded-lg">{artisan?.close_at}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm">Location</p>
            <p className="text-sm text-bold bg-green-200 p-1 w-fit rounded-lg">{artisan?.user.address}</p>
          </div>
          <div className="w-full flex justify-between">
            <h1>Rating </h1>
            <div className="flex space-x-1">
              <Rating initialValue={artisan?.average_rating} desabled={true} />
              <p>({artisan?.ratings.length})</p>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              setIsSheetArtisanDetailsOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
