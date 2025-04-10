import React from "react";
import { useTitle } from "react-use";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { ProfileWidget } from "../../../widgets/profile/index";

function ProfilePage() {
  useTitle(AppTitles.getProfileTitle());

  return (
    <Layout.Content>
      <ProfileWidget />
    </Layout.Content>
  );
}

export const Component = React.memo(ProfilePage);
