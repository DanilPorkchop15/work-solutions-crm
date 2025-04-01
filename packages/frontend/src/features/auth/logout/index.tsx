import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { AuthService } from "../service";

interface LogoutFeatureProps {
  isButton?: boolean;
}

export const LogoutFeature: React.FC<LogoutFeatureProps> = React.memo(function LogoutButton({
  isButton
}: LogoutFeatureProps) {
  const navigate: (path: string) => void = useNavigate();
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const authService: AuthService = useInjectService(AuthService);

  const logout: () => Promise<void> = useCallback(async () => {
    await authService.logout();
    navigate(AppRoutes.getAuthUrl());
  }, [authService, navigate]);

  return (
    <>
      <ConfirmationDialog cancelText="Отменить" okText="Выйти" subtitle="Вы уверены, что хотите выйти?" title="Выйти" />
      {isButton ? (
        <Button danger type="primary" onClick={withConfirmation(logout)}>
          Выйти из системы
        </Button>
      ) : (
        <Typography.Text type="danger" onClick={withConfirmation(logout)}>
          Выйти
        </Typography.Text>
      )}
    </>
  );
});
