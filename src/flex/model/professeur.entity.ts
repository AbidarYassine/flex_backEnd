import { UserEntity } from './user.entity';
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class ProfesseurEntity extends UserEntity {
    @Column({ name: 'admin' })
    _admin: boolean;

    get admin() {
        return this._admin;
    }

    set admin(admin: boolean) {
        this._admin = admin;
    }

}