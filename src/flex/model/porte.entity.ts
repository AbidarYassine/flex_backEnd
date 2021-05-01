import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';
import { SalleEntity } from './salle.entity';

@Entity('portes')
export class PortEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    nom: string;


    @ManyToOne(() => SalleEntity, salle => salle.portes)
    @JoinColumn({ name: "salle_id", referencedColumnName: 'id' })
    salle: SalleEntity;
}
