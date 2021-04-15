import { AutreEntity } from './autre.entity';
import { SpecialEventEntity } from './special_event.entity';
import { EventEntity } from './event.entity';
import { FilierEntity } from './filiere.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfesseurEntity } from './professeur.entity';

@Entity('profils')
export class ProfilEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;
    @Column({ name: 'libelle', type: 'varchar', length: 50, unique: true })
    _libelle: string;
    @Column({ name: 'open' })
    _open: boolean;


    get open() {
        return this._open;
    }
    get libelle() {
        return this._libelle;
    }
    get id() {
        return this._id;
    }
    set open(open: boolean) {
        this._open = open;
    }
    set libelle(lib: string) {
        this._libelle = lib;
    }

    @ManyToMany(
        type => FilierEntity,
        (filiere) => filiere.profils,
    )
    filieres: FilierEntity[];

    @ManyToMany(
        type => ProfesseurEntity,
        (professeur) => professeur.profils,
    )
    professeurs: ProfesseurEntity[];

    @ManyToMany(
        type => AutreEntity,
        (autre) => autre.profils,
    )
    autres: AutreEntity[];

    @ManyToMany(()=> EventEntity, event => event.profiles)
    @ManyToMany(() => EventEntity, event => event.profiles)
    events: EventEntity;

    @ManyToMany(() => SpecialEventEntity, specialEvent => specialEvent.profiles)
    specialEvents: SpecialEventEntity;

}