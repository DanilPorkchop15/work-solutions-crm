import React from "react";
import { useAsyncFn } from "react-use";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import {
  CustomerLog,
  CustomerLogsTableModule,
  CustomerLogView,
  useCustomerLogsTableModule
} from "../../../entities/customer";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

interface CustomerLogsTableProps extends TableProps<CustomerLog> {
  selectedRowColumnTitleOptions?: (logs: CustomerLog[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const CustomerLogsWidget: React.FC<CustomerLogsTableProps> = observer(function CustomerLogsTable({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: CustomerLogsTableProps) {
  const customerLogsTableModule: CustomerLogsTableModule = useCustomerLogsTableModule();
  const { rows } = customerLogsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => customerLogsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 20);

  React.useEffect(() => {
    void loadFn();
  }, []);

  return (
    <CustomerLogView.Table
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
