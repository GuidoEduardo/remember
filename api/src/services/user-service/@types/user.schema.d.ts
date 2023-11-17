import { z } from 'zod';
import { UserSchema } from '../schemas/user.schema';

type UserData = z.infer<typeof UserSchema>;
type UsersData = z.infer<typeof UserSchemas>;
type UserCreate = Omit<UserData, 'createdAt' | 'updatedAt'>;
type UserFilter = MakeOptional<UserCreate>;

export { UserData, UsersData, UserCreate, UserFilter };
