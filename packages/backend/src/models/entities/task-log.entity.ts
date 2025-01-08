import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity("task_logs")
export class TaskLog {
  @PrimaryGeneratedColumn("uuid")
  task_log_id: string;

  @Column({ type: "varchar", length: 255 })
  action: string;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Task, task => task.task_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "task_id" })
  task: Task;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
