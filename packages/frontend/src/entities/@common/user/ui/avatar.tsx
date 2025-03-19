import React from "react";
import { observer } from "mobx-react-lite";
import { Avatar, type AvatarProps } from "antd";

import type { User } from "../interfaces";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

export const UserAvatar = observer(function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar size={40} src={user.avatarUrl} {...props}>
      {user.fullName[0]}
    </Avatar>
  );
});
