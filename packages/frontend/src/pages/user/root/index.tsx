import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { User } from "@frontend/entities/@common/user";
import { UserDetailsProvider } from "@frontend/entities/@common/user/model";
import { Flex, Typography } from "antd";

import { UsersTableModuleProvider } from "../../../entities/@common/user/model/table/config";
import { UserBulkDeleteFeature } from "../../../features/user/bulk-delete/index";
import { UserBulkRestoreFeature } from "../../../features/user/bulk-restore/index";
import { UserCreateFeature } from "../../../features/user/create/index";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { useHeader } from "../../../widgets/header/config";
import { UsersTableWidget } from "../../../widgets/user/table/index";

function UsersRootPage() {
  useTitle(AppTitles.getUsersTitle());
  useHeader(<Typography.Title level={2}>Пользователи</Typography.Title>);

  return (
    <div className="h-full w-full">
      <UsersTableModuleProvider>
        <Flex vertical gap={12}>
          <div>
            <UserCreateFeature.Button />
          </div>
          <UsersTableWidget
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
