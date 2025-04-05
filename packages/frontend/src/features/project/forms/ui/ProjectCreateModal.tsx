import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { AntdServices } from "@frontend/shared/model/services";
import { ProjectCreateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { pipe } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { mapProjectCreateFormValuesToCreateProjectDto } from "../api";
import { ProjectCreateFormValues } from "../interfaces";
import { ProjectInput } from "../../../../entities/project/ui/ProjectInput";
import { CreationModal } from "@frontend/shared/ui/creationModal";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { useProjectsTableModule } from "@frontend/entities/project";
import { ProjectService } from "@frontend/features/project/services";
import { useViewer } from "@frontend/entities/viewer";

const SUCCESS_MESSAGE = "Проект успешно создан";

export const ProjectCreateModal = observer(function ProjectCreateModal() {
  const projectService = useInjectService(ProjectService);
  const antdServices = useInjectService(AntdServices);
  const viewer = useViewer();
  const projectsTableModule = useProjectsTableModule();
  const [createProjectForm] = Form.useForm<ProjectCreateFormValues>();
  const navigate = useNavigate();

  const cancel = () => navigate(AppRoutes.getProjectsUrl(true));

  const [{ loading, error }, onSubmit] = useAsyncFn(async (body: ProjectCreateRequestDTO) => {
    await projectService.create(body);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    await projectsTableModule.load();
    cancel();
  });

  return (
    <CreationModal title="Создание проекта" onCancel={cancel}>
      <Form
        autoComplete="off"
        form={createProjectForm}
        layout="vertical"
        name="createProject"
        size="middle"
        validateTrigger="onSubmit"
        onFinish={pipe(mapProjectCreateFormValuesToCreateProjectDto, onSubmit)}
      >
        <ProjectInput.Name error={error} />
        <ProjectInput.Description error={error} />
        <ProjectInput.Dates error={error} />
        <ProjectInput.Budget error={error} />
        <ProjectInput.Customer error={error} />
        <ProjectInput.UsersAccountable error={error} />
        <ProjectInput.Status error={error} />
        <FormErrorMessage error={error} />
        <Form.Item style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 8 }} onClick={cancel}>
            Отмена
          </Button>
          <Button htmlType="submit" loading={loading} type="primary">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </CreationModal>
  );
});
