import { Controller, Get, Post, Body } from "@nestjs/common";
import { GameService } from "./game.service";

@Controller("api/game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("state")
  async getState() {
    return await this.gameService.getGameState();
  }

  @Get("can-move")
  async canMove() {
    return await this.gameService.canMakeMove();
  }

  @Post("move")
  async makeMove() {
    return await this.gameService.makeMove();
  }

  @Get("messages")
  async getMessages() {
    return await this.gameService.getAllMessages();
  }

  @Post("complete-sudoku")
  async completeSudoku(@Body() body: { position: number }) {
    // position теперь означает день (day)
    await this.gameService.completeSudoku(body.position);
    return { success: true };
  }

  @Get("welcome-banner")
  async getWelcomeBanner() {
    return await this.gameService.getWelcomeBanner();
  }

  @Post("welcome-banner/mark-shown")
  async markBannerShown() {
    await this.gameService.markBannerShown();
    return { success: true };
  }
}
