import { UserEntity } from './user.entity';
import { ChildEntity, Column, JoinTable, ManyToMany } from "typeorm";
import { ProfilEntity } from './profil.entity';

@ChildEntity()
export class ProfesseurEntity extends UserEntity {
    @Column({ name: 'admin', type: 'boolean', default: false })
    admin: boolean;

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
