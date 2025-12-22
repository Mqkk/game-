import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PointMessage, GameState } from '../game/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointMessage, GameState])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

