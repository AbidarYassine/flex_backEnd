import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventLogEntity } from "./event-log.entity";

@Entity("listepresences")
export class ListePresenceEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'date' })
    date: Date;

    @ManyToOne(() => EventLogEntity, eventlog => eventlog.listpresences)
    @JoinColumn({ name: "event_log_id", referencedColumnName: '_id' })
    eventlog: EventLogEntity;


}
