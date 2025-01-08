import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Customer } from "./customer.entity";
import { User } from "./user.entity";

@Entity("customer_logs")
export class CustomerLog {
  @PrimaryGeneratedColumn("uuid")
  customer_log_id: string;

  @Column({ type: "varchar", length: 255 })
  action: string;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Customer, customer => customer.customer_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
