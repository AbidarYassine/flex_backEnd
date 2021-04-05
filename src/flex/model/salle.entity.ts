import { SpecialEventEntity } from './special_event.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';
import { PortEntity } from './porte.entity';
import { EventEntity } from './event.entity';

@Entity('salles')
export class SalleEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    _nom: string;

    @OneToMany(() => EventEntity, event => event.salle)
    events: EventEntity[];
    
    
    @OneToMany(() => SpecialEventEntity, specialEvent => specialEvent.salle)
    specialEvents: SpecialEventEntity[];

    get id() {
        return this._id;
    }
    get nom() {
        return this._nom;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    @OneToMany(() => PortEntity, porte => porte.salle)
    portes: PortEntity[];

}