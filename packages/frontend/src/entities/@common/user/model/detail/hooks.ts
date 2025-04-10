import { UserDetailsService } from "@frontend/entities/@common/user/model";
import { isNil } from "ramda";

import { useInjectService } from "../../../../../shared/lib/useInjectService";
import type { User } from "../../interfaces";

export function useUserDetails(): User {
  const userDetails: User | null = useInjectService(UserDetailsService).userDetails;

  if (isNil(userDetails)) throw new Error("UserDetails not found");

  return userDetails;
}
