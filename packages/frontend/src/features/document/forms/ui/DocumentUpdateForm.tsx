import React from "react";
import { useAsyncFn } from "react-use";
import { useDocumentsTableModule } from "@frontend/entities/document";
import { mapDocumentUpdateFormValuesToUpdateDto } from "@frontend/features/document/forms/api";
import { AntdServices } from "@frontend/shared/model/services";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { DocumentUpdateRequestDTO } from "@work-solutions-crm/libs/shared/document/document.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { identity, pipe } from "ramda";

import { DocumentInput } from "../../../../entities/document/ui/document/DocumentInput";
import { useInjectService } from "../../../../shared/lib/useInjectService";
import { DocumentUpdateService } from "../../services";
import { DocumentUpdateFormValues } from "../interfaces";

interface DocumentUpdateFormProps {
  additionalOnFinish?: () => void;
}

const SUCCESS_MESSAGE = "Документ успешно обновлен";

export const DocumentUpdateForm = observer(function DocumentUpdateFeature({
  additionalOnFinish
}: DocumentUpdateFormProps) {
  const [editDocumentForm] = Form.useForm<DocumentUpdateFormValues>();

  const documentsTableModule = useDocumentsTableModule();

  const updateDocumentService: DocumentUpdateService = useInjectService(DocumentUpdateService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const [{ error, loading }, onSubmit] = useAsyncFn(
    async (body: DocumentUpdateRequestDTO) => {
      await updateDocumentService.update(body);
      await documentsTableModule.load();
      antdServices.notification.success({ message: SUCCESS_MESSAGE });
      additionalOnFinish?.();
    },
    [additionalOnFinish]
  );

  const isDisabled: boolean = updateDocumentService.documentDetails.deletedAt !== null;

  return (
    <Form
      autoComplete="off"
      disabled={isDisabled}
      form={editDocumentForm}
      layout="vertical"
      name="updateDocument"
      size="middle"
      validateTrigger="onSubmit"
      onFinish={pipe(mapDocumentUpdateFormValuesToUpdateDto, onSubmit)}
    >
      <DocumentInput.Name
        error={error}
        initialValue={updateDocumentService.documentDetails.name}
        disabled={isDisabled}
      />
      <DocumentInput.Description
        error={error}
        initialValue={updateDocumentService.documentDetails.description ?? undefined}
        disabled={isDisabled}
      />
      <DocumentInput.Roles
        error={error}
        initialValue={
          updateDocumentService.documentDetails.roles.length > 0
            ? updateDocumentService.documentDetails.roles.map(identity)
            : undefined
        }
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
