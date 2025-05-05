import React from "react";
import { Link } from "react-router-dom";
import { UserView } from "@frontend/entities/@common/user";
import { Log } from "@frontend/entities/logger";
import { Flex, Table, type TableProps, Typography } from "antd";

import { formatToLocalDateTime } from "../../../shared/lib/isoDateUtils";
import { AppRoutes } from "../../../shared/model/services/appRoutes";

const columns: TableProps<Log>["columns"] = [
  {
    title: "Тип",
    dataIndex: "type",
    key: "type"
  },
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
    render: (user: Log["user"]) => (
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
    title: "Дата",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => <Typography.Text>{formatToLocalDateTime(date)}</Typography.Text>
  }
];

export const LoggerTableView = React.memo(function LoggerTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<Log>) {
  return <Table<Log> columns={[...columns, ...propsColumns]} {...props} />;
});
