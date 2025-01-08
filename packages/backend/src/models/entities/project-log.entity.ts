import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity("project_logs")
export class ProjectLog {
  @PrimaryGeneratedColumn("uuid")
  project_log_id: string;

  @Column({ type: "varchar", length: 255 })
  action: string;

  @Column({ type: "text", nullable: true })
  comment: string;

  @ManyToOne(() => User, user => user.user_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Project, project => project.project_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project: Project;
}
