import { z } from 'zod';

const CardOnDeck = z.object({
	externalId: z.string().uuid().readonly(),
	deckId: z.string().uuid().readonly(),
	cardId: z.string().uuid().readonly(),
	assignedAt: z.date().optional(),
});

const CardsOnDecks = z.array(CardOnDeck);

export { CardOnDeck, CardsOnDecks };
