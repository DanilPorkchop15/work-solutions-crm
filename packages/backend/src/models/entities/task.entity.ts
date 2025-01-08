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

import { Project } from "./project.entity";
import { TaskComment } from "./task-comment.entity";
import { TaskLog } from "./task-log.entity";
import { User } from "./user.entity";

enum TaskStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELED = "canceled"
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  task_id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "timestamp", nullable: true })
  start_date?: Date;

  @Column({ type: "timestamp", nullable: true })
  end_date?: Date;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.ACTIVE })
  status: TaskStatus;

  @Column({ type: "int", nullable: true })
  time_spent?: number;

  @Column({ type: "int", nullable: true })
  estimated_time?: number;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_created_id" })
  user_created: User;

  @ManyToOne(() => Project, project => project.project_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @OneToMany(() => TaskComment, taskComment => taskComment.task)
  task_comments: TaskComment[];

  @OneToMany(() => TaskLog, taskLog => taskLog.task)
  task_logs: TaskLog[];

  @ManyToMany(() => User, user => user.tasks_accountable, { onDelete: "CASCADE" })
  @JoinTable()
  users_accountable: User[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
