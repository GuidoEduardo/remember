import { MutableMutatorImpl } from '../../../../common/resolvers/mutatorImpl';
import { Deck } from '../../../@types/deck';
import { DeckController } from '../../../controllers/deckController';

export class DeckMutator extends MutableMutatorImpl<Deck> {
	constructor(controller: DeckController) {
		super(controller);
	}
}
