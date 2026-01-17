import { Controller, Get, Post, Body, Param } from "@nestjs/common";
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

  @Get("messages/:pointIndex")
  async getMessage(@Param("pointIndex") pointIndex: number) {
    return await this.gameService.getPointMessage(Number(pointIndex));
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

  @Get("questions/:pointIndex")
  async getQuestion(@Param("pointIndex") pointIndex: number) {
    return await this.gameService.getPointQuestion(Number(pointIndex));
  }

  @Post("questions/:pointIndex/check")
  async checkAnswer(
    @Param("pointIndex") pointIndex: number,
    @Body() body: { answer: string }
  ) {
    const isCorrect = await this.gameService.checkQuestionAnswer(
      Number(pointIndex),
      body.answer
    );
    return { correct: isCorrect };
  }

  @Get("questions/:pointIndex/answered")
  async isQuestionAnswered(@Param("pointIndex") pointIndex: number) {
    const answered = await this.gameService.isQuestionAnswered(
      Number(pointIndex)
    );
    return { answered };
  }

  @Get("questions/:pointIndex/needed")
  async needsQuestion(@Param("pointIndex") pointIndex: number) {
    const needed = await this.gameService.needsQuestionForPosition(
      Number(pointIndex)
    );
    return { needed };
  }

  @Get("history")
  async getHistory() {
    return await this.gameService.getHistory();
  }
}
