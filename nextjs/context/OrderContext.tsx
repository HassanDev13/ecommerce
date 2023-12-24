import React, { ReactNode, createContext, useContext, useState } from 'react';

interface OrderContextProps {
  children: ReactNode;
}

interface OrderContextType {  
  
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  isCreateSheetOpen: boolean;
  setIsCreateOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateSheetOpen: boolean;
  setIsUpdateOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<OrderContextProps> = ({ children }) => {
  const [order, setOrder] = useState<Order | null>(null);

  const [isCreateSheetOpen, setIsCreateOrderOpen] = useState<boolean>(false);
  const [isUpdateSheetOpen, setIsUpdateOrderOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  return (
    <OrderContext.Provider value={
      {
        order,
        setOrder,
        isCreateSheetOpen,
        setIsCreateOrderOpen,
        isUpdateSheetOpen,
        setIsUpdateOrderOpen,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen, 
      }
    }>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within a OrderProvider');
  }
  return context;
};