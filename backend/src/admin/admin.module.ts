import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import {
  PointMessage,
  GameState,
  WelcomeBanner,
  PointQuestion,
} from "../game/game.entity";
import { WebCard, WebConfig } from "../web/web.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointMessage,
      GameState,
      WelcomeBanner,
      PointQuestion,
      WebCard,
      WebConfig,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
