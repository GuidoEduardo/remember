export class AnswerPeriod {
	private _answeredAt: Date;
	private _answerAgainAt: Date;

	constructor(answeredAt: Date, answerAgainAt: Date) {
		this._answeredAt = answeredAt;
		this._answerAgainAt = answerAgainAt;
	}
}
