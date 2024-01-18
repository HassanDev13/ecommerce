"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { CardProvider } from "../../../context/CardContext";
import { EditProfileProvider } from "../../../context/EditProfileContext";
import { ProductProvider } from "../../../context/ProductClientContext";

export default function CardGlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CardProvider>
      <EditProfileProvider>
        <ProductProvider>{children}</ProductProvider>
      </EditProfileProvider>
    </CardProvider>
  );
}
