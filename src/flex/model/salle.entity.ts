import { EventEntity } from './event.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';

@Entity('salles')
export class SalleEntity extends BaseEntity{

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    _nom: string;

    @OneToMany(() => EventEntity, event => event.salle)
    events: EventEntity[];

    get id() {
        return this._id;
    }
    get nom() {
        return this._nom;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

}