import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('users')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;

    @Column({ name: 'nom', type: 'varchar', length: 20 })
    _nom: string;

    @Column({ name: 'prenom', type: 'varchar', length: 20 })
    _prenom: string;

    @Column({ name: "email", unique: true })
    _email: string;
    get id() {
        return this._id;
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

}