import { Answer, Answers } from '../entities/answer';
import { Answer as AnswerType } from '../@types/answer';
import { ControllerImpl } from '../../common/controllers/controller';
import { AnswerRepository } from '../repositories/answerRepository';
import { AnswerOrError, AnswersOrError } from '../@types/graphql';
import { randomUUID } from 'crypto';

export class AnswerController extends ControllerImpl<AnswerType> {
	repository: AnswerRepository;

	constructor(repository: AnswerRepository) {
		super();
		this.repository = repository;
	}

	@AnswerController.handleError
	async create(data: object): Promise<AnswerOrError> {
		const requestAnswer = Answer.parse({
			externalId: randomUUID(),
			...data,
		});

		const answer = Answer.parse(await this.repository.create(requestAnswer));

		return {
			__typename: 'Answer',
			...answer,
		};
	}

	@AnswerController.handleError
	async get(externalId: string): Promise<AnswerOrError> {
		const answer = Answer.parse(await this.repository.get(externalId));

		return {
			__typename: 'Answer',
			...answer,
		};
	}

	@AnswerController.handleError
	async getAll(): Promise<AnswersOrError> {
		const answers = Answers.parse(await this.repository.getAll());

		return {
			__typename: 'Answers',
			objects: answers,
		};
	}

	@AnswerController.handleError
	async find(filter: object): Promise<AnswersOrError> {
		const answers = Answers.parse(await this.repository.find(filter));

		return {
			__typename: 'Answers',
			objects: answers,
		};
	}
}
