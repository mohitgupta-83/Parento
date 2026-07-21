"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckoutModal } from "@/components/CheckoutModal";

interface CheckoutContextType {
  openCheckout: () => void;
  closeCheckout: () => void;
  isOpen: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCheckout = () => setIsOpen(true);
  const closeCheckout = () => setIsOpen(false);

  return (
    <CheckoutContext.Provider value={{ openCheckout, closeCheckout, isOpen }}>
      {children}
      <CheckoutModal isOpen={isOpen} onClose={closeCheckout} />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
