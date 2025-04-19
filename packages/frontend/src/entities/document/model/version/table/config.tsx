import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { DocumentVersionsTableModule } from "./model";

const Context = React.createContext<DocumentVersionsTableModule | null>(null);

export const DocumentVersionTableModuleProvider = React.memo(function DocumentVersionTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: DocumentVersionsTableModule = React.useMemo(() => container.resolve(DocumentVersionsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useDocumentVersionTableModule(): DocumentVersionsTableModule {
  const module: DocumentVersionsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("DocumentVersionTableModule not found");
  if (!id) throw new Error("DocumentId not found");
  module.pathParams.set("documentId", id);
  return module;
}
