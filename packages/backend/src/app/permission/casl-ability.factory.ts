import { AbilityBuilder, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action, Subject } from "@work-solutions-crm/libs/shared/user/user.dto";

import { Role, User } from "../../models/entities/user.entity";

export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

    switch (user.role) {
      case Role.ADMIN:
        can(Action.CREATE, Subject.USERS);
        can(Action.READ, Subject.USERS);
        can(Action.UPDATE, Subject.USERS);
        can(Action.DELETE, Subject.USERS);

        can(Action.CREATE, Subject.CUSTOMERS);
        can(Action.READ, Subject.CUSTOMERS);
        can(Action.UPDATE, Subject.CUSTOMERS);
        can(Action.DELETE, Subject.CUSTOMERS);

        can(Action.CREATE, Subject.DOCUMENTS);
        can(Action.READ, Subject.DOCUMENTS);
        can(Action.UPDATE, Subject.DOCUMENTS);
        can(Action.DELETE, Subject.DOCUMENTS);

        can(Action.CREATE, Subject.TASKS);
        can(Action.READ, Subject.TASKS);
        can(Action.UPDATE, Subject.TASKS);
        can(Action.DELETE, Subject.TASKS);

        can(Action.CREATE, Subject.PROJECTS);
        can(Action.READ, Subject.PROJECTS);
        can(Action.UPDATE, Subject.PROJECTS);
        can(Action.DELETE, Subject.PROJECTS);
        break;
      case Role.MANAGER:
        can(Action.CREATE, Subject.USERS);
        can(Action.READ, Subject.USERS);
        can(Action.UPDATE, Subject.USERS);

        can(Action.CREATE, Subject.CUSTOMERS);
        can(Action.READ, Subject.CUSTOMERS);
        can(Action.UPDATE, Subject.CUSTOMERS);

        can(Action.CREATE, Subject.DOCUMENTS);
        can(Action.READ, Subject.DOCUMENTS);
        can(Action.UPDATE, Subject.DOCUMENTS);

        can(Action.CREATE, Subject.TASKS);
        can(Action.READ, Subject.TASKS);
        can(Action.UPDATE, Subject.TASKS);

        can(Action.CREATE, Subject.PROJECTS);
        can(Action.READ, Subject.PROJECTS);
        can(Action.UPDATE, Subject.PROJECTS);

        can(Action.DELETE, Subject.USERS, { user_id: user.user_id });
        can(Action.DELETE, Subject.CUSTOMERS, { user_id: user.user_id });
        can(Action.DELETE, Subject.DOCUMENTS, { user_id: user.user_id });
        can(Action.DELETE, Subject.TASKS, { user_id: user.user_id });
        can(Action.DELETE, Subject.PROJECTS, { user_id: user.user_id });
        break;
      case Role.MODERATOR:
        can(Action.READ, Subject.USERS);
        can(Action.READ, Subject.CUSTOMERS);
        can(Action.READ, Subject.DOCUMENTS);
        can(Action.READ, Subject.TASKS);
        can(Action.READ, Subject.PROJECTS);

        can(Action.CREATE, Subject.USERS);
        can(Action.CREATE, Subject.CUSTOMERS);
        can(Action.CREATE, Subject.DOCUMENTS);
        can(Action.CREATE, Subject.TASKS);
        can(Action.CREATE, Subject.PROJECTS);

        can(Action.UPDATE, Subject.USERS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.CUSTOMERS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.DOCUMENTS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.TASKS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.PROJECTS, { user_id: user.user_id });

        can(Action.DELETE, Subject.USERS, { user_id: user.user_id });
        can(Action.DELETE, Subject.CUSTOMERS, { user_id: user.user_id });
        can(Action.DELETE, Subject.DOCUMENTS, { user_id: user.user_id });
        can(Action.DELETE, Subject.TASKS, { user_id: user.user_id });
        can(Action.DELETE, Subject.PROJECTS, { user_id: user.user_id });
        break;
      case Role.USER:
        can(Action.READ, Subject.USERS);
        can(Action.READ, Subject.CUSTOMERS);
        can(Action.READ, Subject.DOCUMENTS);
        can(Action.READ, Subject.TASKS);
        can(Action.READ, Subject.PROJECTS);

        can(Action.DELETE, Subject.USERS, { user_id: user.user_id });
        can(Action.DELETE, Subject.CUSTOMERS, { user_id: user.user_id });
        can(Action.DELETE, Subject.DOCUMENTS, { user_id: user.user_id });
        can(Action.DELETE, Subject.TASKS, { user_id: user.user_id });
        can(Action.DELETE, Subject.PROJECTS, { user_id: user.user_id });

        can(Action.UPDATE, Subject.USERS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.CUSTOMERS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.DOCUMENTS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.TASKS, { user_id: user.user_id });
        can(Action.UPDATE, Subject.PROJECTS, { user_id: user.user_id });

        cannot(Action.CREATE, Subject.CUSTOMERS);
        cannot(Action.CREATE, Subject.DOCUMENTS);
        cannot(Action.CREATE, Subject.TASKS);
        cannot(Action.CREATE, Subject.PROJECTS);

        break;
    }
    return build();
  }
}
