import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
import { AdminAuthService } from "./admin-auth.service";
import { AdminAuthGuard } from "./admin-auth.guard";

@Controller("api/admin/auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("login")
  async login(@Body() body: { password: string }) {
    return await this.adminAuthService.login(body.password || "");
  }

  @UseGuards(AdminAuthGuard)
  @Put("password")
  async setPassword(@Body() body: { password: string }) {
    return await this.adminAuthService.setPassword(body.password || "");
  }
}
