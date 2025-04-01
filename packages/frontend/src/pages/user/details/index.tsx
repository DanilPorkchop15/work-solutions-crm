import React from "react";
import { useTitle } from "react-use";
import { UserDetailsProvider, UsersTableModuleProvider } from "@frontend/entities/@common/user/model";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { UserDetailsWidget } from "../../../widgets/user/details/index";

export function UserDetailsPage() {
  useTitle(AppTitles.getUserTitle());

  return (
    <Layout.Content>
      <UsersTableModuleProvider>
        <UserDetailsProvider>
          <UserDetailsWidget />
        </UserDetailsProvider>
      </UsersTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(UserDetailsPage);
