import React, { ReactNode, createContext, useContext, useState } from "react";

interface EditProfileContextProps {
  children: ReactNode;
}

interface EditProfileContextType {
  isEditProfileSheetOpen: boolean;
  setEditProfileSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileContext = createContext<EditProfileContextType | undefined>(undefined);

export const EditProfileProvider: React.FC<EditProfileContextProps> = ({
  children,
}) => {
  const [isEditProfileSheetOpen, setEditProfileSheetOpen] = useState<boolean>(false);

  return (
    <EditProfileContext.Provider
      value={{
        isEditProfileSheetOpen,
        setEditProfileSheetOpen,
       
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfileContext = () => {
  const context = useContext(EditProfileContext);
  if (!context) {
    throw new Error("useEditProfileContext must be used within a EditProfileProvider");
  }
  return context;
};
