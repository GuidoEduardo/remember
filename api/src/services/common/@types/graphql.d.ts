import { GraphQlTypename } from '../../../@types/graphql';
import { ErrorEvent } from './error';

type EntityOrError<T> = (T | ErrorEvent) & GraphQlTypename;
type EntitiesOrError<T> = ({ objects: T[] } | ErrorEvent) & GraphQlTypename;

export { EntitiesOrError, EntityOrError };
