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

import { PorteDao } from './dao/porte.dao';
import { SalleDao } from './dao/salle.dao';
import { PorteService } from './services/porte.service'
import { SalleService } from './services/salle.service'
import { PorteController } from './controllers/porte.controller';
import { SalleController } from './controllers/salle.controller';


@Module({
    imports: [TypeOrmModule.forFeature([ProfesseurDao, EtudiantDao, ProfilDao, FilierDao, PorteDao, SalleDao])],
    controllers: [ProfesseurController, EtudaintController, ProfilController, FilierControlller, PorteController, SalleController],
    providers: [ProfesseurService, EtudaintService, ProfilService, FilierService, PorteService, SalleService ]
})
export class FlexModule { }
