import { z } from 'zod';
import { Answers } from './answer';

const Card = z.object({
	externalId: z.string().uuid().readonly(),
	deckId: z.string().uuid().readonly().optional(),
	contentFront: z.string(),
	contentBack: z.string(),
	answers: Answers.optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const Cards = z.array(Card);

export { Card, Cards };
