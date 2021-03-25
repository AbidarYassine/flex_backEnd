import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProffesseurController } from './controllers/proffesseur.controller';
import { ProffesseurSchema } from './model/proffesseur';
import { ProffesseurService } from './services/proffesseur.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "Professeur", schema: ProffesseurSchema }])],
    controllers: [ProffesseurController],
    providers: [ProffesseurService]
})
export class FlexModule { }
