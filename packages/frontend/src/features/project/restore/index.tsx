import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { ProjectPreview } from "@frontend/entities/project";
import { AntdServices } from "@frontend/shared/model/services";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectService } from "../services/ProjectService";

interface ProjectRestoreFeatureProps extends ButtonProps {
  project: ProjectPreview;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Проект успешно восстановлен";

const ProjectRestoreFeatureBase = React.memo(function ProjectRestoreFeatureBase({
  project,
  disabled,
  onSuccess,
  children,
  ...props
}: ProjectRestoreFeatureProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();
  const projectService = useInjectService(ProjectService);
  const antdServices = useInjectService(AntdServices);

  const restoreProject = async () => {
    await projectService.restore(project.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    await onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите восстановить проект — <Typography.Text type="danger">{project.name}</Typography.Text>
            ?
          </Typography.Text>
        }
        title="Восстановить проект"
      />
      <Button type="primary" disabled={disabled} onClick={withConfirmation(restoreProject)} {...props}>
        {children}
      </Button>
    </>
  );
});

const ProjectRestoreButton = React.memo(function ProjectRestoreButton(props: ProjectRestoreFeatureProps) {
  return (
    <ProjectRestoreFeatureBase type="primary" {...props}>
      {props.project.deletedAt ? "Восстановить" : "Архивный проект"}
    </ProjectRestoreFeatureBase>
  );
});

const ProjectRestoreIcon = React.memo(function ProjectRestoreIcon(props: ProjectRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить">
      <ProjectRestoreFeatureBase icon={<RedoOutlined />} size="small" type="primary" shape="circle" {...props} />
    </Tooltip>
  );
});

export const ProjectRestoreFeature = {
  Icon: ProjectRestoreIcon,
  Button: ProjectRestoreButton
};
