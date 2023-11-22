import { repositories } from '../../../databases/prisma/repositories';
import { AnswerController } from './answerController';
import { CardController } from './cardController';
import { DeckController } from './deckController';

const controllers = {
	deckController: new DeckController(repositories.deckRepository),
	cardController: new CardController(repositories.cardRepository),
	answerController: new AnswerController(repositories.answerRepository),
};

export { controllers };
