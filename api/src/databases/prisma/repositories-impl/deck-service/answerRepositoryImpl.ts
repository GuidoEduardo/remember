import { DifficultyLevel, PrismaClient, PrismaPromise } from '@prisma/client';
import { InvalidFieldError, NotFoundError, UnknownError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { Answer, AnswerOptional, Answers } from '../../../../services/deck-service/@types/answer';
import { AnswerRepository } from '../../../../services/deck-service/repositories/answerRepository';
import { RepositoryImpl } from '../common/repositoryImpl';
import { Request } from '../../../../services/common/@types/graphql';
import { GenericResults } from '../../../../services/common/@types/repository';

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
	async createMany(data: Answers): Promise<number> {
		if (!data) {
			throw new InvalidFieldError('The requested creation object can not be null');
		}

		const queries = data.map(
			(answer) =>
				this.client.$executeRaw`INSERT INTO "Answer" (
				"externalId",
				"cardId",
				"answeredById",
				"answeredAt",
				"answerAgainAt",
				difficulty
			)
			VALUES (
				${answer.externalId}::UUID,
				(
					SELECT id
					FROM "Card"
					WHERE "Card"."externalId" = ${answer.cardId}::UUID
				),
				(
					SELECT id
					FROM "User"
					WHERE "User"."externalId" = ${answer.answeredById}::UUID
				),
				${answer.answeredAt},
				${answer.answerAgainAt},
				${answer.difficulty}::"DifficultyLevel"
			)`,
		);

		return await this.batch(queries);
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
	async getAll(options: Request): Promise<GenericResults<Answer>> {
		const [pages, answers] = await this.client.$transaction([
			this.client.answer.count(),
			this.client.answer.findMany({
				skip: options.currentPage * options.offset,
				take: options.offset,
				orderBy: {
					answeredAt: 'desc',
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
			}),
		]);

		return {
			objects: answers.map((answer) => ({
				...answer,
				answeredById: answer.answeredBy.externalId,
				cardId: answer.card.externalId,
			})),
			pages: Math.floor(pages / options.offset),
		};
	}

	@AnswerRepositoryImpl.handleError
	async find(options: Request, filter: AnswerOptional): Promise<GenericResults<Answer>> {
		if (!filter) return { objects: [], pages: 0 };

		const filterFormatted = {
			card: {
				externalId: filter.cardId,
			},
			answeredBy: {
				externalId: filter.answeredById,
			},
			difficulty: filter.difficulty,
		};

		const [pages, answers] = await this.client.$transaction([
			this.client.answer.count({
				where: filterFormatted,
			}),
			this.client.answer.findMany({
				skip: options.currentPage * options.offset,
				take: options.offset,
				where: filterFormatted,
				orderBy: {
					answeredAt: 'desc',
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
			}),
		]);

		return {
			objects: answers.map((answer) => ({
				...answer,
				answeredById: answer.answeredBy.externalId,
				cardId: answer.card.externalId,
			})),
			pages: Math.floor(pages / options.offset),
		};
	}
}
