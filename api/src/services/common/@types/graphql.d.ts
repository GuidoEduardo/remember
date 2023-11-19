import { GraphQlTypename } from '../../../@types/graphql';
import { ErrorEvent } from './error';

type Request = {
	offset: number;
	currentPage: number;
};

interface Response extends Request {
	pages: number;
}

type ResultOrError<T> = T | ((T | ErrorEvent) & GraphQlTypename);
type ResultsOrError<T> = ({ objects: T[] } | ErrorEvent) & GraphQlTypename & Response;

export { ResultOrError, ResultsOrError, Response, Request, Paginate };
