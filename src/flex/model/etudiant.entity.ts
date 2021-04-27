import { UserEntity } from './user.entity';
import { ChildEntity, Column, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { FilierEntity } from './filiere.entity';
import { ListePresenceEntity } from './liste-presence.entity';

@ChildEntity()
export class EtudiantEntity extends UserEntity {
    @Column({ name: 'cne' })
    cne: string;


    @ManyToOne(() => FilierEntity, filiere => filiere.etudiants)
    @JoinColumn({ name: "filiere_id", referencedColumnName: 'id' })
    filiere: FilierEntity;

    @ManyToMany(
        type => ListePresenceEntity,
        (listpresence) => listpresence.etudiants,
    )
    listpresences: ListePresenceEntity[];




}
