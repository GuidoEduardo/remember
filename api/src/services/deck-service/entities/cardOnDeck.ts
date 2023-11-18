import { z } from 'zod';
import { Card } from './card';
import { Deck } from './deck';

const CardOnDeck = z.object({
	externalId: z.string().uuid().readonly(),
	deckId: z.string().uuid().readonly().optional(),
	cardId: z.string().uuid().readonly().optional(),
	deck: Deck.optional(),
	card: Card.optional(),
	assignedAt: z.date().optional(),
});

const CardsOnDecks = z.array(CardOnDeck);

export { CardOnDeck, CardsOnDecks };
