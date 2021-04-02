import { ChildEntity } from "typeorm";
import { BaseEvenement } from "./base-evenement.entity";
@ChildEntity()
export class EvenementEntity extends BaseEvenement { }
