import { PeriodeService } from './services/periode.service';
import { PeriodeDao } from './dao/periode.dao';
import { EventController } from './controllers/event.controller';
import { JourDao } from './dao/jour.dao';
import { JourService } from './services/jour.service';
import { ProfilController } from './controllers/profil.controller';
import { ProfesseurDao } from './dao/professeur.dao';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesseurController } from './controllers/professeur.controller';
import { ProfesseurService } from './services/professeur.service';
import { EtudiantDao } from './dao/etudiant.dao';
import { EtudiantController } from './controllers/etudiant.controller';
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
import { CreneauDao } from './dao/creneau.dao';
import { CreneauService } from './services/creneau.service';
import { CreneauController } from './controllers/creneau.controller';
import { EventService } from './services/event.service';
import { SpecialEventService } from './services/special-event.service';

import { EventLogDao } from './dao/event-log.dao';
import { EventDao } from './dao/event.dao';
import { SpecialEventDao } from './dao/special-event.dao';
import { RepetitionDao } from './dao/repetition.dao';
import { PeriodeController } from './controllers/periode.controller';
import { EventLogService } from './services/event.log.service';
import { EventLogController } from './controllers/eventLog.controller';


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
        EventLogController,
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
        SpecialEventService,
        EventLogService,
        JourService,
        PeriodeService,
    ]
})
export class FlexModule { }
