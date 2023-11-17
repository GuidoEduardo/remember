import { EntityOrError, EntitiesOrError } from '../../common/@types/graphql';
import { Answer } from './answer';
import { Deck } from './deck';

type DeckOrError = EntityOrError<Deck>;
type DecksOrError = EntitiesOrError<Deck>;

type CardOrError = EntityOrError<Card>;
type CardsOrError = EntitiesOrError<Cards>;

type AnswerOrError = EntityOrError<Answer>;
type AnswersOrError = EntitiesOrError<Answer>;

export { DeckOrError, DecksOrError, CardOrError, CardsOrError, AnswerOrError, AnswersOrError };
