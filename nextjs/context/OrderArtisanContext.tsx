import React, { ReactNode, createContext, useContext, useState } from "react";
import { useUpdateStatus } from "../hooks/order-hook";
import { toast } from "@/components/ui/use-toast";

interface OrderArtisanContextProps {
  children: ReactNode;
}

interface OrderArtisanContextType {
  changeStatus: (status: Order , orderStatus : OrderStatus) => void; // Add this line

  order: Order | null;
  setOrderArtisan: React.Dispatch<React.SetStateAction<Order | null>>;
  delivery: DeliveryPersonnel[] | null;
  setDelivery: React.Dispatch<React.SetStateAction<DeliveryPersonnel[] | null>>;

  isAssignedSheetOpen: boolean;
  setIsAssignedOrderArtisanOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isShowOrderProductOpen: boolean;
  setIsShowOrderProductOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isShowProductOrderOpen: boolean;
  setIsShowProductOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderArtisanContext = createContext<OrderArtisanContextType | undefined>(
  undefined
);

export const OrderArtisanProvider: React.FC<OrderArtisanContextProps> = ({
  children,
}) => {
  const [order, setOrderArtisan] = useState<Order | null>(null);
  const [delivery, setDelivery] = useState<DeliveryPersonnel[] | null>(null);

  const [isAssignedSheetOpen, setIsAssignedOrderArtisanOpen] =
    useState<boolean>(false);
  const [isShowOrderProductOpen, setIsShowOrderProductOpen] =
    useState<boolean>(false);
  const [isShowProductOrderOpen, setIsShowProductOrderOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const change = useUpdateStatus();

  const changeStatus = (order: Order , orderStatus : OrderStatus) => {
   
    change.mutate({
      orderId: String(order.id),
      orderStatus: orderStatus,
    },{
      onSuccess : () => {
        toast({
          title: "Order Status changed",
          description: "Order Accepted Successfully",
        });
      },  
      onError : () => {
        toast({
          title: "Error",
          description: "Error changing order status",
        });
      }
    });
    
  };
  return (
    <OrderArtisanContext.Provider
      value={{
        changeStatus,
        delivery,
        setDelivery,
        order,
        setOrderArtisan,
        isAssignedSheetOpen,
        setIsAssignedOrderArtisanOpen,
        isShowOrderProductOpen,
        setIsShowOrderProductOpen,
        isShowProductOrderOpen,
        setIsShowProductOrderOpen,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
      }}
    >
      {children}
    </OrderArtisanContext.Provider>
  );
};

export const useOrderArtisanContext = () => {
  const context = useContext(OrderArtisanContext);
  if (!context) {
    throw new Error(
      "useOrderArtisanContext must be used within a OrderArtisanProvider"
    );
  }
  return context;
};
