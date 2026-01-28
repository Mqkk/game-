import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebController } from "./web.controller";
import { WebService } from "./web.service";
import { WebCard, WebCardState, WebConfig } from "./web.entity";
import { WebAuthGuard } from "./web.guard";

@Module({
  imports: [TypeOrmModule.forFeature([WebCard, WebConfig, WebCardState])],
  controllers: [WebController],
  providers: [WebService, WebAuthGuard],
  exports: [WebService],
})
export class WebModule {}
