import { ProfilEntity } from './profil.entity';
import { JoinTable, ManyToMany } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { SalleEntity } from './salle.entity';
import { ManyToOne } from 'typeorm';
import { Column, Entity } from 'typeorm';
import { EventBaseEntity } from './event_baseentity';

@Entity('sepecial_events')
export class SpecialEventEntity extends EventBaseEntity {
    @Column({name:'date', type: 'varchar'})
    date: string;

    @Column({ name: 'heure_deb', type: 'varchar' })
    heureDeb: string;

    @Column({ name: 'heure_fin', type: 'varchar' })
    heureFin: string;

    @Column({ name: 'activated', type: 'boolean', default: false })
    activated: boolean;


    @ManyToOne(() => SalleEntity, salle => salle.specialEvents)
    @JoinColumn({ name: "salle_id", referencedColumnName: 'id' })
    salle: SalleEntity;

    @JoinTable()
    @ManyToMany(()=> ProfilEntity, profile => profile.specialEvents)
    profiles: ProfilEntity[];
}
