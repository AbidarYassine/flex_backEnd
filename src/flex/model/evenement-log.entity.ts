import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("evenement-log")
export class EvenementLogEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'done', type: 'boolean', default: false })
    done: boolean;
}
