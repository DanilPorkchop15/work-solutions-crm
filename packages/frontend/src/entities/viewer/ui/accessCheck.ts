import { Children, cloneElement, ReactElement } from "react";
import { PureAbility } from "@casl/ability";
import { useViewer, ViewerModel } from "@frontend/entities/viewer";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

type AccessCheckProps = {
  roles?: Role[];
  action?: Action;
  subject?: Subject;
  type: "disable" | "hide";
  children: ReactElement | ReactElement[];
};

export function AccessCheck({ roles, action, subject, type, children }: AccessCheckProps) {
  const viewerModel: ViewerModel = useViewer();

  const { role: userRole, permissions: userPermissions } = viewerModel.state;

  if (!userRole || !userPermissions) return;

  if (!(roles ?? (action && subject)) || (roles && action && subject)) {
    throw new Error("You need to pass either role or both action and subject");
  }

  const ability: PureAbility<[Action, Subject]> = new PureAbility<[Action, Subject]>(userPermissions);
  const isValid: boolean = roles
    ? roles.includes(userRole)
    : Boolean(action && subject && ability.can(action, subject));

  if (type === "disable") {
    return isValid
      ? children
      : Children.map(children, child =>
          cloneElement(child, {
            disabled: true
          })
        );
  }

  if (type === "hide") {
    return isValid ? children : null;
  }
}
