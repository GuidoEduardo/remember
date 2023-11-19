import { Answer, Answers, DifficultyTimeInSeconds } from '../entities/answer';
import { ControllerImpl } from '../../common/controllers/controllerImpl';
import { AnswerRepository } from '../repositories/answerRepository';
import { AnswerOrError, AnswersOrError } from '../@types/graphql';
import { randomUUID } from 'crypto';
import { DifficultyLevel } from '@prisma/client';
import { Request, ResultOrError } from '../../common/@types/graphql';
import { Answer as AnswerType, AnswerCreate, AnswerOptional } from '../@types/answer';
import { setOptions } from '../../common/utils/requestUtilities';

export class AnswerController extends ControllerImpl<AnswerType> {
	repository: AnswerRepository;

	constructor(repository: AnswerRepository) {
		super();
		this.repository = repository;
	}

	@AnswerController.handleError
	async create(data: AnswerCreate): Promise<AnswerOrError> {
		const { answeredAt, answerAgainAt } = this.calculateDifficultyTime(data.difficulty);

		const requestAnswer = Answer.parse({
			externalId: randomUUID(),
			answeredAt,
			answerAgainAt,
			...data,
		});

		const answer = Answer.parse(await this.repository.create(requestAnswer));

		return {
			__typename: 'Answer',
			...answer,
		};
	}

	@AnswerController.handleError
	async createMany(answerRequests: AnswerCreate[]): Promise<ResultOrError<number>> {
		const requestedAnswers = Answers.parse(
			answerRequests.map((answer) => ({
				...answer,
				externalId: randomUUID(),
				...this.calculateDifficultyTime(answer.difficulty),
			})),
		);

		const answers = await this.repository.createMany(requestedAnswers);

		return answers;
	}

	@AnswerController.handleError
	async get(externalId: UUID): Promise<AnswerOrError> {
		const answer = Answer.parse(await this.repository.get(externalId));

		return {
			__typename: 'Answer',
			...answer,
		};
	}

	@AnswerController.handleError
	async getAll(options: Request): Promise<AnswersOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.getAll(options);

		objects = await Answers.parseAsync(objects);

		return {
			__typename: 'Answers',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
		};
	}

	@AnswerController.handleError
	async find(filter: AnswerOptional, options?: Request): Promise<AnswersOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.find(options, filter);

		objects = await Answers.parseAsync(objects);

		return {
			__typename: 'Answers',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
		};
	}

	calculateDifficultyTime(difficulty: DifficultyLevel): { answeredAt: Date; answerAgainAt: Date } {
		const answeredAt = new Date();
		const answerAgainAt = new Date(answeredAt.getTime() + DifficultyTimeInSeconds[difficulty]);

		return {
			answeredAt,
			answerAgainAt,
		};
	}
}
