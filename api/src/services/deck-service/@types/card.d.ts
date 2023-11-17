import { z } from 'zod';
import { Card, Cards } from '../entities/card';

type Card = z.infer<typeof Card>;
type Cards = z.infer<typeof Cards>;
type CardCreate = Omit<Card, 'externalId' | 'createdAt' | 'updatedAt'>;
type CardOptional = MakeOptional<CardCreate>;

export { Card, Cards, CardCreate, CardOptional };
