import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('users')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class UserEntity {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    _nom: string;

    @Column()
    _prenom: string;

    @Column()
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