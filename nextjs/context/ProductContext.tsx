import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ProductContextProps {
  children: ReactNode;
}

interface ProductContextType {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  isCreateSheetOpen: boolean;
  setIsCreateProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateSheetOpen: boolean;
  setIsUpdateProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<ProductContextProps> = ({ children }) => {
  const [product, setProduct] = useState<Product | null>(null);

  const [isCreateSheetOpen, setIsCreateProductOpen] = useState<boolean>(false);
  const [isUpdateSheetOpen, setIsUpdateProductOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  return (
    <ProductContext.Provider value={
      {
        product,
        setProduct,
        isCreateSheetOpen,
        setIsCreateProductOpen,
        isUpdateSheetOpen,
        setIsUpdateProductOpen,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,  
      }
    }>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};