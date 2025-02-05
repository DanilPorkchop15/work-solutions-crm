import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Customer } from "./customer.entity";
import { CustomerLog } from "./customer-log.entity";
import { Document } from "./document.entity";
import { DocumentComment } from "./document-comment.entity";
import { DocumentLog } from "./document-log.entity";
import { DocumentVersion } from "./document-version.entity";
import { Project } from "./project.entity";
import { ProjectComment } from "./project-comment.entity";
import { ProjectLog } from "./project-log.entity";
import { Task } from "./task.entity";
import { TaskComment } from "./task-comment.entity";
import { TaskLog } from "./task-log.entity";
import { UserLog } from "./user-log.entity";

export enum Role {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
  MODERATOR = "moderator"
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ type: "varchar", length: 255 })
  full_name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  position?: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: "varchar", length: 500, nullable: true })
  avatar_url?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  refresh_token?: string;

  @OneToMany(() => Document, document => document.user_created)
  documents: Document[];

  @OneToMany(() => DocumentVersion, documentVersion => documentVersion.user_created)
  document_versions: DocumentVersion[];

  @OneToMany(() => Project, project => project.user)
  projects_created: Project[];

  @OneToMany(() => Customer, customer => customer.user_created)
  customers_created: Customer[];

  @OneToMany(() => Task, task => task.user_created)
  tasks_created: Task[];

  @OneToMany(() => UserLog, userLog => userLog.user)
  user_logs: UserLog[];

  @OneToMany(() => DocumentLog, documentLog => documentLog.user)
  document_logs: DocumentLog[];

  @OneToMany(() => CustomerLog, customerLog => customerLog.customer)
  customer_logs: CustomerLog[];

  @OneToMany(() => ProjectLog, projectLog => projectLog.project)
  project_logs: ProjectLog[];

  @OneToMany(() => TaskLog, taskLog => taskLog.user)
  task_logs: TaskLog[];

  @OneToMany(() => DocumentComment, documentComment => documentComment.user)
  document_comments: DocumentComment[];

  @OneToMany(() => ProjectComment, projectComment => projectComment.user)
  project_comments: ProjectComment[];

  @OneToMany(() => TaskComment, taskComment => taskComment.user)
  task_comments: TaskComment[];

  @ManyToMany(() => Project, project => project.users_accountable)
  projects_accountable: Project[];

  @ManyToMany(() => Task, task => task.users_accountable)
  tasks_accountable: Task[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
