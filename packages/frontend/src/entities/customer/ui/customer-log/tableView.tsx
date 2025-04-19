import React from "react";
import { Link } from "react-router-dom";
import { UserView } from "@frontend/entities/@common/user";
import { Flex, Table, type TableProps, Typography } from "antd";

import { formatToLocalDateTime } from "../../../../shared/lib/isoDateUtils";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { CustomerLog } from "../../interfaces";

const columns: TableProps<CustomerLog>["columns"] = [
  {
    title: "Действие",
    dataIndex: "action",
    key: "action"
  },
  {
    title: "Комментарий",
    dataIndex: "comment",
    key: "comment"
  },
  {
    title: "Пользователь",
    dataIndex: "user",
    key: "user",
    render: (user: CustomerLog["user"]) => (
      <Link to={AppRoutes.getUserUrl(true, user.id)}>
        <Flex gap={12} align="center">
          <UserView.Preview user={user} />
          <div>
            {user.fullName} - <Typography.Link disabled={user.deletedAt !== null}>{user.email}</Typography.Link>
          </div>
        </Flex>
      </Link>
    )
  },
  {
    title: "Дата",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    defaultSortOrder: "descend",
    render: (date: string) => <Typography.Text>{formatToLocalDateTime(date)}</Typography.Text>
  }
];

export const CustomerLogTableView = React.memo(function CustomerLogTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<CustomerLog>) {
  return <Table<CustomerLog> columns={[...columns, ...propsColumns]} {...props} />;
}); 