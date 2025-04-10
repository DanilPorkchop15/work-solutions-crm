import React from "react";
import { container } from "tsyringe";

import { DocumentsTableModule } from "./model";

const Context = React.createContext<DocumentsTableModule | null>(null);

export const DocumentsTableModuleProvider = React.memo(function DocumentsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: DocumentsTableModule = React.useMemo(() => container.resolve(DocumentsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useDocumentsTableModule(): DocumentsTableModule {
  const module: DocumentsTableModule | null = React.useContext(Context);
  if (!module) throw new Error("DocumentsTableModule not found");
  return module;
}
