import React from "react";
import { Avatar, type AvatarProps } from "antd";
import { observer } from "mobx-react-lite";

import type { User, UserPreview } from "../interfaces";

interface UserAvatarProps extends AvatarProps {
  user: UserPreview | User;
}

export const UserAvatar = observer(function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar size={40} src={user.avatarUrl} {...props}>
      {user.fullName[0]}
    </Avatar>
  );
});
