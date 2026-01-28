import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminAuthGuard } from "./admin-auth.guard";

@Controller("api/admin")
@UseGuards(AdminAuthGuard)
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

  @Get("questions")
  async getAllQuestions() {
    return await this.adminService.getAllQuestions();
  }

  @Get("questions/:pointIndex")
  async getQuestion(@Param("pointIndex") pointIndex: number) {
    return await this.adminService.getQuestion(Number(pointIndex));
  }

  @Post("questions")
  async createQuestion(
    @Body() body: { pointIndex: number; question: string; answer: string }
  ) {
    return await this.adminService.createOrUpdateQuestion(
      body.pointIndex,
      body.question,
      body.answer
    );
  }

  @Put("questions/:pointIndex")
  async updateQuestion(
    @Param("pointIndex") pointIndex: number,
    @Body() body: { question: string; answer: string }
  ) {
    return await this.adminService.createOrUpdateQuestion(
      Number(pointIndex),
      body.question,
      body.answer
    );
  }

  // -----------------------
  // Web (Next.js PWA) admin
  // -----------------------

  @Get("web/cards")
  async getWebCards() {
    return await this.adminService.getWebCards();
  }

  @Post("web/cards")
  async createWebCard(
    @Body()
    body: {
      text: string;
      imageUrl?: string | null;
      order?: number;
      enabled?: boolean;
    }
  ) {
    return await this.adminService.createWebCard(body);
  }

  @Put("web/cards/:id")
  async updateWebCard(
    @Param("id") id: string,
    @Body()
    body: Partial<{
      text: string;
      imageUrl: string | null;
      order: number;
      enabled: boolean;
    }>
  ) {
    return await this.adminService.updateWebCard(Number(id), body);
  }

  @Delete("web/cards/:id")
  async deleteWebCard(@Param("id") id: string) {
    return await this.adminService.deleteWebCard(Number(id));
  }

  @Put("web/password")
  async setWebPassword(@Body() body: { password: string }) {
    return await this.adminService.setWebPassword(body.password || "");
  }

  @Get("web/home")
  async getWebHome() {
    return await this.adminService.getWebHome();
  }

  @Put("web/home")
  async setWebHome(@Body() body: { title?: string; description?: string }) {
    return await this.adminService.setWebHome(body);
  }
}
