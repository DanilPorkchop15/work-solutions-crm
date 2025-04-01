import React from "react";
import { Table, type TableProps, Typography } from "antd";

import { formatToLocalDate } from "../../../shared/lib/isoDateUtils";
import { CustomerPreview } from "../interfaces";

const columns: TableProps<CustomerPreview>["columns"] = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: email => <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    render: (date: ISO) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата обновления",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    render: (date: ISO) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Архивирован",
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (date: ISO | null) => <Typography.Text>{date ? "Да" : "Нет"}</Typography.Text>
  }
];

export const CustomersTableView = React.memo(function CustomersTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<CustomerPreview>) {
  return <Table<CustomerPreview> columns={[...columns, ...propsColumns]} {...props} />;
});
