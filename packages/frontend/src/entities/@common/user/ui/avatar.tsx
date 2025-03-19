import React from "react";
import { observer } from "mobx-react-lite";
import { Avatar, type AvatarProps } from "antd";

import { MediasService } from "shared/model/services";

import type { User } from "../interfaces";
import { getUserInitials } from "../lib";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

export const UserAvatar = observer(function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar size={40} src={MediasService.getEntityMediaFullPath(user, "avatar")} {...props}>
      {getUserInitials(user)}
    </Avatar>
  );
});
