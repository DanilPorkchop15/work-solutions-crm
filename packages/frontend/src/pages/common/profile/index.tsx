import React from "react";
import { useTitle } from "react-use";
import { UserDetailsProvider } from "@frontend/entities/@common/user/model";
import { Typography } from "antd";

import { UsersTableModuleProvider } from "../../../entities/@common/user/model/table/config";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { useHeader } from "../../../widgets/header/config";
import { ProfileWidget } from "../../../widgets/profile/index";
import { UserDetailsWidget } from "../../../widgets/user/details/index";

function ProfilePage() {
  useTitle(AppTitles.getProfileTitle());
  useHeader(<Typography.Title level={2}>Профиль</Typography.Title>);

  return (
    <Layout.Content>
      <UsersTableModuleProvider>
        <UserDetailsProvider>
          <ProfileWidget />
        </UserDetailsProvider>
      </UsersTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(ProfilePage);
