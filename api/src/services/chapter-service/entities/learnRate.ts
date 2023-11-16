import { BaseEntity } from "../../common/baseEntity";
import { AnswerPeriod } from "../value-objects/answerPeriod";
import { LearnRateId } from "../value-objects/learnRateId";
import { RateLevelPerMiliseconds } from "../value-objects/rateLevelPerMiliseconds";
import { PageId } from "../value-objects/pageId";

class LearnRate extends BaseEntity<LearnRateId> {
	private _pageId: PageId;
	private _rateLevel: RateLevelPerMiliseconds;
	private _answerPeriod: AnswerPeriod;

	initializeLearnRate(pageId: PageId, learnRateId: LearnRateId): void {
		this._pageId = pageId;
		super.setId(learnRateId);
	}

	constructor(builder: Builder) {
		super();
		super.setId(builder.learnRateId);
		this._rateLevel = builder.rateLevel;
		this._answerPeriod = builder.answerPeriod;
	}

	static builder(): Builder {
		return new Builder();
	}

	setRate(rateLevel: RateLevelPerMiliseconds): void {
		this._rateLevel = rateLevel;
		this._updateExpiresAt();
	}

	private _updateExpiresAt(): void {
		if (this._rateLevel == RateLevelPerMiliseconds.Unassigned) {
			return;
		}

		const answerAgainAt = new Date();
		answerAgainAt.setMilliseconds(answerAgainAt.getMilliseconds() + this._rateLevel);
		this._answerPeriod = new AnswerPeriod(new Date(), answerAgainAt);
	}
}

class Builder {
	learnRateId: LearnRateId;
	rateLevel: RateLevelPerMiliseconds;
	answerPeriod: AnswerPeriod;

	setLearnRateId(value: LearnRateId) {
		this.learnRateId = value;
		return this;
	}

	setRateLevel(value: RateLevelPerMiliseconds) {
		this.rateLevel = value;
		return this;
	}

	setAnswerPeriod(value: AnswerPeriod) {
		this.answerPeriod = value;
		return this;
	}

	build(): LearnRate {
		return new LearnRate(this);
	}
}

export { LearnRate };
