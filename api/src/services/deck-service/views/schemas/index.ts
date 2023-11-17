import { DocumentNode } from 'graphql';
import { baseSchema } from './baseSchema';
import { deckSchema } from './deckSchema';
import { cardSchema } from './cardSchema';
import { cardContextSchema } from './cardContextSchema';

export const DeckServiceTypeDefs: DocumentNode[] = [baseSchema, deckSchema, cardSchema, cardContextSchema];
