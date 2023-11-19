import { randomUUID } from 'crypto';
import { MutableControllerImpl } from '../../common/controllers/mutableControllerImpl';
import { Deck as DeckType, DeckCreate, DeckOptional } from '../@types/deck';
import { DeckOrError, DecksOrError } from '../@types/graphql';
import { Deck, Decks } from '../entities/deck';
import { DeckRepository } from '../repositories/deckRepository';
import { Request, ResultOrError } from '../../common/@types/graphql';
import { setOptions } from '../../common/utils/requestUtilities';

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
	async createMany(deckRequests: DeckCreate[]): Promise<ResultOrError<number>> {
		deckRequests = deckRequests.map((deck) => ({ ...deck, externalId: randomUUID() }));

		const requestedDecks = await Decks.parseAsync(deckRequests);

		const decksCount = await this.repository.createMany(requestedDecks);

		return decksCount;
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
	async getAll(options?: Request): Promise<DecksOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.getAll(options);

		objects = await Decks.parseAsync(objects);

		return {
			__typename: 'Decks',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
		};
	}

	@DeckController.handleError
	async find(filter: DeckOptional, options?: Request): Promise<DecksOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.find(options, filter);

		objects = await Decks.parseAsync(objects);

		return {
			__typename: 'Decks',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
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

		return 'Deck deleted succesfully';
	}
}
