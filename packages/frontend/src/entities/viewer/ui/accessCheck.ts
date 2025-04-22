import { Children, cloneElement, ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PureAbility } from "@casl/ability";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

import { AppRoutes } from "../../../shared/model/services";
import { useViewer } from "../hooks";
import { ViewerModel } from "../model";

type AccessCheckProps = {
  roles?: Role[];
  action?: Action;
  subject?: Subject;
  type: "disable" | "hide" | "redirect";
  children?: ReactElement | ReactElement[];
};

export function AccessCheck({ roles, action, subject, type, children = [] }: AccessCheckProps) {
  const viewerModel: ViewerModel = useViewer();

  const navigate: NavigateFunction = useNavigate();

  const { role: userRole, permissions: userPermissions } = viewerModel.state;

  if (!userRole || !userPermissions) return;

  if (!(roles ?? (action && subject)) || (roles && action && subject)) {
    throw new Error("You need to pass either role or both action and subject");
  }

  const ability: PureAbility<[Action, Subject]> = new PureAbility<[Action, Subject]>(userPermissions);
  const isValid: boolean = roles
    ? roles.includes(userRole)
    : Boolean(action && subject && ability.can(action, subject));

  switch (type) {
    case "disable":
      return isValid
        ? children
        : Children.map(children, child =>
            cloneElement(child, {
              disabled: true
            })
          );
    case "hide":
      return isValid ? children : null;
    case "redirect": {
      if (!isValid) {
        navigate(AppRoutes.getForbiddenUrl());
      }
      return null;
    }
  }
}
