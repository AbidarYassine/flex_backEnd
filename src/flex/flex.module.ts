import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfesseurController } from './controllers/professeur.controller';
import { ProfesseurSchema } from './model/professeur';
import { ProfesseurService } from './services/professeur.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "Professeur", schema: ProfesseurSchema }])],
    controllers: [ProfesseurController],
    providers: [ProfesseurService]
})
export class FlexModule { }
