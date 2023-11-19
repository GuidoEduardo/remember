import { z } from 'zod';

enum DifficultyTimeInSeconds {
	Retry = 0,
	Hard = 3600000,
	Good = 86400000,
	Easy = 432000000
};

const DifficultyLevel = z.enum(["Retry", "Hard", "Good", "Easy"]);

const Answer = z.object({
	externalId: z.string().uuid().readonly(),
	cardId: z.string().uuid().readonly().optional(),
	answeredById: z.string().uuid().readonly().optional(),
	difficulty: DifficultyLevel.readonly(),
	answeredAt: z.date().readonly(),
	answerAgainAt: z.date().readonly(),
});

const Answers = z.array(Answer);

export { Answer, Answers, DifficultyLevel, DifficultyTimeInSeconds };
