import { EventController } from './controllers/event.controller';
import { JourDao } from './dao/jourdao';
import { JourService } from './services/jour.service';
import { ProfilController } from './controllers/profil.controller';
import { ProfesseurDao } from './dao/professeur.dao';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesseurController } from './controllers/professeur.controller';
import { ProfesseurService } from './services/professeur.service';
import { EtudiantDao } from './dao/etudiantdao';
import { EtudaintController } from './controllers/etudiant.controller';
import { EtudaintService } from './services/etudiant.service';
import { ProfilDao } from './dao/profil.dao';
import { ProfilService } from './services/profil.service';
import { FilierDao } from './dao/filier.dao';
import { FilierService } from './services/filier.service';
import { FilierControlller } from './controllers/filier.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProfesseurDao, EtudiantDao, ProfilDao, FilierDao, JourDao])],
    controllers: [ProfesseurController, EtudaintController, ProfilController, FilierControlller, EventController],
    providers: [ProfesseurService, EtudaintService, ProfilService, FilierService, JourService]
})
export class FlexModule { }
