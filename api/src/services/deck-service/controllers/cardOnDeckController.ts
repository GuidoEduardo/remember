import { randomUUID } from "crypto";
import { ControllerImpl } from "../../common/controllers/controller";
import { CardOnDeckCreate, CardOnDeckOptinal, CardOnDeck as CardOnDeckType } from "../@types/cardOnDeck";
import { CardOnDeckOrError, CardsOnDecksOrError } from "../@types/graphql";
import { CardOnDeckRepository } from "../repositories/cardOnDeckRepository";
import { CardOnDeck, CardsOnDecks } from "../entities/cardOnDeck";

export class CardOnDeckController extends ControllerImpl<CardOnDeckType> {
	repository: CardOnDeckRepository;

	constructor(repository: CardOnDeckRepository) {
		super();
		this.repository = repository;
	}

	@CardOnDeckController.handleError
	async create(data: CardOnDeckCreate): Promise<CardOnDeckOrError> {
		const requestCardOnDeck = CardOnDeck.parse({
			externalId: randomUUID(),
			...data
		});

		const cardOnDeck = CardOnDeck.parse(await this.repository.create(requestCardOnDeck));

		return {
			__typename: "CardOnDeck",
			...cardOnDeck
		}
	}


	@CardOnDeckController.handleError
	async get(externalId: UUID): Promise<CardOnDeckOrError> {
		const cardOnDeck = CardOnDeck.parse(await this.repository.get(externalId));

		return {
			__typename: "CardOnDeck",
			...cardOnDeck
		}
	}

	async getAll(): Promise<CardsOnDecksOrError> {
		const cardsOnDecks = CardsOnDecks.parse(await this.repository.getAll());

		return {
			__typename: "CardsOnDecks",
			objects: cardsOnDecks
		}
	}

	async find(filter: CardOnDeckOptinal): Promise<CardsOnDecksOrError> {
		const cardsOnDecks = CardsOnDecks.parse(await this.repository.find(filter));

		return {
			__typename: "CardsOnDecks",
			objects: cardsOnDecks
		}
	}

}
