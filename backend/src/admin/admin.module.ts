import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { PointMessage, GameState, WelcomeBanner, PointQuestion } from "../game/game.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PointMessage, GameState, WelcomeBanner, PointQuestion])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
