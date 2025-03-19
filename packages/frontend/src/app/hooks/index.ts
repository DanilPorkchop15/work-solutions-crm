import type { InstallationHook } from "./interfaces";
import { mobxHook } from "./mobxHook";
import { requestManagerHook } from "./requestManagerHook";

export const preInstallHooks: InstallationHook[] = [mobxHook, requestManagerHook];

export const postInstallHooks: InstallationHook[] = [];
