import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import * as crypto from 'crypto';
@Entity('users')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 50 })
    _nom: string;

    @Column({ name: 'prenom', type: 'varchar', length: 50 })
    _prenom: string;

    @Column({ name: 'password', type: 'varchar', default: 'NULL' })
    _password: string;

    @Column({ name: "email", unique: true })
    _email: string;

    // @BeforeInsert()
    // hashPassword() {
    //     this._password = crypto.createHmac('sha256', this._password).digest('hex');
    // }


    get id() {
        return this._id;
    }
    get password() {
        return this._password;
    }
    get nom() {
        return this._nom;
    }
    get prenom() {
        return this._prenom;
    }
    get email() {
        return this._email;
    }

    set nom(nom: string) {
        this._nom = nom;
    }
    set prenom(prenom: string) {
        this._prenom = prenom;
    }
    set email(email: string) {
        this._email = email;
    }
    set password(password: string) {
        this._password = password;
    }

}