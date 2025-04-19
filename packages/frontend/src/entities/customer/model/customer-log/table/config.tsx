import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { CustomerLogsTableModule } from "./model";

const Context = React.createContext<CustomerLogsTableModule | null>(null);

export const CustomerLogsTableModuleProvider = React.memo(function CustomerLogsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: CustomerLogsTableModule = React.useMemo(() => container.resolve(CustomerLogsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useCustomerLogsTableModule(): CustomerLogsTableModule {
  const module: CustomerLogsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("CustomerLogsTableModule not found");
  if (!id) throw new Error("CustomerId not found");
  module.pathParams.set("customerId", id);
  return module;
} 