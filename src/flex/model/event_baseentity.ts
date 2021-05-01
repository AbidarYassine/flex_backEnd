import { SalleEntity } from './salle.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';

export class EventBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    nom: string;


    @Column({ name: 'desc', type: 'varchar' })
    desc: string;

}
