import { z } from 'zod';

const Answer = z.object({
	externalId: z.string().uuid().readonly(),
	cardOnDeckId: z.string().uuid().readonly(),
	answeredById: z.string().uuid().readonly(),
	difficulty: z.string().readonly(),
	answeredAt: z.date().readonly(),
	answerAgainAt: z.date().readonly(),
});

const Answers = z.array(Answer);

export { Answer, Answers };
