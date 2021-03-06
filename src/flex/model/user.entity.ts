import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import * as crypto from 'crypto';
import { UserRole } from "../utils/role-enum";
@Entity('users')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nom', type: 'varchar', length: 50 })
    nom: string;

    @Column({ name: 'prenom', type: 'varchar', length: 50 })
    prenom: string;

    @Column({ name: 'password', type: 'varchar', default: 'NULL', nullable: true })
    password: string;

    @Column({ name: "email", unique: true })
    email: string;






}
