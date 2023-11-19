import { PrismaClient } from '@prisma/client';
import { InvalidFieldError, NotFoundError, UnknownError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { Deck, DeckOptional, Decks } from '../../../../services/deck-service/@types/deck';
import { DeckRepository } from '../../../../services/deck-service/repositories/deckRepository';
import { MutableRepositoryImpl } from '../common/mutableRepositoryImpl';
import { Request } from '../../../../services/common/@types/graphql';
import { GenericResults } from '../../../../services/common/@types/repository';

export class DeckRepositoryImpl extends MutableRepositoryImpl<Deck> implements DeckRepository {
	constructor(client: PrismaClient) {
		super();
		this.client = client;
	}

	@DeckRepositoryImpl.handleError
	async create(data: Deck): Promise<Deck> {
		if (!data) throw new InvalidFieldError('Invalid request creation, objects can not be null');

		const owner = await this.client.user.update({
			where: {
				externalId: data.ownerId,
			},
			data: {
				decks: {
					create: {
						externalId: data.externalId,
						title: data.title,
					},
				},
			},
			include: {
				decks: true,
			},
		});

		const deck = owner.decks.find((deck) => deck.externalId == data.externalId);

		if (!deck) throw new UnknownError('Could not create Deck');

		return {
			...deck,
			ownerId: owner.externalId,
		};
	}

	@DeckRepositoryImpl.handleError
	async createMany(data: Decks): Promise<number> {
		if (!data) {
			throw new InvalidFieldError('The requested creation object can not be null');
		}

		const queries = data.map(
			(deck) =>
				this.client.$executeRaw`INSERT INTO "Deck" (
				"externalId",
				"title",
				"ownerId"
			)
			VALUES (
				${deck.externalId}::UUID,
				${deck.title},
				(
					SELECT id
					FROM "User"
					WHERE "User"."externalId" = ${deck.ownerId}::UUID
				)
			)`,
		);

		return await this.batch(queries);
	}

	@DeckRepositoryImpl.handleError
	async get(externalId: UUID): Promise<Deck | void> {
		if (!isValidUUID(externalId)) throw new NotFoundError('Deck not found');

		const deck = await this.client.deck.findUnique({
			where: {
				externalId,
			},
			include: {
				owner: true,
				cards: {
					select: {
						externalId: true,
						contentFront: true,
						contentBack: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				_count: {
					select: {
						cards: true,
					},
				},
			},
		});

		if (!deck) throw new NotFoundError('Deck not found');

		return {
			...deck,
			ownerId: deck.owner.externalId,
		};
	}

	@DeckRepositoryImpl.handleError
	async getAll(options: Request): Promise<GenericResults<Deck>> {
		const [pages, decks] = await this.client.$transaction([
			this.client.deck.count(),
			this.client.deck.findMany({
				skip: options.currentPage * options.offset,
				take: options.offset,
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					owner: true,
					_count: {
						select: {
							cards: true,
						},
					},
				},
			}),
		]);

		return {
			objects: decks.map((deck) => ({ ...deck, ownerId: deck.owner.externalId })),
			pages: Math.floor(pages / options.offset)
		}
	}

	@DeckRepositoryImpl.handleError
	async find(options: Request, filter: DeckOptional): Promise<GenericResults<Deck>> {
		if (!filter) return { objects: [], pages: 0 };

		const filterFormatted = {
			owner: {
				externalId: filter.ownerId,
			},
			title: filter.title
		};

		const [pages, decks] = await this.client.$transaction([
			this.client.deck.count({
				where: filterFormatted,
			}),
			this.client.deck.findMany({
				skip: options.currentPage * options.offset,
				take: options.offset,
				where: filterFormatted,
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					owner: true,
					_count: {
						select: {
							cards: true,
						},
					},
				},
			}),
		]);

		return {
			objects: decks.map((deck) => ({ ...deck, ownerId: deck.owner.externalId })),
			pages: Math.floor(pages / options.offset)
		}
	}

	@DeckRepositoryImpl.handleError
	async update(externalId: UUID, data: DeckOptional): Promise<Deck> {
		if (!isValidUUID(externalId) || !data) throw new NotFoundError('Deck not found');

		const owner = await this.client.user.findUnique({
			where: {
				externalId: data.ownerId,
			},
		});

		if (!owner) throw new NotFoundError('User not found');

		const deck = await this.client.deck.update({
			where: {
				externalId,
			},
			data: {
				ownerId: owner.id,
				title: data.title,
			},
		});

		return {
			...deck,
			ownerId: owner.externalId,
		};
	}

	@DeckRepositoryImpl.handleError
	async delete(externalId: UUID): Promise<void> {
		if (!isValidUUID(externalId)) throw new NotFoundError('Deck not found');

		await this.client.deck.delete({
			where: {
				externalId,
			},
		});
	}
}
