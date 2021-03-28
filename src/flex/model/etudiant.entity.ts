import { UserEntity } from './user.entity';
import { ChildEntity, Column, JoinColumn, ManyToOne } from "typeorm";
import { FilierEntity } from './filiere.entity';

@ChildEntity()
export class EtudiantEntity extends UserEntity {
    @Column({ name: 'cne' })
    _cne: string;
    get cne() {
        return this._cne;
    }
    set cne(cne: string) {
        this._cne = cne;
    }


    @ManyToOne(() => FilierEntity, filiere => filiere.etudiants)
    @JoinColumn({ name: "filiere_id", referencedColumnName: '_id' })
    filiere: FilierEntity;




}