import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";
import { container, singleton } from "tsyringe";

@singleton()
export class AntdServices {
  public message!: MessageInstance;

  public notification!: NotificationInstance;

  public modal!: Omit<ModalStaticFunctions, "warn">;

  public setMessageInstance(message: MessageInstance) {
    this.message = message;
  }

  public setNotificationInstance(notification: NotificationInstance) {
    this.notification = notification;
  }

  public setModalInstance(modal: Omit<ModalStaticFunctions, "warn">) {
    this.modal = modal;
  }
}

export const antdServices: AntdServices = container.resolve(AntdServices);
