import React, { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown, type MenuProps, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { UserView } from "../../entities/@common/user/ui/index";
import { useViewer } from "../../entities/viewer/hooks";
import { LogoutFeature } from "../../features/auth/logout/index";
import { AppRoutes } from "../../shared/model/services/appRoutes";
import { CrmLogo } from "../../shared/ui/crmLogo/index";

import { useHeaderContext } from "./config";

const UserWidget = observer(function UserWidget() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const viewer = useViewer();

  const userWidgetItems: MenuProps["items"] = React.useMemo(
    () => [
      {
        label: (
          <Typography.Text
            onClick={() => navigate(AppRoutes.getProfileUrl(false, viewer.state.id), { relative: "path" })}
          >
            Профиль
          </Typography.Text>
        ),
        key: "0"
      },
      {
        type: "divider"
      },
      {
        label: <LogoutFeature />,
        key: "2"
      }
    ],
    [pathname]
  );

  return (
    <Dropdown menu={{ items: userWidgetItems }} trigger={["click"]}>
      <UserView.Avatar className="cursor-pointer ml-2" user={viewer.state} />
    </Dropdown>
  );
});

export const Header: React.FC = observer(function HeaderComponent() {
  const { node } = useHeaderContext();

  return (
    <div className="w-full flex justify-between p-4">
      <div>{node}</div>
      <div className="flex items-center">
        <UserWidget />
      </div>
    </div>
  );
});

export { useHeader, HeaderProvider } from "./config";
