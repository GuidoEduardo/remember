import { z } from 'zod';
import { UserSchema } from './user.schema';

export type UserSchema = z.infer<typeof UserSchema>;
export type CreateUser = Omit<UserSchema, 'createdAt' | 'updatedAt'>;
