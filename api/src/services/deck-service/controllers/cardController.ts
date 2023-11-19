import { randomUUID } from 'crypto';
import { ErrorEvent } from '../../common/@types/error';
import { MutableControllerImpl } from '../../common/controllers/mutableControllerImpl';
import { CardCreate, CardOptional, Card as CardType } from '../@types/card';
import { CardOrError, CardsOrError } from '../@types/graphql';
import { CardRepository } from '../repositories/cardRepository';
import { Card, Cards } from '../entities/card';

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
	async get(externalId: UUID): Promise<CardOrError> {
		const card = Card.parse(await this.repository.get(externalId));

		return {
			__typename: 'Card',
			...card,
		};
	}

	@CardController.handleError
	async getAll(): Promise<CardsOrError> {
		const cards = Cards.parse(await this.repository.getAll());

		return {
			__typename: 'Cards',
			objects: cards,
		};
	}

	@CardController.handleError
	async find(filter: CardOptional): Promise<CardsOrError> {
		const cards = Cards.parse(await this.repository.find(filter));

		return {
			__typename: 'Cards',
			objects: cards,
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
	async delete(externalId: UUID): Promise<string | ErrorEvent> {
		await this.repository.delete(externalId);

		return 'Card deleted successfully.';
	}
}
