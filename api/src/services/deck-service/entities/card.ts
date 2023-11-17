import { z } from 'zod';

const Card = z.object({
	externalId: z.string().uuid().readonly(),
	ownerId: z.string().uuid().readonly(),
	contentFront: z.string(),
	contentBack: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const Cards = z.array(Card);

export { Card, Cards };
