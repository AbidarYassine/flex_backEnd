import { UserEntity } from './user.entity';
import { ChildEntity } from "typeorm";

@ChildEntity()
export class AutretEntity extends UserEntity {
}