import { UserEntity } from './user.entity';
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class EtudiantEntity extends UserEntity {
    @Column()
    _cne: string;
    get cne() {
        return this._cne;
    }
    set cne(cne: string) {
        this._cne = cne;
    }



}