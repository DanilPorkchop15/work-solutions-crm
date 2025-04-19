import { DocumentPermission } from "@backend/models/entities/document-permission.entity";
import { Role, User } from "@backend/models/entities/user.entity";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DocumentDTO } from "@work-solutions-crm/libs/shared/document/document.dto";
import { Observable } from "rxjs";

import { AuthRequest } from "../auth/auth.types";
import { DocumentService } from "../document/document.service";

import { DocumentPermissionService } from "./document-permission.service";

@Injectable()
export class DocumentPermissionGuard implements CanActivate {
  constructor(
    private readonly documentPermissionService: DocumentPermissionService,
    private readonly documentService: DocumentService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;
    const documentId: string = request.params.documentId;

    console.info(1);
    if (!user?.role || !documentId) {
      return false;
    }
    const document: DocumentDTO = await this.documentService.findOne(documentId);

    const permissions: DocumentPermission[] = await this.documentPermissionService.findAll(documentId);

    return (
      permissions.some(permission => permission.role === user.role) ||
      user.user_id === document.user_created.id ||
      user.role === Role.ADMIN ||
      user.role === Role.MODERATOR
    );
  }
}
