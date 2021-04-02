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
import { FiliereDao } from './dao/filiere.dao';
import { FiliereService } from './services/filiere.service';
import { FiliereControlller } from './controllers/filiere.controller';

import { PorteDao } from './dao/porte.dao';
import { SalleDao } from './dao/salle.dao';
import { PorteService } from './services/porte.service'
import { SalleService } from './services/salle.service'
import { PorteController } from './controllers/porte.controller';
import { SalleController } from './controllers/salle.controller';
import { CreneauDao } from './dao/creneauDao';
import { CreneauService } from './services/creneau.service';
import { CreneauController } from './controllers/creneau.controller';
import { EvenementService } from './services/evenement-service';
import { EvenementController } from './controllers/evenement-controller';
import { EvenementSpecialController } from './controllers/evenement-special-controller';
import { EvenementSpecialService } from './services/evenement-special-service';
import { EvenementLogService } from './services/evenement-log.service';
import { EvenementLogController } from './controllers/evenement-log.controller';
import { EvenementLogDao } from './dao/evenement-log.dao';
import { EvenementDao } from './dao/evenement.dao';
import { EvenementSpecialDao } from './dao/evenement.special.dao';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfesseurDao,
            EtudiantDao,
            ProfilDao,
            FiliereDao,
            PorteDao,
            SalleDao,
            CreneauDao,
            EvenementLogDao,
            EvenementDao,
            EvenementSpecialDao
        ])],
    controllers: [
        ProfesseurController,
        EtudaintController,
        ProfilController,
        FiliereControlller,
        PorteController,
        SalleController,
        CreneauController,
        EvenementController,
        EvenementSpecialController,
        EvenementLogController
    ],
    providers: [
        EtudaintService,
        ProfilService,
        FiliereService,
        PorteService,
        SalleService,
        ProfesseurService,
        CreneauService,
        EvenementService,
        EvenementSpecialService,
        EvenementLogService
    ]
})
export class FlexModule { }
