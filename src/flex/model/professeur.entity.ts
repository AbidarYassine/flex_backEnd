import { UserEntity } from './user.entity';
import { ChildEntity, Column, JoinTable, ManyToMany } from "typeorm";
import { ProfilEntity } from './profil.entity';
import { UserRole } from '../utils/role-enum';

@ChildEntity()
export class ProfesseurEntity extends UserEntity {
    @Column({ name: 'admin', type: 'boolean', default: false })
    admin: boolean;
    @Column()
    salt: string;
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PROFESSEUR
    })
    role: string;
    @JoinTable()
    @ManyToMany(
        type => (ProfilEntity),
        profil => profil.professeurs,
        {
            cascade: true,
        }
    )
    profils: ProfilEntity[];
    getRole():string {
        return this.role;
    }



}
