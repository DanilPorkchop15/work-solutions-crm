import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { DocumentLogsTableModule } from "./model";

const Context = React.createContext<DocumentLogsTableModule | null>(null);

export const DocumentLogsTableModuleProvider = React.memo(function DocumentLogsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: DocumentLogsTableModule = React.useMemo(() => container.resolve(DocumentLogsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useDocumentLogsTableModule(): DocumentLogsTableModule {
  const module: DocumentLogsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("DocumentLogsTableModule not found");
  if (!id) throw new Error("DocumentId not found");
  module.pathParams.set("documentId", id);
  return module;
} 