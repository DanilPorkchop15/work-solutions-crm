import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { DeleteFilled } from "@ant-design/icons";
import { AccessCheck } from "@frontend/entities/viewer";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Flex, Input, Row, Switch, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import {
  DocumentPreview,
  DocumentsTableModule,
  DocumentView,
  useDocumentsTableModule
} from "../../../entities/document";
import { DocumentDeleteFeature } from "../../../features/document/delete";
import { DocumentRestoreFeature } from "../../../features/document/restore";
import { DocumentUpdateFeature } from "../../../features/document/update";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services";

interface DocumentsTableWidgetProps extends TableProps<DocumentPreview> {
  selectedRowColumnTitleOptions?: (documents: DocumentPreview[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const DocumentsTableWidget: React.FC<DocumentsTableWidgetProps> = observer(function DocumentsTableWidget({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: DocumentsTableWidgetProps) {
  const documentsTableModule: DocumentsTableModule = useDocumentsTableModule();
  const { rows } = documentsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => documentsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  const [selectedRows, setSelectedRows] = React.useState<DocumentPreview[]>([]);

  const navigate: NavigateFunction = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");

  const [showDeleted, setShowDeleted] = React.useState(false);

  const applySearchAndFilter: (data: DocumentPreview[]) => DocumentPreview[] = (data: DocumentPreview[]) =>
    data
      .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      .filter(item => showDeleted || item.deletedAt === null);

  React.useEffect(() => {
    void loadFn();
  }, []);

  const extraColumns: TableProps<DocumentPreview>["columns"] = React.useMemo(
    () => [
      {
        title: "Действия",
        key: "actions",
        render: (document: DocumentPreview) => (
          <Row className="flex-row flex-nowrap gap-2">
            <DocumentUpdateFeature.Icon disabled={document.deletedAt !== null} documentId={document.id} />
            {document.deletedAt === null ? (
              <DocumentDeleteFeature.Icon document={document} onSuccess={loadFn} />
            ) : (
              <DocumentRestoreFeature.Icon document={document} onSuccess={loadFn} />
            )}
          </Row>
        )
      }
    ],
    [loadFn]
  );

  return (
    <Flex vertical gap={12}>
      {showSearch && (
        <Flex gap={12} align="center">
          <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Поиск по названию" />
          <AccessCheck type="hide" roles={[Role.ADMIN, Role.MODERATOR]}>
            <Switch
              checked={showDeleted}
              onChange={setShowDeleted}
              unCheckedChildren={<DeleteFilled style={{ color: "salmon" }} />}
              size="default"
            />
          </AccessCheck>
        </Flex>
      )}
      <DocumentView.Table
        virtual
        columns={extraColumns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => navigate(AppRoutes.getDocumentUrl(true, record.id))
          };
        }}
        dataSource={convertDataToTableDataSource(applySearchAndFilter(data))}
        loading={loading}
        rowClassName={record => (record.deletedAt === null ? "" : "line-through")}
        locale={tableLocale}
        pagination={{
          locale: paginationLocale,
          position: ["bottomLeft"],
          showQuickJumper: true,
          responsive: true,
          showLessItems: true,
          total: applySearchAndFilter(data).length,
          current: currentPage,
          pageSize: pageSize
        }}
        onChange={onChange}
        rowSelection={{
          type: "checkbox",
          onChange: (_, rows, __) => setSelectedRows(rows),
          hideSelectAll: true,
          selectedRowKeys: selectedRows.map(document => document.id),
          columnTitle: selectedRowColumnTitleOptions?.(selectedRows, loadFn)
        }}
        {...props}
      />
    </Flex>
  );
});
