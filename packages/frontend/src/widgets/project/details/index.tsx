import React from "react";
import { useAsyncFn } from "react-use";
import { ProjectDetailsService, useProjectDetails } from "@frontend/entities/project";
import { PageSpin } from "@worksolutions/antd-react-components";
import { Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { ProjectDeleteFeature } from "../../../features/project/delete";
import { ProjectRestoreFeature } from "../../../features/project/restore";
import { ProjectUpdateFeature } from "../../../features/project/update";
import { useInjectService } from "../../../shared/lib/useInjectService";
import { Back } from "../../../shared/ui/back/index";
import { useHeader } from "../../header/config";

export const ProjectDetailsWidget = observer(function ProjectDetailsForm() {
  const projectDetails = useProjectDetails();
  const projectDetailsService = useInjectService(ProjectDetailsService);

  const onSuccess = () => projectDetailsService.loadProjectDetails({ urlParams: { id: projectDetails.id } });

  useHeader(
    <Flex gap={36} align="center">
      <Back />
      {projectDetails.deletedAt !== null ? (
        <Typography.Title level={2}>Информация о проекте</Typography.Title>
      ) : (
        <Typography.Title level={2}>Редактирование проекта</Typography.Title>
      )}
      {projectDetails.deletedAt === null ? (
        <ProjectDeleteFeature.Button project={projectDetails} onSuccess={onSuccess} size="small" />
      ) : (
        <ProjectRestoreFeature.Button project={projectDetails} onSuccess={onSuccess} size="small" />
      )}
    </Flex>,
    [projectDetails.deletedAt]
  );

  const [{ loading }] = useAsyncFn(
    async () => projectDetailsService.loadProjectDetails({ urlParams: { id: projectDetails.id } }),
    []
  );
  if (loading) return <PageSpin />;

  return (
    <Flex vertical justify="space-between" gap={48}>
      <ProjectUpdateFeature.Form />
    </Flex>
  );
});
