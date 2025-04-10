import React from "react";

import { UserCreateFeature } from "../../../features/user/create/index";

function UserCreatePage() {
  return <UserCreateFeature.Modal />;
}

export const Component = React.memo(UserCreatePage);
