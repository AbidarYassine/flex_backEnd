import { JoinColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity("event-log")
export class EventLogEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'done', type: 'boolean', default: false })
    done: boolean;

    @ManyToOne(type => EventEntity, event => event.eventLogs)
    @JoinColumn({ name: "event_id", referencedColumnName: '_id' })
    event: EventEntity;
}