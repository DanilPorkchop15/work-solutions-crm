import React from "react";
import { useAsyncFn } from "react-use";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import {
  DocumentLog,
  DocumentLogsTableModule,
  DocumentLogView,
  useDocumentLogsTableModule
} from "../../../entities/document";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

interface DocumentLogsTableProps extends TableProps<DocumentLog> {
  selectedRowColumnTitleOptions?: (logs: DocumentLog[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const DocumentLogsWidget: React.FC<DocumentLogsTableProps> = observer(function DocumentLogsTable({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: DocumentLogsTableProps) {
  const documentLogsTableModule: DocumentLogsTableModule = useDocumentLogsTableModule();
  const { rows } = documentLogsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => documentLogsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 20);

  React.useEffect(() => {
    void loadFn();
  }, []);

  return (
    <DocumentLogView.Table
      virtual
      dataSource={convertDataToTableDataSource(data)}
      loading={loading}
      size="small"
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
