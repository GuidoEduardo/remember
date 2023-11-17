import { z } from 'zod';
import { CardOnDeck, CardsOnDecks } from '../entities/cardsOnDecks';

type CardOnDeck = z.infer<typeof CardOnDeck>;
type CardsOnDecks = z.infer<typeof CardsOnDecks>;

export { CardOnDeck, CardsOnDecks };
