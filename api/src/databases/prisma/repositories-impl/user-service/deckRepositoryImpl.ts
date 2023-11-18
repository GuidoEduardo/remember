import { InvalidFieldError, NotFoundError } from "../../../../services/common/exceptions";
import { isValidUUID } from "../../../../services/common/utils/stringUtilities";
import { Cards } from "../../../../services/deck-service/@types/card";
import { Deck, DeckOptional, Decks } from "../../../../services/deck-service/@types/deck";
import { DeckRepository } from "../../../../services/deck-service/repositories/deckRepository";
import { MutableRepositoryImpl } from "../common/mutableRepositoryImpl";

export class DeckRepositoryImpl extends MutableRepositoryImpl<Deck> implements DeckRepository {
	async create(data: Deck): Promise<Deck> {
		if (!data) throw new InvalidFieldError('Invalid request creation, objects can not be null');

		const owner = await this.client.user.update({
			where: {
				externalId: data.ownerId
			},
			data: {
				decks: {
					create: data
				}
			},
			include: {
				decks: true
			}
		});

		const deck = owner.decks.find(deck => deck.externalId == data.externalId)!;

		return {
			externalId: deck.externalId,
			ownerId: owner.externalId,
			title: deck.title,
			createdAt: deck.createdAt,
			updatedAt: deck.updatedAt
		};
	}

	async get(externalId: UUID): Promise<Deck | void> {
		if (!isValidUUID(externalId)) throw new NotFoundError("Deck not found");

		const deck = await this.client.deck.findUnique({
			where: {
				externalId
			},
			include: {
				owner: true,
				cards: {
					include: {
						card: true
					}
				}
			}
		});

		if (!deck) throw new NotFoundError("Deck not found");

		return {
			externalId: deck.externalId,
			ownerId: deck.owner.externalId,
			title: deck.title,
			createdAt: deck.createdAt,
			updatedAt: deck.updatedAt
		};
	}

	async getAll(): Promise<Decks> {
		const decks = await this.client.deck.findMany({
			include: {
				owner: true
			}
		});

		return decks.map(deck => ({ ...deck, ownerId: deck.owner.externalId }));
	}

	async find(filter: DeckOptional): Promise<Decks> {
		if(!filter) return [];

		const decks = await this.client.deck.findMany({
			where: {
				title: filter.title
			},
			include: {
				owner: true
			}
		});

		return decks.map(deck => ({ ...deck, ownerId: deck.owner.externalId }));
	};

	async update(externalId: UUID, data: DeckOptional): Promise<Deck> {
		if (!isValidUUID(externalId) || !data) throw new NotFoundError("Deck not found");

		const owner = await this.client.user.findUnique({
			where: {
				externalId: data.ownerId
			}
		});

		if (!owner) throw new NotFoundError("User not found");

		const deck = await this.client.deck.update({
			where: {
				externalId
			},
			data: {
				ownerId: owner.id,
				title: data.title
			}
		});

		return {
			externalId: deck.externalId,
			ownerId: owner.externalId,
			title: deck.title,
			createdAt: deck.createdAt,
			updatedAt: deck.updatedAt
		};
	}

	async delete(externalId: UUID): Promise<void> {
		let cardsToDelete: bigint[] = [];

		if (!isValidUUID(externalId)) throw new NotFoundError("Deck not found");

		const deck = (await this.client.deck.findUnique({
			where: {
				externalId
			},
			include: {
				cards: {
					include: {
						card: {
							include: {
								_count: {
									select: { decks: true }
								}
							}
						}
					}
				}
			}
		}));

		if (!deck) throw new NotFoundError("Deck not found");

		deck.cards.forEach(deck => {
			if (deck.card._count.decks <= 1) {
				cardsToDelete.push(deck.card.id);
			}
		});

		console.log(`${this.contructor.name} deleting connections.`);

		await this.client.deck.update({
			where: { externalId },
			data: {
				cards: {
					deleteMany: {}
				}
			}
		});

		console.log(`${this.contructor.name} deleting exclusively Cards: ${cardsToDelete}`);

		await this.client.card.deleteMany({
			where: {
				id: {
					in: cardsToDelete
				}
			}
		});

		console.log(`${this.contructor.name} deleting Deck.`);

		await this.client.deck.delete({
			where: {
				externalId
			}
		});
	}
}
