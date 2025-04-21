import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { DeleteFilled } from "@ant-design/icons";
import { User, UsersTableModule, UserView, useUsersTableModule } from "@frontend/entities/@common/user";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Flex, Input, Row, Switch, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { AccessCheck } from "../../../entities/viewer/ui/accessCheck";
import { UserDeleteFeature } from "../../../features/user/delete";
import { UserRestoreFeature } from "../../../features/user/restore";
import { UserUpdateFeature } from "../../../features/user/update";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services";

interface UsersTableWidgetProps extends TableProps<User> {
  selectedRowColumnTitleOptions?: (users: User[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const UsersTableWidget: React.FC<UsersTableWidgetProps> = observer(function UsersTableWidget({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: UsersTableWidgetProps) {
  const usersTableModule: UsersTableModule = useUsersTableModule();
  const { rows } = usersTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => usersTableModule.load(), []);

  const navigate: NavigateFunction = useNavigate();

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [showDeleted, setShowDeleted] = React.useState(false);

  const applySearchAndFilter: (data: User[]) => User[] = (data: User[]) =>
    data
      .filter(
        user =>
          user.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter(user => showDeleted || user.deletedAt === null);

  React.useEffect(() => {
    void loadFn();
  }, []);

  const extraColumns: TableProps<User>["columns"] = React.useMemo(
    () => [
      {
        title: "Действия",
        key: "actions",
        render: (user: User) => (
          <Row className="flex-row flex-nowrap gap-2">
            <UserUpdateFeature.Icon disabled={user.deletedAt !== null} userId={user.id} />
            {user.deletedAt === null ? (
              <UserDeleteFeature.Icon disabled={user.deletedAt !== null} user={user} onSuccess={loadFn} />
            ) : (
              <UserRestoreFeature.Icon disabled={user.deletedAt === null} user={user} onSuccess={loadFn} />
            )}
          </Row>
        )
      }
    ],
    [loadFn]
  );

  return (
    <Flex vertical gap={12}>
      {showSearch && (
        <Flex gap={12} align="center">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Поиск по имени и почте"
          />
          <AccessCheck type="hide" roles={[Role.ADMIN, Role.MODERATOR]}>
            <Switch
              checked={showDeleted}
              onChange={setShowDeleted}
              unCheckedChildren={<DeleteFilled style={{ color: "salmon" }} />}
              size="default"
            />
          </AccessCheck>
        </Flex>
      )}
      <UserView.Table
        virtual
        columns={extraColumns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => navigate(AppRoutes.getUserUrl(true, record.id))
          };
        }}
        dataSource={convertDataToTableDataSource(applySearchAndFilter(data))}
        loading={loading}
        rowClassName={record => (record.deletedAt === null ? "" : "line-through")}
        locale={tableLocale}
        pagination={{
          locale: paginationLocale,
          position: ["bottomLeft"],
          showQuickJumper: true,
          responsive: true,
          showLessItems: true,
          total: applySearchAndFilter(data).length,
          current: currentPage,
          pageSize: pageSize
        }}
        onChange={onChange}
        rowSelection={{
          type: "checkbox",
          onChange: (_, rows, __) => setSelectedRows(rows),
          hideSelectAll: true,
          selectedRowKeys: selectedRows.map(user => user.id),
          columnTitle: selectedRowColumnTitleOptions?.(selectedRows, async () => {
            await loadFn();
            setSelectedRows([]);
          })
        }}
        {...props}
      />
    </Flex>
  );
});
