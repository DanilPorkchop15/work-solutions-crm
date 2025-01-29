import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { Version } from "./config.schema";
import { ConfigService } from "./config.service";

@ApiTags("Config")
@Controller()
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @ApiOperation({ summary: "Get application version" })
  // @ApiResponse({ status: 200, description: "Returns the application version.", type: Version })
  @Get("/config/version")
  version(): Version {
    return this.configService.version;
  }
}
