import { generatePassword } from "@frontend/features/user/import/lib";
import { UserCreateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

import { ImportedUserRow } from "../interfaces";

import { importedUserRowDecoder } from "./decoders";

export const mapImportedDataToBulkCreateDto = (data: unknown[]): UserCreateRequestDTO[] => {
  return data.map((row, index) => {
    const [data, decoderError] = importedUserRowDecoder.decodeAny(row).cata<[ImportedUserRow, null] | [null, string]>({
      Ok: val => [val, null],
      Err: err => [null, err]
    });

    if (decoderError) {
      throw new Error(`Row ${index + 1}: ${decoderError}`);
    }
    if (data) {
      const { fullName, email, password, position, role } = data;

      return {
        full_name: fullName,
        email: email,
        password: password ?? generatePassword(),
        position: position ?? undefined,
        role: role ?? Role.USER // Значение по умолчанию
      };
    } else {
      throw new Error(`Row ${index + 1}: Invalid data`);
    }
  });
};
