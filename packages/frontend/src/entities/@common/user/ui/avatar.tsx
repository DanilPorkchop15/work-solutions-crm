import React, { memo, useState } from "react";
import { Avatar, type AvatarProps, Image, Tooltip } from "antd";

import type { User, UserPreview } from "../interfaces";

interface UserAvatarProps extends AvatarProps {
  user: UserPreview | User;
  showTooltip?: boolean;
  size?: number;
  showOnlineStatus?: boolean;
  previewable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const UserAvatar = memo(function UserAvatar({
  user,
  showTooltip = false,
  size = 40,
  showOnlineStatus = false,
  previewable = false,
  className,
  style,
  ...props
}: UserAvatarProps) {
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = () => {
    if (previewable && user.avatarUrl) {
      setPreviewVisible(true);
    }
  };

  const avatarContainerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block"
  };

  const onlineStatusStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: `${size / 5}px`,
    height: `${size / 5}px`,
    backgroundColor: "#52c41a",
    borderRadius: "50%"
  };

  const avatarStyle: React.CSSProperties = {
    cursor: previewable && user.avatarUrl ? "pointer" : "default",
    ...style
  };

  const avatarContent = (
    <>
      <Avatar
        size={size}
        src={user.avatarUrl}
        className={className}
        style={avatarStyle}
        onClick={handlePreview}
        {...props}
      >
        {user.fullName?.[0]?.toUpperCase()}
      </Avatar>
      {showOnlineStatus && <span style={onlineStatusStyle} />}
      {previewable && user.avatarUrl && (
        <Image
          width={0}
          height={0}
          src={user.avatarUrl}
          preview={{
            visible: previewVisible,
            src: user.avatarUrl,
            onVisibleChange: visible => setPreviewVisible(visible)
          }}
          style={{ display: "none" }}
        />
      )}
    </>
  );

  const wrappedContent = <div style={avatarContainerStyle}>{avatarContent}</div>;

  return showTooltip ? (
    <Tooltip title={user.fullName} placement="top">
      {wrappedContent}
    </Tooltip>
  ) : (
    wrappedContent
  );
});

UserAvatar.displayName = "UserAvatar";
