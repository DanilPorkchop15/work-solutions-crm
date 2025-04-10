import React from "react";
import { useTitle } from "react-use";

import { LoginFeature } from "../../../../features/auth/login/index";
import { AppTitles } from "../../../../shared/model/services/appTitles";

function LoginPage() {
  useTitle(AppTitles.getAuthTitle());

  return <LoginFeature />;
}

export const Component = React.memo(LoginPage);
