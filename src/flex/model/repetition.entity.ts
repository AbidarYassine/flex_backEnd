import { EventEntity } from './event.entity';
import { CreneauEntity } from './creneau.entity';
import { JourEntity } from './jour.entity';
import { type } from 'node:os';
import { PeriodeEntity } from './periode.entity';
import { JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';

@Entity('repetitions')
export class RepetitionEntity extends BaseEntity{
    @PrimaryGeneratedColumn({name:"id"})
    id: number;

    @ManyToOne(type => EventEntity, event => event.repetitions)
    @JoinColumn()
    event: EventEntity;

    @ManyToOne(type => PeriodeEntity, periode => periode.repetitions)
    @JoinColumn()
    periode: PeriodeEntity;

    
    @ManyToOne(type => JourEntity, jour => jour.repetitions)
    @JoinColumn()
    jour: JourEntity;


    @ManyToOne(type => CreneauEntity, creneau => creneau.repetitions)
    @JoinColumn()
    creneau: CreneauEntity;


}