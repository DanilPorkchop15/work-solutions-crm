import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { CustomerLog } from "./customer-log.entity";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  customer_id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email?: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 12, nullable: true })
  inn?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  website?: string;

  @ManyToOne(() => User, user => user.user_id)
  @JoinColumn({ name: "user_created_id" })
  user_created: User;

  @OneToMany(() => CustomerLog, customerLog => customerLog.customer)
  customer_logs: CustomerLog[];

  @OneToMany(() => Project, project => project.customer)
  projects: Project[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
