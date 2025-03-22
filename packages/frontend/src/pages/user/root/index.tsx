import React from "react";
import { useTitle } from "react-use";
import { UsersTableModuleProvider } from "@frontend/entities/@common/user";
import { AppTitles } from "@frontend/shared/model/services";
import { useHeader } from "@frontend/widgets/header";
import { UsersTableWidget } from "@frontend/widgets/user";
import { Typography } from "antd";

function Users() {
  useTitle(AppTitles.getUsersTitle());
  useHeader(<Typography.Title level={2}>Пользователи</Typography.Title>);

  return (
    <div className="h-full w-full">
      <UsersTableModuleProvider>
        <UsersTableWidget />
      </UsersTableModuleProvider>
    </div>
  );
}

export const Component = React.memo(Users);
