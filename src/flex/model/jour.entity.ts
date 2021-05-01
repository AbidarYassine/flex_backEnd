import { RepetitionEntity } from './repetition.entity';
import { EventEntity } from './event.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jours')
export class JourEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'ordre' })
    ordre: number;

    @Column({ name: 'nom', type: 'varchar', length: 20 })
    nom: string;


    @OneToMany(() => RepetitionEntity, repetition => repetition.jour)
    repetitions: RepetitionEntity[];

}
