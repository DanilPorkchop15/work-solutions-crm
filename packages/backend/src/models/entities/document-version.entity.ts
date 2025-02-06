import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Document } from "./document.entity";
import { User } from "./user.entity";

@Entity("document_versions")
export class DocumentVersion {
  @PrimaryGeneratedColumn("uuid")
  document_version_id: string;

  @Column({ type: "varchar", length: 255 })
  document_url: string;

  @Column({ type: "int", default: 1 })
  version: number;

  @ManyToOne(() => Document, document => document.document_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "document_id" })
  document: Document;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_created_id" })
  user_created: User;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
