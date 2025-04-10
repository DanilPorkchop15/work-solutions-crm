import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { ProjectPreview } from "@frontend/entities/project";
import { AntdServices } from "@frontend/shared/model/services";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectService } from "../services/ProjectService";

interface ProjectDeleteFeatureProps extends ButtonProps {
  project: ProjectPreview;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Проект успешно архивирован";

const ProjectDeleteFeatureBase = React.memo(function ProjectDeleteFeatureBase({
  project,
  disabled,
  onSuccess,
  children,
  ...props
}: ProjectDeleteFeatureProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();
  const projectService = useInjectService(ProjectService);
  const antdServices = useInjectService(AntdServices);

  const deleteProject = async () => {
    await projectService.delete(project.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    await onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите архивировать проект — <Typography.Text type="danger">{project.name}</Typography.Text>
            ?
          </Typography.Text>
        }
        title="Архивировать проект"
      />
      <Button danger disabled={disabled} onClick={withConfirmation(deleteProject)} {...props}>
        {children}
      </Button>
    </>
  );
});

const ProjectDeleteButton = React.memo(function ProjectDeleteButton(props: ProjectDeleteFeatureProps) {
  return (
    <ProjectDeleteFeatureBase type="primary" {...props}>
      {props.project.deletedAt ? "Архивный проект" : "Архивировать"}
    </ProjectDeleteFeatureBase>
  );
});

const ProjectDeleteIcon = React.memo(function ProjectDeleteIcon(props: ProjectDeleteFeatureProps) {
  return (
    <Tooltip title={props.project.deletedAt ? "Архивный проект" : "Архивировать"}>
      <ProjectDeleteFeatureBase icon={<DeleteFilled style={{ fontSize: 18 }} />} size="small" type="link" {...props} />
    </Tooltip>
  );
});

export const ProjectDeleteFeature = {
  Icon: ProjectDeleteIcon,
  Button: ProjectDeleteButton
};
