import { randomUUID } from 'crypto';
import { MutableControllerImpl } from '../../common/controllers/mutableControllerImpl';
import { CardCreate, CardOptional, Card as CardType } from '../@types/card';
import { CardOrError, CardsOrError } from '../@types/graphql';
import { CardRepository } from '../repositories/cardRepository';
import { Card, Cards } from '../entities/card';
import { Request, ResultOrError } from '../../common/@types/graphql';
import { setOptions } from '../../common/utils/requestUtilities';

export class CardController extends MutableControllerImpl<CardType> {
	repository: CardRepository;

	constructor(repository: CardRepository) {
		super();
		this.repository = repository;
	}

	@CardController.handleError
	async create(request: CardCreate): Promise<CardOrError> {
		const requestCard = Card.parse({
			externalId: randomUUID(),
			...request,
		});

		const card = Card.parse(await this.repository.create(requestCard));

		return {
			__typename: 'Card',
			...card,
		};
	}

	@CardController.handleError
	async createMany(cardRequests: CardCreate[]): Promise<ResultOrError<number>> {
		cardRequests = cardRequests.map((card) => ({ ...card, externalId: randomUUID() }));

		const requestedCards = await Cards.parseAsync(cardRequests);

		const cardsCount = await this.repository.createMany(requestedCards);

		return cardsCount;
	}

	@CardController.handleError
	async get(externalId: UUID): Promise<CardOrError> {
		const card = Card.parse(await this.repository.get(externalId));

		return {
			__typename: 'Card',
			...card,
		};
	}

	@CardController.handleError
	async getAll(options?: Request): Promise<CardsOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.getAll(options);

		objects = await Cards.parseAsync(objects);

		return {
			__typename: 'Cards',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
		};
	}

	@CardController.handleError
	async find(filter: CardOptional, options?: Request): Promise<CardsOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.find(options, filter);

		objects = await Cards.parseAsync(objects);

		return {
			__typename: 'Cards',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
		};
	}

	@CardController.handleError
	async update(externalId: UUID, data: CardOptional): Promise<CardOrError> {
		const card = Card.parse(await this.repository.update(externalId, data));

		return {
			__typename: 'Card',
			...card,
		};
	}

	@CardController.handleError
	async delete(externalId: UUID): Promise<ResultOrError<string>> {
		await this.repository.delete(externalId);

		return 'Card deleted successfully.';
	}
}
