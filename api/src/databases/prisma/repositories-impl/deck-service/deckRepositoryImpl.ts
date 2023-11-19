import { PrismaClient } from '@prisma/client';
import { InvalidFieldError, NotFoundError, UnknownError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { Deck, DeckOptional, Decks } from '../../../../services/deck-service/@types/deck';
import { DeckRepository } from '../../../../services/deck-service/repositories/deckRepository';
import { MutableRepositoryImpl } from '../common/mutableRepositoryImpl';

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
	async getAll(): Promise<Decks> {
		const decks = await this.client.deck.findMany({
			include: {
				owner: {
					select: {
						externalId: true,
					},
				},
				_count: {
					select: {
						cards: true,
					},
				},
			},
		});

		return decks.map((deck) => ({ ...deck, ownerId: deck.owner.externalId }));
	}

	@DeckRepositoryImpl.handleError
	async find(filter: DeckOptional): Promise<Decks> {
		if (!filter) return [];

		const decks = await this.client.deck.findMany({
			where: {
				title: filter.title,
			},
			include: {
				owner: true,
				_count: {
					select: {
						cards: true,
					},
				},
			},
		});

		return decks.map((deck) => ({ ...deck, ownerId: deck.owner.externalId }));
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
