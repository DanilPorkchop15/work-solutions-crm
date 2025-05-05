import { UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";

import { UpdateViewerFormValues } from "../interfaces";

export const mapViewerUpdateFormValuesToUpdateUserDto = (values: UpdateViewerFormValues): UserUpdateRequestDTO => ({
  first_name: values.first_name,
  last_name: values.last_name,
  email: values.email,
  position: values.position,
  avatar_url: values.avatar_url
});
