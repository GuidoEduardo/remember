import { MutableMutatorImpl } from '../../../../common/resolvers/mutatorImpl';
import { Card } from '../../../@types/card';
import { CardController } from '../../../controllers/cardController';

export class CardMutator extends MutableMutatorImpl<Card> {
	constructor(controller: CardController) {
		super(controller);
	}
}
