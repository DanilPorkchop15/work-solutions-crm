import React from "react";
import { Link } from "react-router-dom";
import { Table, type TableProps, Typography } from "antd";

import { User } from "../interfaces";

import { UserView } from "./index";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

const columns: TableProps<User>["columns"] = [
  {
    title: "",
    key: "avatarUrl",
    render: (user: User) => <UserView.Avatar user={user} />
  },
  {
    title: "Полное имя",
    dataIndex: "fullName",
    key: "fullName"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: email => <Link to={`mailto:${email}`}>{email}</Link>
  },
  {
    title: "Должность",
    dataIndex: "position",
    key: "position"
  },
  {
    title: "Роль",
    dataIndex: "role",
    key: "role",
    filterMultiple: false,
    filters: [
      { text: "Admin", value: Role.ADMIN },
      { text: "User", value: Role.USER },
      { text: "Manager", value: Role.MANAGER },
      { text: "Moderator", value: Role.MODERATOR }
    ]
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    defaultSortOrder: "ascend",
    render: date => <Typography.Text>{date}</Typography.Text>
  },
  {
    title: "Дата обновления",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: true,
    render: date => <Typography.Text>{date}</Typography.Text>
  }
];

export const UsersTableView = React.memo(function UsersTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<User>) {
  return <Table<User> columns={[...columns, ...propsColumns]} {...props} />;
});
