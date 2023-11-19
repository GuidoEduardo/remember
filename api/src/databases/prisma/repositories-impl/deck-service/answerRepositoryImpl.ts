import { PrismaClient } from '@prisma/client';
import { InvalidFieldError, NotFoundError, UnknownError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { Answer, AnswerOptional, Answers } from '../../../../services/deck-service/@types/answer';
import { AnswerRepository } from '../../../../services/deck-service/repositories/answerRepository';
import { RepositoryImpl } from '../common/repositoryImpl';

export class AnswerRepositoryImpl extends RepositoryImpl<Answer> implements AnswerRepository {
	constructor(client: PrismaClient) {
		super();
		this.client = client;
	}

	@AnswerRepositoryImpl.handleError
	async create(data: Answer): Promise<Answer> {
		if (!data) throw new InvalidFieldError('Invalid request creation, objects can not be null');

		const user = await this.client.user.findUnique({
			where: {
				externalId: data.answeredById,
			},
			select: {
				id: true,
			},
		});

		if (!user) throw new NotFoundError('User not found');

		const card = await this.client.card.update({
			where: {
				externalId: data.cardId,
			},
			data: {
				answers: {
					create: {
						externalId: data.externalId,
						answeredById: user.id,
						difficulty: data.difficulty,
						answeredAt: data.answeredAt,
						answerAgainAt: data.answerAgainAt,
					},
				},
			},
			select: {
				answers: true,
			},
		});

		const answer = card.answers.find((card) => card.externalId == data.externalId);

		if (!answer) throw new UnknownError('Could not create Answer');

		return {
			...answer,
			cardId: data.cardId,
			answeredById: data.answeredById,
		};
	}

	@AnswerRepositoryImpl.handleError
	async get(externalId: UUID): Promise<Answer> {
		if (!isValidUUID(externalId)) throw new NotFoundError('Answer not found');

		const answer = await this.client.answer.findUnique({
			where: {
				externalId,
			},
			include: {
				answeredBy: {
					select: {
						externalId: true,
					},
				},
				card: {
					select: {
						externalId: true,
					},
				},
			},
		});

		if (!answer) throw new NotFoundError('Answer not found');

		return {
			...answer,
			cardId: answer?.card.externalId,
			answeredById: answer?.answeredBy.externalId,
		};
	}

	@AnswerRepositoryImpl.handleError
	async getAll(): Promise<Answers> {
		const answers = await this.client.answer.findMany({
			include: {
				answeredBy: {
					select: {
						externalId: true,
					},
				},
				card: {
					select: {
						externalId: true,
					},
				},
			},
		});

		return answers.map((answer) => ({
			...answer,
			answeredById: answer.answeredBy.externalId,
			cardId: answer.card.externalId,
		}));
	}

	@AnswerRepositoryImpl.handleError
	async find(filter: AnswerOptional): Promise<Answers> {
		if (!filter) return [];

		const answers = await this.client.answer.findMany({
			include: {
				answeredBy: {
					select: {
						externalId: true,
					},
				},
				card: {
					select: {
						externalId: true,
					},
				},
			},
		});

		return answers.map((answer) => ({
			...answer,
			answeredById: answer.answeredBy.externalId,
			cardId: answer.card.externalId,
		}));
	}
}
