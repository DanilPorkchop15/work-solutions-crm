import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { SQL_CONSTRAINTS } from "../../common/sql-conststrints.enum";

import { Document } from "./document.entity";

@Entity("document_permissions")
@Unique(SQL_CONSTRAINTS.UNIQUE_ROLE_AND_DOCUMENT, (documentPermission: DocumentPermission) => [
  documentPermission.document,
  documentPermission.role
])
export class DocumentPermission {
  @PrimaryGeneratedColumn("uuid")
  document_permission_id: string;

  @ManyToOne(() => Document, document => document.document_id)
  @JoinColumn({ name: "document_id" })
  document: Document;

  @Column({ type: "enum", enum: Role })
  role: Role;
}
