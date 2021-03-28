import { Column, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';
import { PortEntity } from './porte.entity';

@Entity('salles')
export class SalleEntity extends BaseEntity{

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 20 })
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
    
    @OneToMany(() => PortEntity, porte => porte.id)
    portes: PortEntity[];
}