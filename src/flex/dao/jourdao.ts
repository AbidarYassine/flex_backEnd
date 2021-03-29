import { JourEntity } from './../model/jour.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(JourEntity)
export class JourDao extends Repository<JourEntity> {
    async insertJours() {
        const jours = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        for(let i = 0; i < 7; i++){
            const jour = new JourEntity();
            jour.ordre = i+1;
            jour.nom = jours[i];

            await getRepository(JourEntity).save(jour);
        }
    }

}