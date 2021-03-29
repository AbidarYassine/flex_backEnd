import { EventEntity } from './event.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jours')
export class JourEntity extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({name:'ordre'})
    _ordre: number;

    @Column({ name: 'nom', type: 'varchar', length: 20 })
    _nom: string;

    @OneToMany(() => EventEntity, event => event.jour)
    events: EventEntity[];

    get id() {
        return this._id;
    }
    get nom() {
        return this._nom;
    }
    get ordre() {
        return this._ordre;
    }

    set nom(nom: string) {
        this._nom = nom;
    }
    set ordre(ordre: number) {
        this._ordre = ordre;
    }
}