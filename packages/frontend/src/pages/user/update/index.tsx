import React from "react";
import {
  UserDetailsProvider,
  UserLogsTableModuleProvider,
  UsersTableModuleProvider
} from "@frontend/entities/@common/user/model";

import { UserUpdateFeature } from "../../../features/user/update";

function UserUpdatePage() {
  return (
    <UserLogsTableModuleProvider>
      <UsersTableModuleProvider>
        <UserDetailsProvider>
          <UserUpdateFeature.Modal />
        </UserDetailsProvider>
      </UsersTableModuleProvider>
    </UserLogsTableModuleProvider>
  );
}

export const Component = React.memo(UserUpdatePage);
