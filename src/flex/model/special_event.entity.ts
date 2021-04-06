import { ProfilEntity } from './profil.entity';
import { JoinTable, ManyToMany } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { SalleEntity } from './salle.entity';
import { ManyToOne } from 'typeorm';
import { Column, Entity } from 'typeorm';
import { EventBaseEntity } from './event_baseentity';

@Entity('sepecial_events')
export class SpecialEventEntity extends EventBaseEntity {
    @Column({ name: 'date', type: 'date' })
    _date: Date;

    @Column({ name: 'heure_deb', type: 'varchar' })
    _heureDeb: string;

    @Column({ name: 'heure_fin', type: 'varchar' })
    _heureFin: string;

    @Column({ name: 'activated', type: 'boolean', default: false })
    _activated: boolean;

    get heureDeb() {
        return this._heureDeb;
    }

    get heureFin() {
        return this._heureFin;
    }

    set heureDeb(heure: string) {
        this._heureDeb = heure;
    }

    set heureFin(heure: string) {
        this._heureFin = heure;
    }

    get date() {
        return this._date
    }

    set date(date: Date) {
        this._date = date;
    }

    get activated() {
        return this._activated;
    }

    set activated(activated: boolean) {
        this._activated = activated;
    }

    @ManyToOne(() => SalleEntity, salle => salle.specialEvents)
    @JoinColumn({ name: "salle_id", referencedColumnName: '_id' })
    salle: SalleEntity;

    @JoinTable()
    @ManyToMany(()=> ProfilEntity, profile => profile.specialEvents)
    profiles: ProfilEntity[];
}