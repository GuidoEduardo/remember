import { z } from 'zod';
import { Deck, Decks } from '../entities/deck';

type Deck = z.infer<typeof Deck>;
type Decks = z.infer<typeof Decks>;
type DeckCreate = Omit<Deck, 'externalId' | 'createdAt' | 'updatedAt'>;
type DeckOptional = MakeOptional<DeckCreate>;

export { Deck, Decks, DeckCreate, DeckOptional };
