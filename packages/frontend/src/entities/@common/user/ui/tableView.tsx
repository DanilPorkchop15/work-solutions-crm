import React from "react";
import { Link } from "react-router-dom";
import { Table, type TableProps, Typography } from "antd";

import { type User, UserRole } from "../interfaces";

import { UserView } from "./index";

const columns: TableProps<User>["columns"] = [
  {
    title: "",
    key: "avatar",
    render: (user: User) => <UserView.Avatar user={user} />,
  },
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    sorter: true,
    defaultSortOrder: "ascend",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => <Link to={`mailto:${email}`}>{email}</Link>,
  },
  {
    title: "Роль",
    dataIndex: "role",
    key: "role",
    filterMultiple: false,
    filters: [
      { text: "Admin", value: UserRole.Admin },
      { text: "Student", value: UserRole.Student },
    ],
  },
  {
    title: "blocked",
    key: "blocked",
    dataIndex: "blocked",
    sorter: true,
    render: (blocked) => <Typography.Text type={blocked ? "danger" : undefined}>{String(blocked)}</Typography.Text>,
  },
];

export const UsersTableView = React.memo(function UsersTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<User>) {
  return <Table<User> columns={[...columns, ...propsColumns]} {...props} />;
});
