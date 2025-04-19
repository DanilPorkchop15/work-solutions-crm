import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useAsync } from "react-use";
import { UserDetailsService } from "@frontend/entities/@common/user/model";
import { PageSpin } from "@worksolutions/antd-react-components";
import { isNil } from "ramda";

import { useInjectService } from "../../../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../../../shared/model/services/appRoutes";

export const UserDetailsProvider = React.memo(function UserDetailsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();

  const userDetailsService: UserDetailsService = useInjectService(UserDetailsService);

  const { loading } = useAsync(async () => {
    if (!isNil(id)) await userDetailsService.loadUserDetails.bind(userDetailsService)({ urlParams: { id } });
  }, [id]);

  if (loading) return <PageSpin />;

  return <ErrorBoundary fallback={<Navigate replace to={AppRoutes.getUsersUrl(true)} />}>{children}</ErrorBoundary>;
});
