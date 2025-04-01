import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { ProjectPreview } from "@frontend/entities/project";
import { AntdServices } from "@frontend/shared/model/services";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectService } from "../services/ProjectService";

interface ProjectBulkRestoreFeatureProps {
  projects: ProjectPreview[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные проекты успешно восстановлены";

const ProjectBulkRestoreFeatureBase = React.memo(function ProjectBulkRestoreFeatureBase({
  projects,
  disabled,
  onSuccess,
  children,
  ...props
}: ProjectBulkRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();
  const projectService = useInjectService(ProjectService);
  const antdServices = useInjectService(AntdServices);

  const bulkRestoreProjects = async () => {
    await projectService.bulkRestore(projects.map(p => p.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={<Typography.Text>Вы уверены, что хотите восстановить {projects.length} проектов?</Typography.Text>}
        title="Восстановить проекты"
      />
      <Button
        type="primary"
        disabled={disabled ?? (projects.length === 0 || projects.some(p => p.deletedAt === null))}
        onClick={withConfirmation(bulkRestoreProjects)}
        {...props}
      >
        {children}
      </Button>
    </>
  );
});

const ProjectBulkRestoreButton = React.memo(function ProjectBulkRestoreButton(props: ProjectBulkRestoreFeatureProps) {
  return (
    <ProjectBulkRestoreFeatureBase type="primary" {...props}>
      {props.projects.length > 0 ? "Восстановить" : "Выберите проекты"}
    </ProjectBulkRestoreFeatureBase>
  );
});

const ProjectBulkRestoreIcon = React.memo(function ProjectBulkRestoreIcon(props: ProjectBulkRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить выбранные проекты">
      <ProjectBulkRestoreFeatureBase
        icon={<RedoOutlined />}
        style={{ border: "none" }}
        size="small"
        type="primary"
        shape="circle"
        {...props}
      />
    </Tooltip>
  );
});

export const ProjectBulkRestoreFeature = {
  Icon: ProjectBulkRestoreIcon,
  Button: ProjectBulkRestoreButton
};
