import { z } from 'zod';
import { Cards } from './card';

const Deck = z.object({
	externalId: z.string().uuid().readonly(),
	ownerId: z.string().uuid().readonly().optional(),
	title: z.string(),
	cards: Cards.optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const Decks = z.array(Deck);

export { Deck, Decks };
