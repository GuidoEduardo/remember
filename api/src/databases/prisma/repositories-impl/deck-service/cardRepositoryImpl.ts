import { PrismaClient } from '@prisma/client';
import { InvalidFieldError, NotFoundError, UnknownError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { Card, CardOptional, Cards } from '../../../../services/deck-service/@types/card';
import { CardRepository } from '../../../../services/deck-service/repositories/cardRepository';
import { MutableRepositoryImpl } from '../common/mutableRepositoryImpl';

export class CardRepositoryImpl extends MutableRepositoryImpl<Card> implements CardRepository {
	constructor(client: PrismaClient) {
		super();
		this.client = client;
	}

	@CardRepositoryImpl.handleError
	async create(data: Card): Promise<Card> {
		if (!data) throw new InvalidFieldError('Invalid request creation, objects can not be null');

		const deck = await this.client.deck.update({
			where: {
				externalId: data.deckId,
			},
			data: {
				cards: {
					create: {
						externalId: data.externalId,
						contentFront: data.contentFront,
						contentBack: data.contentBack,
					},
				},
			},
			include: {
				cards: true,
			},
		});

		const card = deck.cards.find((card) => card.externalId == data.externalId);

		if (!card) throw new UnknownError('Could not create Card');

		return {
			externalId: card.externalId,
			contentFront: card.contentFront,
			contentBack: card.contentBack,
			createdAt: card.createdAt,
			updatedAt: card.updatedAt,
		};
	}

	@CardRepositoryImpl.handleError
	async get(externalId: UUID): Promise<Card> {
		if (!isValidUUID(externalId)) throw new NotFoundError('Card not found');

		const card = await this.client.card.findUnique({
			where: {
				externalId,
			},
			include: {
				deck: {
					select: {
						externalId: true,
					},
				},
				answers: {
					select: {
						externalId: true,
						difficulty: true,
						answeredBy: {
							select: {
								externalId: true,
							},
						},
						answeredAt: true,
						answerAgainAt: true,
					},
				},
			},
		});

		if (!card) throw new NotFoundError('Card not found');

		return {
			...card,
			deckId: card.deck.externalId,
			answers: card.answers.map((answer) => ({
				...answer,
				answeredById: answer.answeredBy.externalId,
			})),
		};
	}

	@CardRepositoryImpl.handleError
	async getAll(): Promise<Cards> {
		const cards = await this.client.card.findMany({
			include: {
				deck: {
					select: {
						externalId: true,
					},
				},
			},
		});

		return cards.map((card) => ({ ...card, deckId: card.deck.externalId }));
	}

	@CardRepositoryImpl.handleError
	async find(filter: CardOptional): Promise<Cards> {
		const cards = await this.client.card.findMany({
			where: {
				contentFront: {
					search: filter.contentFront,
				},
				contentBack: {
					search: filter.contentBack,
				},
			},
			include: {
				deck: {
					select: {
						externalId: true,
					},
				},
			},
		});

		return cards.map((card) => ({ ...card, deckId: card.deck.externalId }));
	}

	@CardRepositoryImpl.handleError
	async update(externalId: UUID, data: CardOptional): Promise<Card> {
		if (!isValidUUID(externalId) || !data) throw new NotFoundError('Card not found');

		const card = await this.client.card.update({
			where: {
				externalId,
			},
			data: {
				contentFront: data.contentFront,
				contentBack: data.contentBack,
			},
			include: {
				deck: {
					select: {
						externalId: true,
					},
				},
			},
		});

		return {
			...card,
			deckId: card.deck.externalId,
		};
	}

	@CardRepositoryImpl.handleError
	async delete(externalId: UUID): Promise<void> {
		if (!isValidUUID(externalId)) throw new NotFoundError('Card not found');

		await this.client.card.delete({
			where: {
				externalId,
			},
		});
	}
}
