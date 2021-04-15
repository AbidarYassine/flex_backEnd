import { ProfilEntity } from './profil.entity';
import { SalleEntity } from './salle.entity';
import { type } from 'node:os';
import { RepetitionEntity } from './repetition.entity';
import { EventLogEntity } from './event-log.entity';
import { JourEntity } from './jour.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { EventBaseEntity } from './event_baseentity';

@Entity('events')
export class EventEntity extends EventBaseEntity {

    @ManyToOne(() => SalleEntity, salle => salle.events)
    @JoinColumn({ name: "salle_id", referencedColumnName: '_id' })
    salle: SalleEntity;

    @OneToMany(() => EventLogEntity, eventLog => eventLog.event)
    eventLogs: EventLogEntity[];

    @JoinTable()
    @OneToMany(() => RepetitionEntity, repetition => repetition.event)
    repetitions: RepetitionEntity[];

    @JoinTable()
    @ManyToMany(() => ProfilEntity, profile => profile.events)
    profiles: ProfilEntity[];
}