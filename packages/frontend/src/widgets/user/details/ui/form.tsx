import React from "react";
import { useAsyncFn } from "react-use";
import { User, UserView } from "@frontend/entities/@common/user";
import { UserDetailsService, useUserDetails } from "@frontend/entities/@common/user/model";
import { AccessCheck } from "@frontend/entities/viewer/ui";
import { Back } from "@frontend/shared/ui/back";
import { useHeader } from "@frontend/widgets/header";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { PageSpin } from "@worksolutions/antd-react-components";
import { Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { UserDeleteFeature } from "../../../../features/user/delete";
import { UserRestoreFeature } from "../../../../features/user/restore";
import { UserUpdateFeature } from "../../../../features/user/update";
import { useInjectService } from "../../../../shared/lib/useInjectService";

export const UserDetailsForm = observer(function UserDetailsForm() {
  const userDetails: User = useUserDetails();

  const userDetailsService: UserDetailsService = useInjectService(UserDetailsService);

  const onSuccess: () => Promise<void> = () =>
    userDetailsService.loadUserDetails({
      urlParams: {
        id: userDetails.id
      }
    });

  useHeader(
    <Flex gap={36} align="center">
      <Back />
      {userDetails.deletedAt !== null ? (
        <Typography.Title level={2}>Информация о пользователе</Typography.Title>
      ) : (
        <Typography.Title level={2}>Редактирование пользователя</Typography.Title>
      )}
      {userDetails.deletedAt === null ? (
        <AccessCheck type="hide" roles={[Role.ADMIN]}>
          <UserDeleteFeature.Button user={userDetails} onSuccess={onSuccess} size="small" />
        </AccessCheck>
      ) : (
        <AccessCheck type="hide" roles={[Role.ADMIN]}>
          <UserRestoreFeature.Button user={userDetails} onSuccess={onSuccess} size="small" />
        </AccessCheck>
      )}
    </Flex>,
    [userDetails.deletedAt]
  );

  const [{ loading }] = useAsyncFn(
    async () =>
      userDetailsService.loadUserDetails({
        urlParams: {
          id: userDetails.id
        }
      }),
    []
  );
  if (loading) return <PageSpin />;

  return (
    <Flex vertical justify="space-between" gap={48}>
      <UserView.Avatar user={userDetails} size={250} shape="square" previewable />
      <UserUpdateFeature.Form />
    </Flex>
  );
});
