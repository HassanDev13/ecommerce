import React, { ReactNode, createContext, useContext, useState } from "react";
import { useAllProducts } from "../hooks/prodect-hook";

interface ProductContextProps {
  children: ReactNode;
}

interface ProductContextType {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  artisan: Artisan | null;
  setArtisan: React.Dispatch<React.SetStateAction<Artisan | null>>;
  prams: ProductQueryParams | undefined;
  pramsArtisan: ArtisanQueryParams | undefined;
  setPrams: React.Dispatch<React.SetStateAction<ProductQueryParams | undefined>>;
  setPramsArtisan: React.Dispatch<React.SetStateAction<ArtisanQueryParams | undefined>>;

  isCreateSheetOpen: boolean;
  setIsCreateProductOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isSheetArtisanDetailsOpen: boolean;
  setIsSheetArtisanDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isUpdateSheetOpen: boolean;
  setIsUpdateProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterOn: boolean;
  setFilterOn: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  GetAllProducts : (prams? : ProductQueryParams ) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<ProductContextProps> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [isCreateSheetOpen, setIsCreateProductOpen] = useState<boolean>(false);

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [isSheetArtisanDetailsOpen, setIsSheetArtisanDetailsOpen] = useState<boolean>(false);

  const [isUpdateSheetOpen, setIsUpdateProductOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [prams, setPrams] = useState<ProductQueryParams | undefined>(undefined);
  const [pramsArtisan, setPramsArtisan] = useState<ArtisanQueryParams | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  const GetAllProducts = () => {
   
  }
  return (
    <ProductContext.Provider
      value={{
        artisan,
        setArtisan,
        isSheetArtisanDetailsOpen,
        setIsSheetArtisanDetailsOpen,
        pramsArtisan,
        setPramsArtisan,
        filterOn,
        setFilterOn,
        prams,
        setPrams,
        GetAllProducts,
        products,
        setProducts,
        product,
        setProduct,
        isCreateSheetOpen,
        setIsCreateProductOpen,
        isUpdateSheetOpen,
        setIsUpdateProductOpen,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};



export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
