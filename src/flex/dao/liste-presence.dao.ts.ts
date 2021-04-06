import { ListePresenceEntity } from '../model/liste-presence.entity';
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(ListePresenceEntity)
export class ListePresenceDao extends Repository<ListePresenceEntity> { }
