import { DocumentNode } from 'graphql';
import { baseSchema } from './baseSchema';
import { userSchema } from './userSchema';

export const UserServiceTypeDefs: DocumentNode[] = [baseSchema, userSchema];
