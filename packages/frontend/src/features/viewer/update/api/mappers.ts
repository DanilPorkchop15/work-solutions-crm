import { UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";

import { UpdateViewerFormValues } from "../interfaces";

export const mapViewerUpdateFormValuesToUpdateUserDto = (values: UpdateViewerFormValues): UserUpdateRequestDTO => ({
  full_name: values.full_name,
  email: values.email,
  position: values.position,
  avatar_url: values.avatar_url
});
