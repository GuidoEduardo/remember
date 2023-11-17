import { z } from 'zod';
import { Answer, Answers } from '../entities/answer';

type Answer = z.infer<typeof Answer>;
type Answers = z.infer<typeof Answers>;

export { Answer, Answers };
