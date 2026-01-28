"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { AuthStore } from "@/stores/authStore";
import { CardsStore } from "@/stores/cardsStore";
import { HistoryStore } from "@/stores/historyStore";
import { ServiceWorkerRegister } from "@/components/Pwa/ServiceWorkerRegister";

type Stores = {
  auth: AuthStore;
  cards: CardsStore;
  history: HistoryStore;
};

const StoresContext = createContext<Stores | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const stores = useMemo<Stores>(() => {
    const auth = new AuthStore();
    return {
      auth,
      cards: new CardsStore(auth),
      history: new HistoryStore(auth),
    };
  }, []);

  // Гидрация токена из localStorage
  useEffect(() => {
    stores.auth.hydrate();
  }, [stores.auth]);

  return (
    <StoresContext.Provider value={stores}>
      <ServiceWorkerRegister />
      {children}
    </StoresContext.Provider>
  );
}

export function useStores(): Stores {
  const ctx = useContext(StoresContext);
  if (!ctx) {
    throw new Error("useStores must be used within Providers");
  }
  return ctx;
}
