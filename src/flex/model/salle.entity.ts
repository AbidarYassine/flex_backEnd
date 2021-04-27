import { SpecialEventEntity } from './special_event.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';
import { PortEntity } from './porte.entity';
import { EventEntity } from './event.entity';

@Entity('salles')
export class SalleEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nom', type: 'varchar', length: 100 })
    nom: string;

    @OneToMany(() => EventEntity, event => event.salle)
    events: EventEntity[];


    @OneToMany(() => SpecialEventEntity, specialEvent => specialEvent.salle)
    specialEvents: SpecialEventEntity[];

    @OneToMany(() => PortEntity, porte => porte.salle)
    portes: PortEntity[];

}
