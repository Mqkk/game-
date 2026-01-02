import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("api/admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("messages")
  async getAllMessages() {
    return await this.adminService.getAllMessages();
  }

  @Get("messages/:pointIndex")
  async getMessage(@Param("pointIndex") pointIndex: number) {
    return await this.adminService.getMessage(pointIndex);
  }

  @Post("messages")
  async createMessage(
    @Body() body: { pointIndex: number; message: string; imageUrl?: string }
  ) {
    return await this.adminService.createOrUpdateMessage(
      body.pointIndex,
      body.message,
      body.imageUrl
    );
  }

  @Put("messages/:pointIndex")
  async updateMessage(
    @Param("pointIndex") pointIndex: number,
    @Body() body: { message: string; imageUrl?: string }
  ) {
    return await this.adminService.createOrUpdateMessage(
      pointIndex,
      body.message,
      body.imageUrl
    );
  }

  @Get("game-state")
  async getGameState() {
    return await this.adminService.getGameState();
  }

  @Put("game-state/start-date")
  async updateStartDate(@Body() body: { startDate: string }) {
    return await this.adminService.updateStartDate(body.startDate);
  }

  @Get("welcome-banner")
  async getWelcomeBanner() {
    return await this.adminService.getWelcomeBanner();
  }

  @Put("welcome-banner")
  async updateWelcomeBanner(
    @Body() body: { message: string; enabled: boolean }
  ) {
    return await this.adminService.updateWelcomeBanner(
      body.message,
      body.enabled
    );
  }
}
