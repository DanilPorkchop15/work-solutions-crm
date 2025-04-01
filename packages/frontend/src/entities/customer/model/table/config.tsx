import React from "react";
import { isNil } from "ramda";
import { container } from "tsyringe";

import { CustomersTableModule } from "./model";

const Context: React.Context<CustomersTableModule | null> = React.createContext<CustomersTableModule | null>(null);

export const CustomersTableModuleProvider = React.memo(function CustomersTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const customersTableModule: CustomersTableModule = React.useMemo(() => container.resolve(CustomersTableModule), []);

  return <Context.Provider value={customersTableModule}>{children}</Context.Provider>;
});

export function useCustomersTableModule(): CustomersTableModule {
  const customersTableModule: CustomersTableModule | null = React.useContext(Context);

  if (isNil(customersTableModule)) {
    throw new Error("CustomersTableModule not found");
  }

  return customersTableModule;
}
