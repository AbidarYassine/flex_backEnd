import { AutreEntity } from './../model/autre.entity';
import { getRepository } from 'typeorm';
import { SpecialEventService } from './event-special.service';
import { EtudaintService } from './etudiant.service';
import { Injectable } from "@nestjs/common";
import { EventService } from "./event.service";
import { PorteService } from "./porte.service";
import { ProfesseurService } from "./professeur.service";
import { ProfilService } from "./profil.service";

@Injectable()
export class DoorControleService {

    constructor(
        private professeurService: ProfesseurService,
        private eventService: EventService,
        private porteService: PorteService,
        private profileService: ProfilService,
        private etudiantService: EtudaintService,
        private specialEventService: SpecialEventService,
    ) {}

    async grantAccessForProf(profEmail: string, doorId: number): Promise<Boolean> {

        const door = await this.porteService.getById(doorId);
        const prof = await this.professeurService.getByEmail(profEmail);

        if(await this.grantAccessForSpecialEvent(profEmail, doorId)) return true;
        
        // chercher les evenements en cours
        const events = await this.eventService.goingOnEvents(door.salle.id);        

        if(events.length == 0) return false;

        for(let i = 0; i < events.length; i++){
            for(let j = 0; j < events[i].profiles.length; j++){
                // console.log(events[i].profiles[j].id);
                if(await this.profileService.isProfesseurInProfile(prof, events[i].profiles[j].id)) return true;
            }
        }

        return false;
    }
    
    
    async grantAccessForEtudiant(cne: string, doorId: number): Promise<Boolean> {

        const door = await this.porteService.getById(doorId);
        const etudiant = await this.etudiantService.getByCne(cne);

        if(await this.grantAccessForSpecialEvent(etudiant.email, doorId)) return true;

        // chercher les evenements en cours
        const events = await this.eventService.goingOnEvents(door.salle.id);        

        if(events.length == 0) return false;

        for(let i = 0; i < events.length; i++){
            for(let j = 0; j < events[i].profiles.length; j++){
                // console.log(events[i].profiles[j].id);
                if(await this.profileService.isFiliereInProfile(etudiant.filiere, events[i].profiles[j].id)){
                    //TODO: ajouter l'étudiant à la liste de présence.
                    return true;
                }
            }
        }

        return false;
    }


    async grantAccessForSpecialEvent(userEmail: string, doorId: number){
        const door = await this.porteService.getById(doorId);

        const prof = await this.professeurService.getByEmail(userEmail);
        
        let user = null;

        if(!prof){
            const etudiant = await this.etudiantService.getByEmail(userEmail);

            if(!etudiant) {
                const autre = await getRepository(AutreEntity).findOne({ _email:userEmail });

                if(!autre) return false;
                else user = autre;
            }
            else user = etudiant;
            
        }
        else user = prof;

        if(user == null) return false;

        const specialEvents = await this.specialEventService.goingOnSpecialEvents(door.salle.id);

        if(specialEvents.length == 0) return false;

        for(let i = 0; i < specialEvents.length; i++){
            for(let j = 0; j < specialEvents[i].profiles.length; j++){
                if(await this.profileService.isUserInProfile(user.id, specialEvents[i].profiles[j].id)) return true;
            }
        }

        return false;
         
    }

}