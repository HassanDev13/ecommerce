import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { useOrderArtisanContext } from "../../../../../context/OrderArtisanContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ShowArtisanDetails() {
  const { isShowOrderProductOpen, setIsShowOrderProductOpen, order, } =
    useOrderArtisanContext();

  return (
    <Drawer open={false} onOpenChange={(open) => {}} >
    
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
