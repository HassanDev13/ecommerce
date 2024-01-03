import React, { ReactNode, createContext, useContext, useState } from "react";

interface OrderArtisanContextProps {
  children: ReactNode;
}

interface OrderArtisanContextType {
  order: Order | null;
  setOrderArtisan: React.Dispatch<React.SetStateAction<Order | null>>;

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

  const [isAssignedSheetOpen, setIsAssignedOrderArtisanOpen] =
    useState<boolean>(false);
  const [isShowOrderProductOpen, setIsShowOrderProductOpen] =
    useState<boolean>(false);
  const [isShowProductOrderOpen, setIsShowProductOrderOpen] =
    useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState<boolean>(false);
  return (
    <OrderArtisanContext.Provider
      value={{
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
