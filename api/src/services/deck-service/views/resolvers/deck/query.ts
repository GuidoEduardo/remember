import { SearcherImpl } from '../../../../common/resolvers/searcherImpl';
import { Deck } from '../../../@types/deck';
import { DeckController } from '../../../controllers/deckController';

export class DeckSearcher extends SearcherImpl<Deck> {
	constructor(controller: DeckController) {
		super();
		this.setController(controller);
	}
}
