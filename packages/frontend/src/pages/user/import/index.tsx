import React from "react";
import { UserImportFeature } from "../../../features/user/import/index";

function UserCreatePage() {
  return <UserImportFeature.Modal />;
}

export const Component = React.memo(UserCreatePage);
