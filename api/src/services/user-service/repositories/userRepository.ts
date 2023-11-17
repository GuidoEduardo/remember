import { Repository } from '../../common/repository';
import { UserData } from '../@types/user.schema';

export interface UserRepository extends Repository<UserData> {}
