import { SalleEntity } from './../model/salle.entity';
import { EntityRepository, getRepository, Repository } from "typeorm";
import { PorteDto } from "../dto/porte.dto";
import { PortEntity } from "../model/porte.entity";

@EntityRepository(PortEntity)
export class PorteDao extends Repository<PortEntity> {

    async createPorte(porteDto: PorteDto) {

        
        const porte = new PortEntity();
        const salle = await getRepository(SalleEntity).findOne(porteDto.salleId);
        porte.nom = porteDto.nom;
        porte.salle = salle;

        await getRepository(PortEntity).save(porte);
        return porte;
    }

}