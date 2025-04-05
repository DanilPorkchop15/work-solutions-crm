import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useAsync } from "react-use";
import { PageSpin } from "@worksolutions/antd-react-components";
import { isNil } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";

import { DocumentDetailsService } from "./service";

export const DocumentDetailsProvider = React.memo(function DocumentDetailsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();

  const documentDetailsService: DocumentDetailsService = useInjectService(DocumentDetailsService);

  const { loading } = useAsync(async () => {
    if (!isNil(id))
      await documentDetailsService.loadDocumentDetails.bind(documentDetailsService)({ urlParams: { id } });
  }, [id]);

  if (loading) return <PageSpin />;

  return <ErrorBoundary fallback={<Navigate replace to={AppRoutes.getDocumentsUrl(true)} />}>{children}</ErrorBoundary>;
});
