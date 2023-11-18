import { z } from 'zod';
import { User, Users } from '../entities/user';

type User = z.infer<typeof User>;
type Users = z.infer<typeof Users>;
type UserCreate = Omit<User, 'createdAt' | 'updatedAt'>;
type UserOptional = MakeOptional<UserCreate>;

export { User, Users, UserCreate, UserOptional };
