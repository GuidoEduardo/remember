import { client } from "./prismaService";
import { AnswerRepositoryImpl } from "./repositories-impl/deck-service/answerRepositoryImpl";
import { CardRepositoryImpl } from "./repositories-impl/deck-service/cardRepositoryImpl";
import { DeckRepositoryImpl } from "./repositories-impl/deck-service/deckRepositoryImpl";
import { UserRepositoryImpl } from "./repositories-impl/user-service/userRepositoryImpl";

const repositories = {
	userRepository: new UserRepositoryImpl(client),
	deckRepository: new DeckRepositoryImpl(client),
	cardRepository: new CardRepositoryImpl(client),
	answerRepository: new AnswerRepositoryImpl(client),
};

export { repositories };
