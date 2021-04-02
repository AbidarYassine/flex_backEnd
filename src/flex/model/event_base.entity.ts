import { SalleEntity } from './salle.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';

export class EventBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    _nom: string;


    @Column({ name: 'desc', type: 'varchar' })
    _desc: string;

    @Column({ name: 'heure_deb', type: 'varchar' })
    _heureDeb: string;


    @Column({ name: 'heure_fin', type: 'varchar' })
    _heureFin: string;

    @ManyToOne(() => SalleEntity, salle => salle.events)
    @JoinColumn({ name: "salle_id", referencedColumnName: '_id' })
    salle: SalleEntity;

    get id() {
        return this._id;
    }
    get nom() {
        return this._nom;
    }

    get desc() {
        return this._desc;
    }

    get heureDeb() {
        return this._heureDeb;
    }

    get heureFin() {
        return this._heureFin;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    set desc(desc: string) {
        this._heureDeb = desc;
    }

    set heureDeb(heure: string) {
        this._heureDeb = heure;
    }

    set heureFin(heure: string) {
        this._heureFin = heure;
    }

}