import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate } from "react-router-dom";
import { useAsync } from "react-use";
import { PageSpin } from "@worksolutions/antd-react-components";
import { container } from "tsyringe";
import { AppRoutes } from "../../shared/model/services/appRoutes";

import { ViewerService } from "./service";

export const ViewerProvider = React.memo(function ViewerProvider({ children }: { children: React.ReactNode }) {
  const viewerService: ViewerService = container.resolve(ViewerService);

  const { loading } = useAsync(viewerService.loadViewer.bind(viewerService), []);

  if (loading) return <PageSpin />;

  return <ErrorBoundary fallback={<Navigate replace to={AppRoutes.getAuthUrl()} />}>{children}</ErrorBoundary>;
});
