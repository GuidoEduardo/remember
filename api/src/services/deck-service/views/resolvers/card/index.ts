import { CardCreate, CardOptional } from "../../../@types/card";
import { controllers } from "../../../controllers";
import { CardMutator } from "./mutation";
import { CardSearcher } from "./query";

const cardSearcher = new CardSearcher(controllers.cardController);
const cardMutator = new CardMutator(controllers.cardController);

const cardQueries = {
	getCard: (_: unknown, request: { id: UUID }) => cardSearcher.get(request),
	getCards: (_: unknown) => cardSearcher.getAll(),
	findCards: (_: unknown, request: { by: CardOptional }) => cardSearcher.find(request),
};

const cardMutations = {
	createCard: (_: unknown, request: { data: CardCreate }) => cardMutator.create(request),
	updateCard: (_: unknown, request: { id: UUID; data: CardOptional }) => cardMutator.update(request),
	deleteCard: (_: unknown, request: { id: UUID }) => cardMutator.delete(request),
};

export { cardQueries, cardMutations };
