import { EntityRepository } from 'typeorm';
import { EventEntity } from './../model/event.entity';
import { CreneauEntity } from './../model/creneau.entity';
import { JourEntity } from './../model/jour.entity';
import { RepetitionEntity } from './../model/repetition.entity';
import { getRepository, Repository } from 'typeorm';
import { RepetitionDto } from '../dto/repetition.dto';
import { PeriodeEntity } from '../model/periode.entity';

@EntityRepository(RepetitionEntity)
export class RepetitionDao extends Repository<RepetitionEntity>{
    async createRepetition(repetitionDto: RepetitionDto){
        const repetition = new RepetitionEntity();

        repetition.periode = await getRepository(PeriodeEntity).findOne(repetitionDto.periodeId);
        repetition.jour = await getRepository(JourEntity).findOne({ ordre: repetitionDto.jourOrder });
        repetition.creneau = await getRepository(CreneauEntity).findOne({ ordre: repetitionDto.creaneauOrder });
        repetition.event = await getRepository(EventEntity).findOne(repetitionDto.eventId);

        await getRepository(RepetitionEntity).save(repetition);

        return repetition;
    }
}