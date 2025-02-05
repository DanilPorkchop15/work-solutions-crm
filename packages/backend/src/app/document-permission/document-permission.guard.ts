import { User } from "@backend/models/entities/user.entity";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { AuthRequest } from "../auth/auth.types";

import { DocumentPermissionService } from "./document-permission.service";

@Injectable()
export class DocumentPermissionGuard implements CanActivate {
  constructor(private readonly documentPermissionService: DocumentPermissionService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;
    const documentId: string = request.params.documentId;
    if (!user || !documentId) {
      return false;
    }
    return this.documentPermissionService
      .findAll(documentId)
      .then(documentPermissions =>
        documentPermissions.some(documentPermission => documentPermission.role === user.role)
      );
  }
}
