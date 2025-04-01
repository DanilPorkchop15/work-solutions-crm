import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useAsync } from "react-use";
import { PageSpin } from "@worksolutions/antd-react-components";
import { isNil } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";

import { ProjectDetailsService } from "./service";

export const ProjectDetailsProvider = React.memo(function ProjectDetailsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();

  const projectDetailsService: ProjectDetailsService = useInjectService(ProjectDetailsService);

  const { loading } = useAsync(async () => {
    if (!isNil(id)) await projectDetailsService.loadProjectDetails.bind(projectDetailsService)({ urlParams: { id } });
  }, [id]);

  if (loading) return <PageSpin />;

  return <ErrorBoundary fallback={<Navigate replace to={AppRoutes.getProjectsUrl(true)} />}>{children}</ErrorBoundary>;
});
