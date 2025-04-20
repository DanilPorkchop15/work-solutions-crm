import React from "react";
import { useAsyncFn } from "react-use";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import {
  DocumentVersion,
  DocumentVersionsTableModule,
  DocumentVersionsView,
  useDocumentVersionTableModule
} from "../../../entities/document";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

interface DocumentVersionsTableProps extends TableProps<DocumentVersion> {
  selectedRowColumnTitleOptions?: (versions: DocumentVersion[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const DocumentVersionsWidget: React.FC<DocumentVersionsTableProps> = observer(function DocumentVersionsTable({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: DocumentVersionsTableProps) {
  const documentVersionsTableModule: DocumentVersionsTableModule = useDocumentVersionTableModule();
  const { rows } = documentVersionsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => documentVersionsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  React.useEffect(() => {
    void loadFn();
  }, []);

  return (
    <DocumentVersionsView.Table
      virtual
      dataSource={convertDataToTableDataSource(data)}
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
      {...props}
    />
  );
});
