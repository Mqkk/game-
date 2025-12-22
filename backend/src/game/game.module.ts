import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameState, PointMessage } from './game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameState, PointMessage])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}

