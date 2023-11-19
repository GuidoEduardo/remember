import { ResultOrError, ResultsOrError } from '../../common/@types/graphql';
import { Answer } from './answer';
import { Card } from './card';
import { Deck } from './deck';

type DeckOrError = ResultOrError<Deck>;
type DecksOrError = ResultsOrError<Deck>;

type CardOrError = ResultOrError<Card>;
type CardsOrError = ResultsOrError<Cards>;

type AnswerOrError = ResultOrError<Answer>;
type AnswersOrError = ResultsOrError<Answer>;

export { DeckOrError, DecksOrError, CardOrError, CardsOrError, AnswerOrError, AnswersOrError };
