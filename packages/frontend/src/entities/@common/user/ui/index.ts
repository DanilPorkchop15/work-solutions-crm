import { UserAvatar } from "./avatar";
import { UserFormView } from "./form";
import { UserListItemView } from "./listItem";
import { UsersTableView } from "./tableView";

export const UserView = {
  Table: UsersTableView,
  Form: UserFormView,
  Avatar: UserAvatar,
  ListItem: UserListItemView,
};
