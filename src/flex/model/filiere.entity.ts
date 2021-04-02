import { ProfilEntity } from './profil.entity';
import { EtudiantEntity } from './etudiant.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { profile } from 'node:console';

@Entity('filieres')
export class FilierEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;
    @Column({ name: 'nom', type: 'varchar', length: 20, unique: true })
    _nom: string;
    get nom() {
        return this._nom;
    }
    get id() {
        return this._id;
    }
    set nom(nom: string) {
        this._nom = nom;
    }
    @OneToMany(() => EtudiantEntity, etudiant => etudiant.filiere)
    etudiants: EtudiantEntity[];
    @JoinTable()
    @ManyToMany(
        type => (ProfilEntity),
        profil => profil.filieres,
        {
            cascade: true,
        }
    )
    profils: ProfilEntity[];


}