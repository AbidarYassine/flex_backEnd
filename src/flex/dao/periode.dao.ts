import { PeriodeEntity } from './../model/periode.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PeriodeEntity)
export class PeriodeDao extends Repository<PeriodeEntity>{
    
}