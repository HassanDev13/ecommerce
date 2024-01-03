import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ProfileContextProps {
  children: ReactNode;
}

interface ProfileContextType {  
  
 
  isRateSheetOpen: boolean;
  setIsRateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileContextProps> = ({ children }) => {
 

  const [isRateSheetOpen, setIsRateOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <ProfileContext.Provider value={
      {
        isRateSheetOpen,
        setIsRateOpen,
        product,
        setProduct
      }
    }>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};