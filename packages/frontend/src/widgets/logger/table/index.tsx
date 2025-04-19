import React from "react";
import { useAsyncFn } from "react-use";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { Log, LoggerTableModule, LoggerView, useLoggerTableModule } from "../../../entities/logger";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

interface LoggerTableProps extends TableProps<Log> {
  selectedRowColumnTitleOptions?: (logs: Log[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const LoggerTableWidget: React.FC<LoggerTableProps> = observer(function LoggerTable({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: LoggerTableProps) {
  const loggerTableModule: LoggerTableModule = useLoggerTableModule();
  const { rows } = loggerTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => loggerTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 20);

  React.useEffect(() => {
    void loadFn();
  }, []);

  return (
    <LoggerView.Table
      virtual
      dataSource={convertDataToTableDataSource(data)}
      loading={loading}
      size="small"
      tailor={true}
      rowClassName={record => (record.deletedAt ? "line-through" : "")}
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
