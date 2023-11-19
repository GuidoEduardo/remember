import { randomUUID } from 'crypto';
import { MutableControllerImpl } from '../../common/controllers/mutableControllerImpl';
import { Deck as DeckType, DeckCreate, DeckOptional } from '../@types/deck';
import { DeckOrError, DecksOrError } from '../@types/graphql';
import { Deck, Decks } from '../entities/deck';
import { DeckRepository } from '../repositories/deckRepository';
import { ResultOrError } from '../../common/@types/graphql';

export class DeckController extends MutableControllerImpl<DeckType> {
	repository: DeckRepository;

	constructor(repository: DeckRepository) {
		super();
		this.repository = repository;
	}

	@DeckController.handleError
	async create(data: DeckCreate): Promise<DeckOrError> {
		const requestDeck = Deck.parse({
			externalId: randomUUID(),
			...data,
		});

		const deck = Deck.parse(await this.repository.create(requestDeck));

		return {
			__typename: 'Deck',
			...deck,
		};
	}

	@DeckController.handleError
	async get(externalId: UUID): Promise<DeckOrError> {
		const deck = Deck.parse(await this.repository.get(externalId));

		return {
			__typename: 'Deck',
			...deck,
		};
	}

	@DeckController.handleError
	async getAll(): Promise<DecksOrError> {
		const decks = Decks.parse(await this.repository.getAll());

		return {
			__typename: 'Decks',
			objects: decks,
		};
	}

	@DeckController.handleError
	async find(filter: DeckOptional): Promise<DecksOrError> {
		const decks = Decks.parse(await this.repository.find(filter));

		return {
			__typename: 'Decks',
			objects: decks,
		};
	}

	@DeckController.handleError
	async update(externalId: UUID, data: DeckOptional): Promise<DeckOrError> {
		const deck = Deck.parse(await this.repository.update(externalId, data));

		return {
			__typename: 'Deck',
			...deck,
		};
	}

	@DeckController.handleError
	async delete(externalId: UUID): Promise<ResultOrError<string>> {
		await this.repository.delete(externalId);

		return "Deck deleted succesfully";
	}
}
