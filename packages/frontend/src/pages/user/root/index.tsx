import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { User, UsersTableModuleProvider } from "@frontend/entities/@common/user";
import { Flex, Typography } from "antd";

import { UserBulkDeleteFeature } from "../../../features/user/bulk-delete";
import { UserBulkRestoreFeature } from "../../../features/user/bulk-restore";
import { UserCreateFeature } from "../../../features/user/create";
import { UserImportFeature } from "../../../features/user/import";
import { AppTitles } from "../../../shared/model/services";
import { useHeader } from "../../../widgets/header";
import { UsersTableWidget } from "../../../widgets/user/table";

function UsersRootPage() {
  useTitle(AppTitles.getUsersTitle());
  useHeader(<Typography.Title level={2}>Пользователи</Typography.Title>);

  return (
    <div className="h-full w-full">
      <UsersTableModuleProvider>
        <Flex vertical gap={12}>
          <Flex gap={12}>
            <div>
              <UserCreateFeature.Button type="primary" size="large" />
            </div>
            <div>
              <UserImportFeature.Button type="primary" size="large" />
            </div>
          </Flex>
          <UsersTableWidget
            showSearch
            selectedRowColumnTitleOptions={(users: User[], onSuccess?: () => Promise<void>) => (
              <Flex gap={5} justify="center">
                <UserBulkDeleteFeature.Icon users={users} onSuccess={onSuccess} />
                <span>|</span>
                <UserBulkRestoreFeature.Icon users={users} onSuccess={onSuccess} />
              </Flex>
            )}
          />
        </Flex>
        <Outlet />
      </UsersTableModuleProvider>
    </div>
  );
}

export const Component = React.memo(UsersRootPage);
