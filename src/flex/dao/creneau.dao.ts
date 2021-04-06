import { CreneauEntity } from '../model/creneau.entity';
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository(CreneauEntity)
export class CreneauDao extends Repository<CreneauEntity> {
    
    async insertCreneaux() {
        const heuresDeb = ["8:00", "10:15", "14:00", "16:15"];
        const heuresFin = ["10:00", "12:15", "16:00", "18:15"];

        for(let i = 0; i < 4; i++){
            const creneau = new CreneauEntity();
            creneau.ordre = i+1;
            creneau.heureDeb = heuresDeb[i];
            creneau.heureFin = heuresFin[i];

            await getRepository(CreneauEntity).save(creneau);
        }
    }
}