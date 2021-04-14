import { ProfilEntity } from './profil.entity';
import { UserEntity } from './user.entity';
import { ChildEntity, JoinTable, ManyToMany } from "typeorm";

@ChildEntity()
export class AutreEntity extends UserEntity {
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