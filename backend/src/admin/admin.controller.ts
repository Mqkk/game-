import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('messages')
  async getAllMessages() {
    return await this.adminService.getAllMessages();
  }

  @Get('messages/:pointIndex')
  async getMessage(@Param('pointIndex') pointIndex: number) {
    return await this.adminService.getMessage(pointIndex);
  }

  @Post('messages')
  async createMessage(@Body() body: { pointIndex: number; message: string }) {
    return await this.adminService.createOrUpdateMessage(body.pointIndex, body.message);
  }

  @Put('messages/:pointIndex')
  async updateMessage(
    @Param('pointIndex') pointIndex: number,
    @Body() body: { message: string },
  ) {
    return await this.adminService.createOrUpdateMessage(pointIndex, body.message);
  }

  @Get('game-state')
  async getGameState() {
    return await this.adminService.getGameState();
  }

  @Put('game-state/start-date')
  async updateStartDate(@Body() body: { startDate: string }) {
    return await this.adminService.updateStartDate(body.startDate);
  }
}

