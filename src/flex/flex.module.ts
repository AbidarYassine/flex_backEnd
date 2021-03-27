import { ProfesseurDao } from './dao/professeur.dao';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesseurController } from './controllers/professeur.controller';
import { ProfesseurService } from './services/professeur.service';
import { EtudiantDao } from './dao/etudiantdao';
import { EtudaintController } from './controllers/etudiant.controller';
import { EtudaintService } from './services/etudiant.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProfesseurDao, EtudiantDao])],
    controllers: [ProfesseurController, EtudaintController],
    providers: [ProfesseurService, EtudaintService]
})
export class FlexModule { }
