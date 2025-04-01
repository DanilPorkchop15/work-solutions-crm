import React from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import { AntdServices } from "@frontend/shared/model/services";
import { ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { ProjectUpdateService } from "../../services";
import { ProjectUpdateFormValues } from "../interfaces";
import { ProjectInput } from "./ProjectInput";
import { pipe } from "ramda";
import { mapProjectUpdateFormValuesToUpdateProjectDto } from "../api";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { useProjectsTableModule } from "@frontend/entities/project";
import { useViewer } from "@frontend/entities/viewer";

import dayjs from "dayjs";

interface ProjectUpdateFormProps {
  additionalOnFinish?: () => void;
  onLoad?: () => void;
}

const SUCCESS_MESSAGE = "Проект успешно обновлен";

export const ProjectUpdateForm = observer(function ProjectUpdateForm({
  additionalOnFinish,
  onLoad
}: ProjectUpdateFormProps) {
  const [editProjectForm] = Form.useForm<ProjectUpdateFormValues>();
  const viewer = useViewer();
  const projectsTableModule = useProjectsTableModule();
  const updateProjectService = useInjectService(ProjectUpdateService);
  const antdServices = useInjectService(AntdServices);

  const [{ error, loading }, onSubmit] = useAsyncFn(
    async (body: ProjectUpdateRequestDTO) => {
      await updateProjectService.update(body);
      await projectsTableModule.load();
      antdServices.notification.success({ message: SUCCESS_MESSAGE });
      additionalOnFinish?.();
    },
    [additionalOnFinish]
  );

  const isDisabled = updateProjectService.projectDetails.deletedAt !== null;

  return (
    <Form
      autoComplete="off"
      disabled={isDisabled}
      form={editProjectForm}
      layout="vertical"
      name="updateProject"
      size="middle"
      validateTrigger="onSubmit"
      onFinish={pipe(mapProjectUpdateFormValuesToUpdateProjectDto, onSubmit)}
    >
      <ProjectInput.Name error={error} initialValue={updateProjectService.projectDetails.name} disabled={isDisabled} />
      <ProjectInput.Description
        error={error}
        initialValue={updateProjectService.projectDetails.description ?? undefined}
        disabled={isDisabled}
      />
      <ProjectInput.Dates
        error={error}
        disabled={isDisabled}
        initialValues={{
          start_date: dayjs(updateProjectService.projectDetails.startDate),
          end_date: dayjs(updateProjectService.projectDetails.endDate)
        }}
      />
      <ProjectInput.Budget
        error={error}
        initialValue={updateProjectService.projectDetails.budget ?? undefined}
        disabled={isDisabled}
      />
      <ProjectInput.Customer
        error={error}
        initialValue={updateProjectService.projectDetails.customer.id}
        disabled={isDisabled}
      />
      <ProjectInput.UsersAccountable
        error={error}
        initialValue={updateProjectService.projectDetails.usersAccountable.map(u => u.id)}
        disabled={isDisabled}
      />
      <ProjectInput.Status
        error={error}
        initialValue={updateProjectService.projectDetails.status}
        disabled={isDisabled}
      />
      <FormErrorMessage error={error} />
      {!isDisabled && (
        <Form.Item style={{ textAlign: "right" }}>
          <Button htmlType="submit" loading={loading} type="primary">
            Сохранить
          </Button>
        </Form.Item>
      )}
    </Form>
  );
});
