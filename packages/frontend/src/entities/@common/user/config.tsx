import React from "react";
import { isNil } from "ramda";
import { Container } from "typedi";

import { UsersTransportToken } from "./api";
import { UsersTableModule } from "./model";

const Context = React.createContext<UsersTableModule | null>(null);

export const UsersTableModuleProvider = React.memo(function UsersTableModuleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const usersTransport = React.useMemo(() => Container.get(UsersTransportToken), []);
  const usersTableModule = React.useMemo(() => new UsersTableModule(usersTransport), []);

  return <Context.Provider value={usersTableModule}>{children}</Context.Provider>;
});

export function useUsersTableModule(): UsersTableModule {
  const usersTableModule = React.useContext(Context);

  if (isNil(usersTableModule)) {
    throw new Error("UsersTableModule not found");
  }

  return usersTableModule;
}
