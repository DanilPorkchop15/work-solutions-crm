import React from "react";
import { Link } from "react-router-dom";
import { UserView } from "@frontend/entities/@common/user";
import { Flex, Table, type TableProps, Typography } from "antd";

import { formatToLocalDate, formatToLocalDateTime } from "../../../../../shared/lib/isoDateUtils";
import { AppRoutes } from "../../../../../shared/model/services/appRoutes";
import { UserLog } from "../../interfaces";

const columns: TableProps<UserLog>["columns"] = [
  {
    title: "Действие",
    dataIndex: "action",
    key: "action"
  },
  {
    title: "Комментарий",
    dataIndex: "comment",
    key: "comment"
  },
  {
    title: "Пользователь",
    dataIndex: "user",
    key: "user",
    render: (user: UserLog["user"]) => (
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

export const UserLogTableView = React.memo(function UserLogTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<UserLog>) {
  return <Table<UserLog> columns={[...columns, ...propsColumns]} {...props} />;
});
