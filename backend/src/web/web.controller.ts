import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { WebService } from "./web.service";
import { WebAuthGuard } from "./web.guard";

@Controller("api/web")
export class WebController {
  constructor(private readonly webService: WebService) {}

  @Post("auth/login")
  async login(@Body() body: { password: string }) {
    return await this.webService.login(body.password || "");
  }

  @UseGuards(WebAuthGuard)
  @Get("cards")
  async getCards() {
    return await this.webService.getCards();
  }
}
