import { JourEntity } from './jour.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { EventBaseEntity } from './event_base.entity';

@Entity('events')
export class EventEntity extends EventBaseEntity{
    @ManyToOne(() => JourEntity, jour => jour.events)
    @JoinColumn({ name: "jour_id", referencedColumnName: '_id' })
    jour: JourEntity;
}