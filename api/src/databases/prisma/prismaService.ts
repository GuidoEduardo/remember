import { PrismaClient } from '@prisma/client';
import { UserRepositoryImpl } from './repositories-impl/user-service/userRepositoryImpl';
import { DeckRepositoryImpl } from './repositories-impl/deck-service/deckRepositoryImpl';
import { CardRepositoryImpl } from './repositories-impl/deck-service/cardRepositoryImpl';
import { AnswerRepositoryImpl } from './repositories-impl/deck-service/answerRepositoryImpl';

const client = new PrismaClient();

const repositories = {
	userRepository: new UserRepositoryImpl(client),
	deckRepository: new DeckRepositoryImpl(client),
	cardRepository: new CardRepositoryImpl(client),
	answerRepository: new AnswerRepositoryImpl(client),
};

export { repositories };
