import { RepetitionEntity } from './repetition.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('creneaux')
export class CreneauEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'ordre' })
    ordre: number;
    @Column({ name: 'heureDeb' })
    heureDeb: string;
    @Column({ name: 'heureFin' })
    heureFin: string;

    @OneToMany(() => RepetitionEntity, repetition => repetition.creneau)
    repetitions: RepetitionEntity[];


}