import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { Customer, CustomerPreview, CustomersTableModule, useCustomersTableModule } from "@frontend/entities/customer";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Row, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { CustomerView } from "../../../entities/customer/ui/index";
import { CustomerDeleteFeature } from "../../../features/customer/delete/index";
import { CustomerRestoreFeature } from "../../../features/customer/restore/index";
import { CustomerUpdateFeature } from "../../../features/customer/update/index";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services/appRoutes";

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
  );
});
