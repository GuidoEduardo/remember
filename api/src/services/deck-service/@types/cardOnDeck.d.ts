import { z } from 'zod';
import { CardOnDeck, CardsOnDecks } from '../entities/cardOnDeck';

type CardOnDeck = z.infer<typeof CardOnDeck>;
type CardsOnDecks = z.infer<typeof CardsOnDecks>;
type CardOnDeckCreate = Omit<CardOnDeck, "externalId" | "assignedAt">
type CardOnDeckOptinal = MakeOptional<CardOnDeckCreate>;

export { CardOnDeck, CardsOnDecks, CardOnDeckCreate, CardOnDeckOptinal };
