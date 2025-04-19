import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { UserLogsTableModule } from "./model";

const Context = React.createContext<UserLogsTableModule | null>(null);

export const UserLogsTableModuleProvider = React.memo(function UserLogTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: UserLogsTableModule = React.useMemo(() => container.resolve(UserLogsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useUserLogsTableModule(): UserLogsTableModule {
  const module: UserLogsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("UserLogTableModule not found");
  if (!id) throw new Error("UserId not found");
  module.pathParams.set("userId", id);
  return module;
}
