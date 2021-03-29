import { EntityRepository, getRepository, Repository } from "typeorm";
import { SalleDto } from "../dto/salle.dto";
import { SalleEntity } from "../model/salle.entity";

@EntityRepository(SalleEntity)
export class SalleDao extends Repository<SalleEntity> {

    async createPorte(salleDto: SalleDto) {
        const salle = new SalleEntity();
        salle.nom = salleDto.nom;

        await getRepository(SalleEntity).save(salle);
        return salle;
    }

}