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

import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity("project_comments")
export class ProjectComment {
  @PrimaryGeneratedColumn("uuid")
  project_comment_id: string;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Project, project => project.project_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
