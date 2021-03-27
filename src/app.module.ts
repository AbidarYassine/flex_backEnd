import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOption } from './config/typeorm.config';
import { FlexModule } from './flex/flex.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOption), FlexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
