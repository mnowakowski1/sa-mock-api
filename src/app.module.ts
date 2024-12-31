import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
