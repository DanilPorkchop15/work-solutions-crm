import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Document } from "./document.entity";
import { User } from "./user.entity";

@Entity("document_logs")
export class DocumentLog {
  @PrimaryGeneratedColumn("uuid")
  document_log_id: string;

  @Column({ type: "varchar", length: 255 })
  action: string;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Document, document => document.document_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "task_id" })
  document: Document;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
