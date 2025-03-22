import React from "react";
import { useTitle } from "react-use";

import { AppTitles } from "@frontend/shared/model/services";
import { LoginFeature } from "@frontend/features/auth/login";

function LoginPage() {
  useTitle(AppTitles.getAuthTitle());

  return <LoginFeature />;
}

export const Component = React.memo(LoginPage);
