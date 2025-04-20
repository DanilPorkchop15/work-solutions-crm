import React from "react";
import { useAsyncFn } from "react-use";
import {
  Document,
  DocumentDetailsService,
  DocumentVersionsTableModule,
  useDocumentDetails
} from "@frontend/entities/document";
import { PageSpin } from "@worksolutions/antd-react-components";
import { Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { DocumentDeleteFeature } from "../../../features/document/delete";
import { DocumentRestoreFeature } from "../../../features/document/restore";
import { DocumentUpdateFeature } from "../../../features/document/update";
import { DocumentVersionUploadFeature } from "../../../features/document-version/upload/index";
import { useInjectService } from "../../../shared/lib/useInjectService";
import { Back } from "../../../shared/ui/back/index";
import { useHeader } from "../../header/config";

export const DocumentDetailsWidget = observer(function DocumentDetailsForm() {
  const documentDetails: Document = useDocumentDetails();

  const documentDetailsService: DocumentDetailsService = useInjectService(DocumentDetailsService);

  const documentVersionsTableModule: DocumentVersionsTableModule = useInjectService(DocumentVersionsTableModule);

  const onSuccess: () => Promise<void> = () =>
    documentDetailsService.loadDocumentDetails({
      urlParams: {
        id: documentDetails.id
      }
    });

  useHeader(
    <Flex gap={24} align="center">
      <Back />
      {documentDetails.deletedAt !== null ? (
        <Typography.Title level={2}>Информация о документе</Typography.Title>
      ) : (
        <Typography.Title level={2}>Редактирование документа</Typography.Title>
      )}
      {documentDetails.deletedAt === null ? (
        <Flex gap={12}>
          <DocumentDeleteFeature.Button document={documentDetails} onSuccess={onSuccess} size="small" />
          <DocumentVersionUploadFeature.Button
            document={documentDetails}
            size="small"
            type="primary"
            onSuccess={async () => {
              documentVersionsTableModule.pathParams.set("documentId", documentDetails.id);
              await documentVersionsTableModule.load();
            }}
          />
        </Flex>
      ) : (
        <DocumentRestoreFeature.Button document={documentDetails} onSuccess={onSuccess} size="small" />
      )}
    </Flex>,
    [documentDetails.deletedAt]
  );

  const [{ loading }] = useAsyncFn(
    async () =>
      documentDetailsService.loadDocumentDetails({
        urlParams: {
          id: documentDetails.id
        }
      }),
    []
  );
  if (loading) return <PageSpin />;

  return (
    <Flex vertical justify="space-between" gap={48}>
      <DocumentUpdateFeature.Form />
    </Flex>
  );
});
