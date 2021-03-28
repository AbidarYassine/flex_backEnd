import { Column, Entity } from 'typeorm';
import { EventBaseEntity } from './event_base.entity';

@Entity('sepecial_events')
export class SpecialEventEntity extends EventBaseEntity{
    @Column({name: 'date', type:'date'})
    _date: Date;

    @Column({name: 'activated', type: 'boolean', default: false})
    _activated: boolean;
}