import React from "react";
import { useAsyncFn } from "react-use";
import {
  ProjectInput,
  ProjectLogsTableModule,
  useProjectLogsTableModule,
  useProjectsTableModule
} from "@frontend/entities/project";
import { AccessCheck, useViewer } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { Button, Form } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { pipe } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { ProjectUpdateService } from "../../services";
import { mapProjectUpdateFormValuesToUpdateProjectDto } from "../api";
import { ProjectUpdateFormValues } from "../interfaces";

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

  const projectLogsTableModule: ProjectLogsTableModule = useProjectLogsTableModule();

  const [{ error, loading }, onSubmit] = useAsyncFn(
    async (body: ProjectUpdateRequestDTO) => {
      await updateProjectService.update(body);
      await projectsTableModule.load();
      await projectLogsTableModule.load();
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
          <AccessCheck type="hide" action={Action.UPDATE} subject={Subject.PROJECTS}>
            <Button htmlType="submit" loading={loading} type="primary">
              Сохранить
            </Button>
          </AccessCheck>
        </Form.Item>
      )}
    </Form>
  );
});
