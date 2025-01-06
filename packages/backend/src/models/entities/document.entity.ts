import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { DocumentComment } from "./document_comment.entity";
import { DocumentLog } from "./document_log.entity";
import { DocumentPermission } from "./document_permission.entity";
import { DocumentVersion } from "./document_version.entity";
import { User } from "./user.entity";

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn("uuid")
  document_id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_created_id" })
  user_created: User;

  @OneToMany(() => DocumentLog, documentLog => documentLog.document)
  document_logs: DocumentLog[];

  @OneToMany(() => DocumentComment, documentComment => documentComment.document)
  document_comments: DocumentComment[];

  @OneToMany(() => DocumentVersion, documentVersion => documentVersion.document)
  document_versions: DocumentVersion[];

  @OneToMany(() => DocumentPermission, documentPermission => documentPermission.document)
  document_permissions: DocumentPermission[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
