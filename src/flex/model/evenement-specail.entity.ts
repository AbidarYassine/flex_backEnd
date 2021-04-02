import { ChildEntity, Column } from "typeorm";
import { BaseEvenement } from "./base-evenement.entity";
@ChildEntity("evenementSpecail")
export class EvenementSpecailEntity extends BaseEvenement {
    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: "validated", type: 'boolean', default: false })
    validated: boolean;

    @Column({ name: 'heureDeb' })
    heureDeb: string;

    @Column({ name: 'heureFin' })
    heureFin: string;
}
