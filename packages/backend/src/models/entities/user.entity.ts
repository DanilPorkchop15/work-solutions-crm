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
import { CustomerLog } from "./customer_log.entity";
import { Document } from "./document.entity";
import { DocumentComment } from "./document_comment.entity";
import { DocumentLog } from "./document_log.entity";
import { DocumentVersion } from "./document_version.entity";
import { Project } from "./project.entity";
import { ProjectComment } from "./project_comment.entity";
import { ProjectLog } from "./project_log.entity";
import { UserRole } from "./role_permission.entity";
import { Task } from "./task.entity";
import { TaskComment } from "./task_comment.entity";
import { TaskLog } from "./task_log.entity";
import { UserLog } from "./user_log.entity";

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

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: "varchar", length: 500, nullable: true })
  avatarUrl?: string;

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
