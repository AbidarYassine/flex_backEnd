import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('baseEvenements')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class BaseEvenement extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nom', type: 'varchar', length: 50 })
    nom: string;

    @Column({ name: 'desc', type: 'varchar' })
    desc: string;
}
