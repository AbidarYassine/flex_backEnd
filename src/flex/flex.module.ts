import { JourDao } from './dao/jourdao';
import { JourService } from './services/jour.service';
import { EventController } from './controllers/event.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProfilDao } from './dao/profil.dao';
import { ProfilService } from './services/profil.service';
import { ProfilController } from './controllers/profil.controller';

import { ProfesseurDao } from './dao/professeur.dao';
import { ProfesseurService } from './services/professeur.service';
import { ProfesseurController } from './controllers/professeur.controller';

import { EtudiantDao } from './dao/etudiantdao';
import { EtudaintService } from './services/etudiant.service';
import { EtudaintController } from './controllers/etudiant.controller';

import { FiliereDao } from './dao/filiere.dao';
import { FiliereService } from './services/filiere.service';
import { FiliereControlller } from './controllers/filiere.controller';

import { PorteDao } from './dao/porte.dao';
import { PorteService } from './services/porte.service'
import { PorteController } from './controllers/porte.controller';

import { SalleDao } from './dao/salle.dao';
import { SalleService } from './services/salle.service'
import { SalleController } from './controllers/salle.controller';


@Module({
    imports: [TypeOrmModule.forFeature([ProfesseurDao, EtudiantDao, ProfilDao, FiliereDao, PorteDao, SalleDao, JourDao])],
    controllers: [ProfesseurController, EtudaintController, ProfilController, FiliereControlller, PorteController, SalleController, EventController],
    providers: [ProfesseurService, EtudaintService, ProfilService, FiliereService, PorteService, SalleService]
})
export class FlexModule { }
