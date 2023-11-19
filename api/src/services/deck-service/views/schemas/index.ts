import { DocumentNode } from 'graphql';
import { baseSchema } from './baseSchema';
import { deckSchema } from './deckSchema';
import { cardSchema } from './cardSchema';
import { answerSchema } from './answerSchema';

export const DeckServiceTypeDefs: DocumentNode[] = [baseSchema, deckSchema, cardSchema, answerSchema];
