import { UserEntity } from './user.entity';
import { ChildEntity, Column, JoinTable, ManyToMany } from "typeorm";
import { ProfilEntity } from './profil.entity';

@ChildEntity()
export class ProfesseurEntity extends UserEntity {
    @Column({ name: 'admin', type: 'boolean', default: false })
    _admin: boolean;

    get admin() {
        return this._admin;
    }

    set admin(admin: boolean) {
        this._admin = admin;
    }
    @JoinTable()
    @ManyToMany(
        type => (ProfilEntity),
        profil => profil.professeurs,
        {
            cascade: true,
        }
    )
    profils: ProfilEntity[];



}