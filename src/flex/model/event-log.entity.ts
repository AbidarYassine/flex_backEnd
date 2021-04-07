import { BaseEntity, JoinColumn, OneToMany } from 'typeorm';
import { EventEntity } from './event.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ListePresenceEntity } from './liste-presence.entity';

@Entity("event-log")
export class EventLogEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'date', type: "timestamp" })
    date: Date;

    @Column({ name: 'done', type: 'boolean', default: false })
    done: boolean;

    @ManyToOne(type => EventEntity, event => event.eventLogs)
    @JoinColumn({ name: "event_id", referencedColumnName: '_id' })
    event: EventEntity;

    @OneToMany(() => ListePresenceEntity, listPresence => listPresence.eventlog)
    listpresences: ListePresenceEntity[];
}