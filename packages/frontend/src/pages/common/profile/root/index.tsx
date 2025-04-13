import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";

import { AppTitles } from "../../../../shared/model/services/appTitles";
import { Layout } from "../../../../shared/ui/layout";
import { ProfileWidget } from "../../../../widgets/profile";

function ProfilePage() {
  useTitle(AppTitles.getProfileTitle());

  return (
    <Layout.Content>
      <ProfileWidget />
      <Outlet />
    </Layout.Content>
  );
}

export const Component = React.memo(ProfilePage);
