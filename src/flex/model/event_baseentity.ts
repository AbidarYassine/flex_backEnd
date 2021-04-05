import { SalleEntity } from './salle.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';

export class EventBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    _nom: string;


    @Column({ name: 'desc', type: 'varchar' })
    _desc: string;

    get id() {
        return this._id;
    }
    get nom() {
        return this._nom;
    }

    get desc() {
        return this._desc;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    set desc(desc: string) {
        this._desc = desc;
    }

}