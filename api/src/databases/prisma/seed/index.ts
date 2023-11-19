import { UserController } from '../../../services/user-service/controllers/userController';
import { UserRepositoryImpl } from '../repositories-impl/user-service/userRepositoryImpl';
import { DeckRepositoryImpl } from '../repositories-impl/deck-service/deckRepositoryImpl';
import { DeckController } from '../../../services/deck-service/controllers/deckController';
import { CardController } from '../../../services/deck-service/controllers/cardController';
import { CardRepositoryImpl } from '../repositories-impl/deck-service/cardRepositoryImpl';
import { AnswerRepositoryImpl } from '../repositories-impl/deck-service/answerRepositoryImpl';
import { AnswerController } from '../../../services/deck-service/controllers/answerController';
import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const userRepository = new UserRepositoryImpl(client);
const deckRepository = new DeckRepositoryImpl(client);
const cardRepository = new CardRepositoryImpl(client);
const answerRepository = new AnswerRepositoryImpl(client);

const userController = new UserController(userRepository);
const deckController = new DeckController(deckRepository);
const cardController = new CardController(cardRepository);
const answerController = new AnswerController(answerRepository);

const seeder = new Seeder()
	.setRepositories({
		user: userRepository,
		deck: deckRepository,
		card: cardRepository,
		answer: answerRepository,
	})
	.setControllers({
		user: userController,
		deck: deckController,
		card: cardController,
		answer: answerController,
	});

await seeder.run(1000);

console.log('😎✌️ All set and populated!');
