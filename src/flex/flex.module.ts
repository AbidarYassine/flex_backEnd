import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfilDao } from './dao/profil.dao';
import { ProfilService } from './services/profil.service';
import { ProfilController } from './controllers/profil.controller';

import { ProfesseurDao } from './dao/professeur.dao';
import { ProfesseurService } from './services/professeur.service';
import { ProfesseurController } from './controllers/professeur.controller';

import { EtudiantDao } from './dao/etudiant.dao';
import { EtudaintService } from './services/etudiant.service';
import { EtudiantController } from './controllers/etudiant.controller';

import { FiliereDao } from './dao/filiere.dao';
import { FiliereService } from './services/filiere.service';
import { FiliereControlller } from './controllers/filiere.controller';

import { PorteDao } from './dao/porte.dao';
import { PorteService } from './services/porte.service'
import { PorteController } from './controllers/porte.controller';

import { SalleDao } from './dao/salle.dao';
import { SalleService } from './services/salle.service'
import { SalleController } from './controllers/salle.controller';

import { CreneauDao } from './dao/creneau.dao';
import { CreneauService } from './services/creneau.service';
import { CreneauController } from './controllers/creneau.controller';

import { EventDao } from './dao/event.dao';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';

import { EventLogDao } from './dao/event-log.dao';
import { EventLogService } from './services/event.log.service';
import { EventLogController } from './controllers/eventLog.controller';

import { SpecialEventDao } from './dao/special-event.dao';
import { SpecialEventService } from './services/event-special.service';
import { SpecialEventController } from './controllers/special_event.controller';

import { RepetitionDao } from './dao/repetition.dao';
import { RepetitionService } from './services/repetition.service';
//import { RepetitionController } from './controllers/repetition.controller';

import { PeriodeDao } from './dao/periode.dao';
import { PeriodeService } from './services/periode.service';
import { PeriodeController } from './controllers/periode.controller';
import { ListePresenceService } from './services/liste-presence.service';
import { ListePresenceController } from './controllers/liste-presence.controller';
import { ListePresenceDao } from './dao/liste-presence.dao.ts';

import { JourDao } from './dao/jour.dao';
import { JourService } from './services/jour.service';
//import { JourController } from './controllers/jour.controller';

import { DoorControleService } from './services/door_controle.service';
import { DoorControleController } from './controllers/door_controle.controller';



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
            EventLogDao,
            EventDao,
            SpecialEventDao,
            JourDao,
            RepetitionDao,
            EventDao,
            PeriodeDao,
            EventLogDao,
            ListePresenceDao,

        ])],
    controllers: [
        ProfesseurController,
        EtudiantController,
        ProfilController,
        FiliereControlller,
        PorteController,
        SalleController,
        CreneauController,
        EventController,
        PeriodeController,
        SpecialEventController,
        EventLogController,
        DoorControleController,
        ListePresenceController

    ],
    providers: [
        EtudaintService,
        ProfilService,
        FiliereService,
        PorteService,
        SalleService,
        ProfesseurService,
        CreneauService,
        EventService,
        EventLogService,
        JourService,
        PeriodeService,
        SpecialEventService,
        RepetitionService,
        DoorControleService,
        ListePresenceService,
    ]
})
export class FlexModule { }
