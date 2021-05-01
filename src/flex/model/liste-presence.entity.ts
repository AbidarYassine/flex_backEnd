import { EtudiantEntity } from './etudiant.entity';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventLogEntity } from "./event-log.entity";

@Entity("listepresences")
export class ListePresenceEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'date', type: "varchar" })
    date: string;

    @ManyToOne(() => EventLogEntity, eventlog => eventlog.listpresences)
    @JoinColumn({ name: "event_log_id", referencedColumnName: 'id' })
    eventlog: EventLogEntity;

    @JoinTable()
    @ManyToMany(
        type => EtudiantEntity,
        (etudiant) => etudiant.listpresences,
        {
            cascade: true,
        }
    )
    etudiants: EtudiantEntity[];


}
