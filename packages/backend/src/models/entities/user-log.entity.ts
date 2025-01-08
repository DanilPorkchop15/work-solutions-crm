import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";

@Entity("user_logs")
export class UserLog {
  @PrimaryGeneratedColumn("uuid")
  user_log_id: string;

  @Column({ type: "varchar", length: 255 })
  action: string;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
