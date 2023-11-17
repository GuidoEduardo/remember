import { DocumentNode } from 'graphql';
import { main } from './main';
import { user } from './userSchema';

export const UserServiceTypeDefs: DocumentNode[] = [main, user];
