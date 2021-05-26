import { AutreEntity } from "./autre.entity";
import { SpecialEventEntity } from "./special_event.entity";
import { EventEntity } from "./event.entity";
import { FilierEntity } from "./filiere.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfesseurEntity } from "./professeur.entity";

@Entity("profils")
export class ProfilEntity extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;
  @Column({ name: "libelle", type: "varchar", length: 50, unique: true })
  libelle: string;
  @Column({ name: "open" })
  open: boolean;


  @ManyToMany(
    type => FilierEntity,
    (filiere) => filiere.profils
  )
  filieres: FilierEntity[];

  @ManyToMany(
    type => ProfesseurEntity,
    (professeur) => professeur.profils
  )
  professeurs: ProfesseurEntity[];

  @ManyToMany(
    type => AutreEntity,
    (autre) => autre.profils
  )
  autres: AutreEntity[];

  @ManyToMany(() => EventEntity, event => event.profiles)
  @ManyToMany(() => EventEntity, event => event.profiles)
  events: EventEntity;

  @ManyToMany(() => SpecialEventEntity, specialEvent => specialEvent.profiles)
  specialEvents: SpecialEventEntity;

}
