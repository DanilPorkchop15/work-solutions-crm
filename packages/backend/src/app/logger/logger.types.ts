export enum LogType {
  USER = "user",
  DOCUMENT = "document",
  TASK = "task",
  PROJECT = "project"
}

export interface LogOptions {
  user_id: string;
  document_id?: string;
  task_id?: string;
  project_id?: string;
}

export interface LogData {
  action: string;
  comment?: string;
  user?: { user_id: string };
  document?: { document_id: string };
  task?: { task_id: string };
  project?: { project_id: string };
}
