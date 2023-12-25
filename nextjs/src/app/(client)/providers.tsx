"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { CardProvider } from "../../../context/CardContext";

export default function CardGlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <CardProvider>
      {children}
    </CardProvider>
  );
}