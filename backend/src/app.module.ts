import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './game/game.module';
import { AdminModule } from './admin/admin.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
	  type: 'sqlite',
  database: join(process.cwd(), 'data', 'game.db'),
  autoLoadEntities: true,
  synchronize: true,
    }),
    GameModule,
    AdminModule,
  ],
})
export class AppModule {}
