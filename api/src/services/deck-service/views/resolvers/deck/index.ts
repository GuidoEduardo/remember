import { Request } from '../../../../common/@types/graphql';
import { DeckCreate, DeckOptional } from '../../../@types/deck';
import { controllers } from '../../../controllers';
import { DeckMutator } from './mutation';
import { DeckSearcher } from './query';

const deckSearcher = new DeckSearcher(controllers.deckController);
const deckMutator = new DeckMutator(controllers.deckController);

const deckQueries = {
	getDeck: (_: unknown, request: { id: UUID }) => deckSearcher.get(request),
	getDecks: (_: unknown, request: { options?: Request }) => deckSearcher.getAll(request),
	findDecks: (_: unknown, request: { options?: Request; by: DeckOptional }) => deckSearcher.find(request),
};

const deckMutations = {
	createDeck: (_: unknown, request: { data: DeckCreate }) => deckMutator.create(request),
	updateDeck: (_: unknown, request: { id: UUID; data: DeckOptional }) => deckMutator.update(request),
	deleteDeck: (_: unknown, request: { id: UUID }) => deckMutator.delete(request),
};

export { deckQueries, deckMutations };
