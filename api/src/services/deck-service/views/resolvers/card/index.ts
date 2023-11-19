import { Request } from '../../../../common/@types/graphql';
import { CardCreate, CardOptional } from '../../../@types/card';
import { controllers } from '../../../controllers';
import { CardMutator } from './mutation';
import { CardSearcher } from './query';

const cardSearcher = new CardSearcher(controllers.cardController);
const cardMutator = new CardMutator(controllers.cardController);

const cardQueries = {
	getCard: (_: unknown, request: { id: UUID }) => cardSearcher.get(request),
	getCards: (_: unknown, request: { options?: Request }) => cardSearcher.getAll(request),
	findCards: (_: unknown, request: { options?: Request; by: CardOptional }) => cardSearcher.find(request),
};

const cardMutations = {
	createCard: (_: unknown, request: { data: CardCreate }) => cardMutator.create(request),
	updateCard: (_: unknown, request: { id: UUID; data: CardOptional }) => cardMutator.update(request),
	deleteCard: (_: unknown, request: { id: UUID }) => cardMutator.delete(request),
};

export { cardQueries, cardMutations };
