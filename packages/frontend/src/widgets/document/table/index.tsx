import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { ProjectPreview } from "@frontend/entities/project";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Input, Row, type TableProps } from "antd";
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

interface DocumentsTableWidgetProps extends TableProps<Document> {
  selectedRowColumnTitleOptions?: (documents: DocumentPreview[], onSuccess?: () => Promise<void>) => React.ReactNode;
}

export const DocumentsTableWidget: React.FC<DocumentsTableWidgetProps> = observer(function DocumentsTableWidget({
  selectedRowColumnTitleOptions
}: DocumentsTableWidgetProps) {
  const documentsTableModule: DocumentsTableModule = useDocumentsTableModule();
  const { rows } = documentsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => documentsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  const [selectedRows, setSelectedRows] = React.useState<DocumentPreview[]>([]);

  const navigate: NavigateFunction = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");

  const applySearch: (data: DocumentPreview[]) => DocumentPreview[] = (data: DocumentPreview[]) =>
    data.filter(project => project.name.toLowerCase().includes(searchValue.toLowerCase()));

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
    <>
      <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Поиск по названию" />
      <DocumentView.Table
        virtual
        columns={extraColumns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => navigate(AppRoutes.getDocumentUrl(true, record.id))
          };
        }}
        dataSource={convertDataToTableDataSource(applySearch(data))}
        loading={loading}
        rowClassName={record => (record.deletedAt === null ? "" : "line-through")}
        locale={tableLocale}
        pagination={{
          locale: paginationLocale,
          position: ["bottomLeft"],
          showQuickJumper: true,
          responsive: true,
          showLessItems: true,
          total: data.length,
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
      />
    </>
  );
});
