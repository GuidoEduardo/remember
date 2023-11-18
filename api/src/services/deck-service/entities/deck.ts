import { z } from 'zod';

const Deck = z.object({
	externalId: z.string().uuid().readonly(),
	ownerId: z.string().uuid().readonly().optional(),
	title: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const Decks = z.array(Deck);

export { Deck, Decks };
