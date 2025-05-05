import React from "react";
import { Link } from "react-router-dom";
import { UserView } from "@frontend/entities/@common/user";
import { Flex, Table, type TableProps, Typography } from "antd";

import { formatToLocalDate } from "../../../../shared/lib/isoDateUtils";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { CustomerPreview } from "../../interfaces";

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
    title: "Создатель",
    dataIndex: "userCreated",
    key: "userCreated",
    render: (user: CustomerPreview["userCreated"]) => (
      <Link to={AppRoutes.getUserUrl(true, user.id)}>
        <Flex gap={12} align="center">
          <UserView.Preview user={user} />
          <div>
            {user.firstName} {user.lastName} -{" "}
            <Typography.Link disabled={user.deletedAt !== null}>{user.email}</Typography.Link>
          </div>
        </Flex>
      </Link>
    )
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    defaultSortOrder: "descend",
    render: (date: string) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата обновления",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    render: (date: string) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Архивирован",
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (date: string | null) => <Typography.Text>{date ? "Да" : "Нет"}</Typography.Text>
  }
];

export const CustomersTableView = React.memo(function CustomersTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<CustomerPreview>) {
  return <Table<CustomerPreview> columns={[...columns, ...propsColumns]} {...props} />;
});
