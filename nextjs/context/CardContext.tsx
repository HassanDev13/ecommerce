import React, { ReactNode, createContext, useContext, useState } from "react";

interface CardContextProps {
  children: ReactNode;
}

interface CardContextType {
  cardProducts: OrderProduct[] | null;
  setCardProducts: React.Dispatch<React.SetStateAction<OrderProduct[] | null>>;
  isCardOpen: boolean;
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<CardContextProps> = ({
  children,
}) => {
  const [cardProducts, setCardProducts] = useState<OrderProduct[] | null>(null);
  const [isCardOpen, setCardOpen] = useState<boolean>(false);

  return (
    <CardContext.Provider
      value={{
        cardProducts,
        setCardProducts,
        isCardOpen,
        setCardOpen
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
