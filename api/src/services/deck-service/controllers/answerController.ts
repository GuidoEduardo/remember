import { Answer, Answers, DifficultyTimeInSeconds } from '../entities/answer';
import { AnswerCreate, AnswerOptional, Answer as AnswerType } from '../@types/answer';
import { ControllerImpl } from '../../common/controllers/controllerImpl';
import { AnswerRepository } from '../repositories/answerRepository';
import { AnswerOrError, AnswersOrError } from '../@types/graphql';
import { randomUUID } from 'crypto';
import { DifficultyLevel } from '@prisma/client';

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
	async get(externalId: UUID): Promise<AnswerOrError> {
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
	async find(filter: AnswerOptional): Promise<AnswersOrError> {
		const answers = Answers.parse(await this.repository.find(filter));

		return {
			__typename: 'Answers',
			objects: answers,
		};
	}

	calculateDifficultyTime(difficulty: DifficultyLevel): { answeredAt: Date, answerAgainAt: Date } {
		const answeredAt = new Date();
		const answerAgainAt = new Date(answeredAt.getTime() + DifficultyTimeInSeconds[difficulty]);

		return {
			answeredAt,
			answerAgainAt
		}
	}
}
