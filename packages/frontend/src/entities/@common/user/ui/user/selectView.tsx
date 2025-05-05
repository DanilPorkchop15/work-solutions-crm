import React, { useMemo, useState } from "react";
import { useAsync } from "react-use";
import { Flex, Select, SelectProps, Spin, Typography } from "antd";
import { Rule } from "antd/es/form";

import { useInjectService } from "../../../../../shared/lib/useInjectService";
import { TableDto } from "../../../../../shared/model/interfaces/table";
import { UsersApi } from "../../api";
import { UserPreview } from "../../interfaces";

import { UserView } from ".";

const { Option } = Select;

interface UserSelectViewProps {
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: Rule[];
  defaultValue?: string;
  onChange?: (userId: string | null) => void;
  showSearch?: boolean;
  allowClear?: boolean;
  style?: React.CSSProperties;
}

export const UserSelectView: React.FC<UserSelectViewProps & SelectProps> = ({
  placeholder = "Выберите пользователя",
  required = false,
  disabled = false,
  onChange,
  showSearch = true,
  allowClear = true,
  style,
  ...props
}) => {
  const usersApi: UsersApi = useInjectService(UsersApi);
  const [searchValue, setSearchValue] = useState("");

  const { value: users, loading } = useAsync(async () => {
    const response: TableDto<UserPreview> = await usersApi.getUsers();
    return response.rows;
  }, []);

  const filteredUsers: UserPreview[] = useMemo(() => {
    if (!users) return [];
    if (!searchValue) return users;

    return users.filter(user => user.firstName.toLowerCase().includes(searchValue.toLowerCase()));
  }, [users, searchValue]);

  return (
    <Select
      showSearch={showSearch}
      placeholder={placeholder}
      optionFilterProp="children"
      disabled={disabled || loading}
      loading={loading}
      allowClear={allowClear}
      onChange={onChange}
      onSearch={showSearch ? setSearchValue : undefined}
      filterOption={false}
      notFoundContent={
        loading ? <Spin size="small" /> : <Typography.Text type="secondary">Пользователи не найдены</Typography.Text>
      }
      {...props}
    >
      {filteredUsers.map(user => (
        <Option key={user.id} value={user.id} disabled={user.deletedAt !== null}>
          <Flex gap={12} align="center">
            <UserView.Preview user={user} />
            <div>
              {user.firstName} {user.lastName} -{" "}
              <Typography.Link disabled={user.deletedAt !== null}>{user.email}</Typography.Link>
            </div>
          </Flex>
        </Option>
      ))}
    </Select>
  );
};
