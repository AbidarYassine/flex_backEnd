import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlexModule } from './flex/flex.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://yassine:yassine@cluster0.paqnz.mongodb.net/flex_db?retryWrites=true&w=majority'), FlexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
