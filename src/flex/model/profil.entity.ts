import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profils')
export class ProfilEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    _id: number;
    @Column({ name: 'open' })
    _open: boolean;
    get open() {
        return this._open;
    }
    get id() {
        return this._id;
    }
    set open(open: boolean) {
        this._open = open;
    }


}