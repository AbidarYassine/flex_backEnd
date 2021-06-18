import { ProfilEntity } from "./profil.entity";
import { EtudiantEntity } from "./etudiant.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { profile } from "node:console";
import { ProfesseurEntity } from "./professeur.entity";

@Entity("filieres")
export class FilierEntity extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;
  @Column({ name: "nom", type: "varchar", length: 20, unique: true })
  nom: string;

  @OneToMany(() => EtudiantEntity, etudiant => etudiant.filiere)
  etudiants: EtudiantEntity[];

  @JoinTable()
  @ManyToMany(
    type => (ProfilEntity),
    profil => profil.filieres
  )
  profils: ProfilEntity[];


}
