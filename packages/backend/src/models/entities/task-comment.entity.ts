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

import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity("task_comments")
export class TaskComment {
  @PrimaryGeneratedColumn("uuid")
  task_comment_id: string;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Task, task => task.task_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "task_id" })
  task: Task;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
