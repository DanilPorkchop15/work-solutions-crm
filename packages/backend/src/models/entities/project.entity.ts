import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Customer } from "./customer.entity";
import { ProjectComment } from "./project-comment.entity";
import { ProjectLog } from "./project-log.entity";
import { User } from "./user.entity";

enum ProjectStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  COMPLETED = "completed",
  CANCELED = "canceled",
  PAUSED = "paused"
}

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  project_id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "timestamp" })
  start_date: Date;

  @Column({ type: "timestamp" })
  end_date: Date;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
  budget?: number;

  @Column({ type: "enum", enum: ProjectStatus, default: ProjectStatus.ACTIVE })
  status: ProjectStatus;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_created_id" })
  user_created: User;

  @ManyToOne(() => Customer, customer => customer.customer_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => ProjectComment, projectComment => projectComment.project)
  project_comments: ProjectComment[];

  @OneToMany(() => ProjectLog, projectLog => projectLog.project)
  project_logs: ProjectLog[];

  @ManyToMany(() => User, user => user.projects_accountable, { onDelete: "CASCADE" })
  @JoinTable({
    name: "projects_users_accountable",
    joinColumn: { name: "project_id", referencedColumnName: "project_id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "user_id" }
  })
  users_accountable: User[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
