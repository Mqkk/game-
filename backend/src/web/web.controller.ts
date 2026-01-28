import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
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
  async getCards(@Req() req: any) {
    const token = req.webToken as string | undefined;
    if (!token) throw new BadRequestException("Нет токена");
    return await this.webService.getCardsForToken(token);
  }

  @UseGuards(WebAuthGuard)
  @Get("home")
  async getHome(@Req() req: any) {
    const token = req.webToken as string | undefined;
    if (!token) throw new BadRequestException("Нет токена");
    return await this.webService.getHomeForToken(token);
  }

  @UseGuards(WebAuthGuard)
  @Put("cards/:id/state")
  async setCardState(
    @Req() req: any,
    @Param("id") id: string,
    @Body() body: { state: 0 | 1 | 2 }
  ) {
    const token = req.webToken as string | undefined;
    if (!token) throw new BadRequestException("Нет токена");
    const cardId = Number(id);
    if (!Number.isFinite(cardId)) throw new BadRequestException("Неверный id");
    const state = body?.state;
    if (state !== 0 && state !== 1 && state !== 2) {
      throw new BadRequestException("Неверный state");
    }
    return await this.webService.setCardStateForToken(token, cardId, state);
  }
}
