import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOption } from './config/typeorm.config';
import { FlexModule } from './flex/flex.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/jwt-auth-prof-guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    TypeOrmModule.forRoot(typeOrmOption),
    FlexModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
