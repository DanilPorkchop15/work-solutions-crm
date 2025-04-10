import React from "react";
import { UserDetailsProvider } from "@frontend/entities/@common/user/model";

import { UserUpdateFeature } from "../../../features/user/update";

function UserUpdatePage() {
  return (
    <UserDetailsProvider>
      <UserUpdateFeature.Modal />
    </UserDetailsProvider>
  );
}

export const Component = React.memo(UserUpdatePage);
