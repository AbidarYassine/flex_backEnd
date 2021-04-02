import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('creneaus')
export class CreneauEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
    @Column({ name: 'heureDeb' })
    heureDeb: string;
    @Column({ name: 'heureFin' })
    heureFin: string;



}