import React from "react";
import { ChangePasswordFeature } from "@frontend/features/auth/change-password";

function ChangePasswordPage() {
  return <ChangePasswordFeature.Modal />;
}

export const Component = React.memo(ChangePasswordPage);
