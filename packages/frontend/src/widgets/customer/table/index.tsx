import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { DocumentPreview } from "@frontend/entities/document";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Flex, Input, Row, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import {
  Customer,
  CustomerPreview,
  CustomersTableModule,
  CustomerView,
  useCustomersTableModule
} from "../../../entities/customer";
import { CustomerDeleteFeature } from "../../../features/customer/delete";
import { CustomerRestoreFeature } from "../../../features/customer/restore";
import { CustomerUpdateFeature } from "../../../features/customer/update";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services";

interface CustomersTableWidgetProps extends TableProps<Customer> {
  selectedRowColumnTitleOptions?: (customers: CustomerPreview[], onSuccess?: () => Promise<void>) => React.ReactNode;
}

export const CustomersTableWidget: React.FC<CustomersTableWidgetProps> = observer(function CustomersTableWidget({
  selectedRowColumnTitleOptions
}: CustomersTableWidgetProps) {
  const customersTableModule: CustomersTableModule = useCustomersTableModule();
  const { rows } = customersTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => customersTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  const [selectedRows, setSelectedRows] = React.useState<CustomerPreview[]>([]);

  const navigate: NavigateFunction = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");

  const applySearch: (data: CustomerPreview[]) => CustomerPreview[] = (data: CustomerPreview[]) =>
    data.filter(project => project.name.toLowerCase().includes(searchValue.toLowerCase()));

  React.useEffect(() => {
    void loadFn();
  }, []);

  const extraColumns: TableProps<CustomerPreview>["columns"] = React.useMemo(
    () => [
      {
        title: "Действия",
        key: "actions",
        render: (customer: CustomerPreview) => (
          <Row className="flex-row flex-nowrap gap-2">
            <CustomerUpdateFeature.Icon disabled={customer.deletedAt !== null} customerId={customer.id} />
            {customer.deletedAt === null ? (
              <CustomerDeleteFeature.Icon customer={customer} onSuccess={loadFn} />
            ) : (
              <CustomerRestoreFeature.Icon customer={customer} onSuccess={loadFn} />
            )}
          </Row>
        )
      }
    ],
    [loadFn]
  );

  return (
    <Flex vertical gap={4}>
      <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Поиск по названию" />
      <CustomerView.Table
        virtual
        columns={extraColumns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => navigate(AppRoutes.getCustomerUrl(true, record.id))
          };
        }}
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
        rowSelection={{
          type: "checkbox",
          onChange: (_, rows, __) => setSelectedRows(rows),
          hideSelectAll: true,
          selectedRowKeys: selectedRows.map(customer => customer.id),
          columnTitle: selectedRowColumnTitleOptions?.(selectedRows, loadFn)
        }}
      />
    </Flex>
  );
});
