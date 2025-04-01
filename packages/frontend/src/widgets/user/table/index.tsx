import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { User } from "@frontend/entities/@common/user";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Row, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { useUsersTableModule } from "../../../entities/@common/user/model/table/config";
import { UsersTableModule } from "../../../entities/@common/user/model/table/model";
import { UserView } from "../../../entities/@common/user/ui/index";
import { UserDeleteFeature } from "../../../features/user/delete/index";
import { UserRestoreFeature } from "../../../features/user/restore/index";
import { UserUpdateFeature } from "../../../features/user/update/index";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services/appRoutes";

interface UsersTableWidgetProps extends TableProps<User> {
  selectedRowColumnTitleOptions?: (users: User[], onSuccess?: () => Promise<void>) => React.ReactNode;
}

export const UsersTableWidget: React.FC<UsersTableWidgetProps> = observer(function UsersTableWidget({
  selectedRowColumnTitleOptions
}: UsersTableWidgetProps) {
  const usersTableModule: UsersTableModule = useUsersTableModule();
  const { rows } = usersTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => usersTableModule.load(), []);

  const navigate: NavigateFunction = useNavigate();

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

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
    <UserView.Table
      virtual
      columns={extraColumns}
      onRow={(record, rowIndex) => {
        return {
          onDoubleClick: () => navigate(AppRoutes.getUserUrl(true, record.id))
        };
      }}
      dataSource={convertDataToTableDataSource(data)}
      loading={loading}
      rowClassName={record => (record.deletedAt === null ? "" : "line-through")}
      locale={tableLocale}
      pagination={{
        locale: paginationLocale,
        position: ["bottomLeft"],
        showQuickJumper: true,
        responsive: true,
        showLessItems: true,
        total: data.length,
        current: currentPage,
        pageSize: pageSize
      }}
      onChange={onChange}
      rowSelection={{
        type: "checkbox",
        onChange: (_, rows, __) => setSelectedRows(rows),
        hideSelectAll: true,
        selectedRowKeys: selectedRows.map(user => user.id),
        columnTitle: selectedRowColumnTitleOptions?.(selectedRows, loadFn)
      }}
    />
  );
});
