import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { DocumentPreview } from "@frontend/entities/document";
import { Flex, Typography } from "antd";

import { DocumentsTableModuleProvider } from "../../../entities/document/model/document/table";
import { DocumentBulkDeleteFeature } from "../../../features/document/bulk-delete";
import { DocumentBulkRestoreFeature } from "../../../features/document/bulk-restore";
import { DocumentCreateFeature } from "../../../features/document/create";
import { AppTitles } from "../../../shared/model/services";
import { DocumentsTableWidget } from "../../../widgets/document/table";
import { useHeader } from "../../../widgets/header";

function DocumentsRootPage() {
  useTitle(AppTitles.getDocumentsTitle());
  useHeader(<Typography.Title level={2}>Документы</Typography.Title>);

  return (
    <div className="h-full w-full">
      <DocumentsTableModuleProvider>
        <Flex vertical gap={12}>
          <div>
            <DocumentCreateFeature.Button size="large" type="primary" />
          </div>
          <DocumentsTableWidget
            showSearch
            selectedRowColumnTitleOptions={(documents: DocumentPreview[], onSuccess?: () => Promise<void>) => (
              <Flex gap={5} justify="center">
                <DocumentBulkDeleteFeature.Icon documents={documents} onSuccess={onSuccess} />
                <span>|</span>
                <DocumentBulkRestoreFeature.Icon documents={documents} onSuccess={onSuccess} />
              </Flex>
            )}
          />
        </Flex>
        <Outlet />
      </DocumentsTableModuleProvider>
    </div>
  );
}

export const Component = React.memo(DocumentsRootPage);
