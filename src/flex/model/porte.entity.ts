import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';
import { SalleEntity } from './salle.entity';

@Entity('portes')
export class PortEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    _nom: string;

    get id() {
        return this._id;
    }
    get nom() {
        return this._nom;
    }

    set nom(nom: string) {
        this._nom = nom;
    }
    
    @ManyToOne(() => SalleEntity, salle => salle.portes)
    @JoinColumn({ name: "porte_id", referencedColumnName: '_id' })
    porte: PortEntity;
}