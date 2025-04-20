import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { DocumentCommentsTableModule } from "./model";

const Context = React.createContext<DocumentCommentsTableModule | null>(null);

export const DocumentCommentsTableModuleProvider = React.memo(function DocumentCommentsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: DocumentCommentsTableModule = React.useMemo(() => container.resolve(DocumentCommentsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useDocumentCommentsTableModule(): DocumentCommentsTableModule {
  const module: DocumentCommentsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("DocumentCommentsTableModule not found");
  if (!id) throw new Error("DocumentId not found");
  module.pathParams.set("documentId", id);
  return module;
} 