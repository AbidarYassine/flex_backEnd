import { EntityRepository, getRepository, Repository } from "typeorm";
import { PorteDto } from "../dto/porte.dto";
import { PortEntity } from "../model/porte.entity";

@EntityRepository(PortEntity)
export class PorteDao extends Repository<PortEntity> {

    async createPorte(porteDto: PorteDto) {
        const porte = new PortEntity();
        porte.nom = porteDto.nom;

        await getRepository(PortEntity).save(porte);
        return porte;
    }

}