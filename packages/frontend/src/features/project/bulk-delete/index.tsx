import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { ProjectPreview } from "@frontend/entities/project";
import { AntdServices } from "@frontend/shared/model/services";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectService } from "../services/ProjectService";

interface ProjectBulkDeleteFeatureProps {
  projects: ProjectPreview[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные проекты успешно архивированы";

const ProjectBulkDeleteFeatureBase = React.memo(function ProjectBulkDeleteFeatureBase({
  projects,
  disabled,
  onSuccess,
  children,
  ...props
}: ProjectBulkDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();
  const projectService = useInjectService(ProjectService);
  const antdServices = useInjectService(AntdServices);

  const bulkDeleteProjects = async () => {
    await projectService.bulkDelete(projects.map(p => p.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={<Typography.Text>Вы уверены, что хотите архивировать {projects.length} проектов?</Typography.Text>}
        title="Архивировать проекты"
      />
      <Button
        danger
        disabled={disabled ?? (projects.length === 0 || projects.some(p => p.deletedAt !== null))}
        onClick={withConfirmation(bulkDeleteProjects)}
        {...props}
      >
        {children}
      </Button>
    </>
  );
});

const ProjectBulkDeleteButton = React.memo(function ProjectBulkDeleteButton(props: ProjectBulkDeleteFeatureProps) {
  return (
    <ProjectBulkDeleteFeatureBase type="primary" {...props}>
      {props.projects.length > 0 ? "Архивировать" : "Выберите проекты"}
    </ProjectBulkDeleteFeatureBase>
  );
});

const ProjectBulkDeleteIcon = React.memo(function ProjectBulkDeleteIcon(props: ProjectBulkDeleteFeatureProps) {
  return (
    <Tooltip title="Архивировать выбранные проекты">
      <ProjectBulkDeleteFeatureBase
        icon={<DeleteFilled style={{ fontSize: 18 }} />}
        size="middle"
        type="link"
        {...props}
      />
    </Tooltip>
  );
});

export const ProjectBulkDeleteFeature = {
  Icon: ProjectBulkDeleteIcon,
  Button: ProjectBulkDeleteButton
};
