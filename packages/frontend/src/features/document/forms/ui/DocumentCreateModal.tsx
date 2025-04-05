import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { AntdServices } from "@frontend/shared/model/services";
import { DocumentCreateRequestDTO } from "@work-solutions-crm/libs/shared/document/document.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { pipe } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { DocumentCreateFormValues } from "../interfaces";

import { DocumentInput } from "../../../../entities/document/ui/DocumentInput";
import { CreationModal } from "@frontend/shared/ui/creationModal";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { useDocumentsTableModule } from "@frontend/entities/document";
import { DocumentService } from "@frontend/features/document/services";
import { useViewer, ViewerModel } from "@frontend/entities/viewer";
import { mapDocumentCreateFormValuesToCreateDto } from "@frontend/features/document/forms/api";

const SUCCESS_MESSAGE = "Документ успешно создан";

export const DocumentCreateModal = observer(function CreateDocumentModal() {
  const documentService: DocumentService = useInjectService(DocumentService);
  const antdServices: AntdServices = useInjectService(AntdServices);

  const viewer: ViewerModel = useViewer();

  const documentTableModule = useDocumentsTableModule();

  const [createDocumentForm] = Form.useForm<DocumentCreateFormValues>();

  const navigate: NavigateFunction = useNavigate();

  const cancel: () => void = () => {
    navigate(AppRoutes.getDocumentsUrl(true));
  };

  const [{ loading, error }, onSubmit] = useAsyncFn(async (body: DocumentCreateRequestDTO) => {
    await documentService.create(body);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    await documentTableModule.load();
    cancel();
  });

  return (
    <CreationModal title="Добавление документа" onCancel={cancel}>
      <Form
        autoComplete="off"
        form={createDocumentForm}
        layout="vertical"
        name="createDocument"
        size="middle"
        validateTrigger="onSubmit"
        onFinish={pipe(mapDocumentCreateFormValuesToCreateDto, onSubmit)}
      >
        <DocumentInput.Name error={error} />
        <DocumentInput.Description error={error} />
        <DocumentInput.Url error={error} />
        <DocumentInput.Roles error={error} />
        <FormErrorMessage error={error} />
        <Form.Item style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 8 }} onClick={cancel}>
            Отмена
          </Button>
          <Button htmlType="submit" loading={loading} type="primary">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </CreationModal>
  );
});
