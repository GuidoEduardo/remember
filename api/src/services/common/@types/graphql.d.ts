import { GraphQlTypename } from '../../../@types/graphql';
import { ErrorEvent } from './error';

type ResultOrError<T> = (T | ((T | ErrorEvent) & GraphQlTypename));
type ResultsOrError<T> = ({ objects: T[] } | ErrorEvent) & GraphQlTypename;

export { ResultOrError, ResultsOrError };
