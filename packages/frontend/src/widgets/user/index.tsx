import React from "react";
import { useAsyncFn, useDebounce, useEffectOnce } from "react-use";
import { User, UserView, useUsersTableModule } from "@frontend/entities/@common/user";
import { UsersTableModule } from "@frontend/entities/@common/user/model";
import { convertDataToTableDataSource, useLocalTableOnChange } from "@frontend/shared/lib/tableUtils";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Row, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

export const UsersTableWidget: React.FC = observer(function UsersTableWidget() {
  const usersTableModule: UsersTableModule = useUsersTableModule();
  const { rows } = usersTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => usersTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  useEffectOnce(() => {
    void loadFn();
  });

  const extraColumns: TableProps<User>["columns"] = React.useMemo(
    () => [
      {
        key: "actions",
        render: (user: User) => (
          <Row className="flex-row flex-nowrap">
            {/*<EditUserFeature user={user} />*/}
            {/*<DeleteUserFeature disabled={user.blocked} user={user} onSuccess={loadFn} />*/}
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
      dataSource={convertDataToTableDataSource(data)}
      loading={loading}
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
    />
  );
});
