import { Repository } from "../../common/repository";
import { User } from "../entities/user";

export interface UserRepository extends Repository<User> {}
