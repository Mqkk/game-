import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('state')
  async getState() {
    return await this.gameService.getGameState();
  }

  @Get('can-move')
  async canMove() {
    return await this.gameService.canMakeMove();
  }

  @Post('move')
  async makeMove() {
    return await this.gameService.makeMove();
  }

  @Get('messages')
  async getMessages() {
    return await this.gameService.getAllMessages();
  }
}

