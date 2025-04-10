import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";

export function translateStatus(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.ACTIVE:
      return "Активный";
    case ProjectStatus.COMPLETED:
      return "Завершен";
    case ProjectStatus.CANCELED:
      return "Отменен";
    case ProjectStatus.INACTIVE:
      return "Неактивный";
    case ProjectStatus.PAUSED:
      return "Приостановлен";
  }
}
