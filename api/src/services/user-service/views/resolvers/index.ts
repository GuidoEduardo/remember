import { GraphQlResolver } from '../../../../@types/graphql';
import { userResolver } from './user';

export const UserServiceResolvers: GraphQlResolver[] = [userResolver];
