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

@Entity("document_comments")
export class DocumentComment {
  @PrimaryGeneratedColumn("uuid")
  document_comment_id: string;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Document, document => document.document_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "document_id" })
  document: Document;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
