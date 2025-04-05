import { UserAvatar } from "./avatar";
import { UserPreviewTooltip } from "./preview";
import { UserRoleSelect } from "./selectRoleView";
import { UserSelectView } from "./selectView";
import { UsersTableView } from "./tableView";

export const UserView = {
  Table: UsersTableView,
  Avatar: UserAvatar,
  Select: UserSelectView,
  Preview: UserPreviewTooltip,
  RoleSelect: UserRoleSelect
};

export * from "./UserInput";
