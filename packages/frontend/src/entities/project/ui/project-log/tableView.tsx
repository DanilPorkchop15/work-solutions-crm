import React from "react";
import { Link } from "react-router-dom";
import { UserView } from "@frontend/entities/@common/user";
import { Flex, Table, type TableProps, Typography } from "antd";

import { formatToLocalDateTime } from "../../../../shared/lib/isoDateUtils";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { ProjectLog } from "../../interfaces";

const columns: TableProps<ProjectLog>["columns"] = [
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
    render: (user: ProjectLog["user"]) => (
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
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    defaultSortOrder: "descend",
    render: (date: string) => <Typography.Text>{formatToLocalDateTime(date)}</Typography.Text>
  }
];

export const ProjectLogTableView = React.memo(function ProjectLogTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<ProjectLog>) {
  return <Table<ProjectLog> columns={[...columns, ...propsColumns]} {...props} />;
});
