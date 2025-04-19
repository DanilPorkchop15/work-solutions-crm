import React from "react";
import { useAsyncFn } from "react-use";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { UserLog, UserLogsTableModule, UserLogView, useUserLogsTableModule } from "../../../../entities/@common/user";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../../shared/lib/tableUtils";

interface UserLogsTableProps extends TableProps<UserLog> {
  selectedRowColumnTitleOptions?: (logs: UserLog[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const UserLogsTable: React.FC<UserLogsTableProps> = observer(function UserLogsTable({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: UserLogsTableProps) {
  const userLogsTableModule: UserLogsTableModule = useUserLogsTableModule();
  const { rows } = userLogsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => userLogsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 20);

  React.useEffect(() => {
    void loadFn();
  }, []);

  return (
    <UserLogView.Table
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
