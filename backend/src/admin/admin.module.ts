import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";
import { AdminAuthGuard } from "./admin-auth.guard";
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
  controllers: [AdminController, AdminAuthController],
  providers: [AdminService, AdminAuthService, AdminAuthGuard],
})
export class AdminModule {}
