import { SpecialEventEntity } from './../model/special_event.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SpecialEventEntity)
export class SpecialEventDao extends Repository<SpecialEventEntity> { }
