import { RepetitionEntity } from './../model/repetition.entity';
import { ProfilEntity } from './../model/profil.entity';
import { SalleEntity } from './../model/salle.entity';
import { EventDto } from './../dto/event.dto';
import { EventEntity } from './../model/event.entity';
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository(EventEntity)
export class EventDao extends Repository<EventEntity> { }
