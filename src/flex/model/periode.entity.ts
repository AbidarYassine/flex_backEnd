import { RepetitionEntity } from './repetition.entity';
import { type } from 'node:os';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('periodes')
export class PeriodeEntity extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
    @Column({ name: 'libelle' })
    libelle: string;
    @Column({ name: 'dateDeb' })
    dateDeb: string;
    @Column({ name: 'dateFin' })
    dateFin: string;

    @OneToMany(type => RepetitionEntity, repetition => repetition.periode)
    repetitions: RepetitionEntity[];
}