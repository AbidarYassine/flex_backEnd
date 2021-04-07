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
    ) {}

    async grantAccessForProf(profEmail: string, doorId: number): Promise<Boolean> {

        const door = await this.porteService.getById(doorId);
        const prof = await this.professeurService.getByEmail(profEmail);
        // chercher les evenements en cours
        const events = await this.eventService.goingOnEvents(door.salle.id);        

        if(events.length == 0) return false;

        events.forEach(event => {
            event.profiles.forEach(profile => {
                if(this.profileService.isProfesseurInProfile(prof, profile)) return true;
            })
        })
        return false;
    }


}