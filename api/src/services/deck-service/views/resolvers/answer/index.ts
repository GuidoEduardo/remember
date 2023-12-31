import { Request } from '../../../../common/@types/graphql';
import { AnswerCreate, AnswerOptional } from '../../../@types/answer';
import { controllers } from '../../../controllers';
import { AnswerMutator } from './mutation';
import { AnswerSearcher } from './query';

const answerQuery = new AnswerSearcher(controllers.answerController);
const answerMutator = new AnswerMutator(controllers.answerController);

const answerQueries = {
	getAnswer: (_: unknown, request: { id: UUID }) => answerQuery.get(request),
	getAnswers: (_: unknown, request: { options?: Request }) => answerQuery.getAll(request),
	findAnswers: (_: unknown, request: { options?: Request; by: AnswerOptional }) => answerQuery.find(request),
};

const answerMutations = {
	createAnswer: (_: unknown, request: { data: AnswerCreate }) => answerMutator.create(request),
};

export { answerQueries, answerMutations };
