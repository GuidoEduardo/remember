import { PageContent } from "../value-objects/pageContent";
import { PageId } from "../value-objects/pageId";
import { LearnRate } from "./learnRate";
import { LearnRateId } from "../value-objects/learnRateId";
import { AuthorId } from "../value-objects/authorId";
import { BaseEntity } from "../../common/baseEntity";
import { randomUUID } from "crypto";
import { ChapterId } from "../value-objects/chapterId";

class Page extends BaseEntity<PageId> {
	private _authorId: AuthorId;
	private _chapterId: ChapterId;
	private _content: PageContent;
	private _learnRate: LearnRate;

	initializePage(authorId: AuthorId, chapterId: ChapterId): void {
		this._authorId = authorId;
		this._chapterId = chapterId;
		this.setId(new PageId(randomUUID()));
		this._learnRate.initializeLearnRate(super.id, new LearnRateId(randomUUID()));
	}

	constructor(builder: Builder) {
		super();
		super.setId(builder.pageId);
		this._authorId = builder.authorId;
		this._chapterId = builder.chapterId;
		this._content = builder.content;
		this._learnRate = builder.learnRate;
	}

	newBuilder(): Builder {
		return new Builder();
	}
}

class Builder {
	authorId: AuthorId;
	chapterId: ChapterId;
	pageId: PageId;
	content: PageContent;
	learnRate: LearnRate;

	setAuthorId(value: AuthorId) {
		this.authorId = value;
	}

	setChapterId(value: ChapterId) {
		this.chapterId = value;
	}

	setPageId(value: PageId) {
		this.pageId = value;
	}

	setContent(value: PageContent) {
		this.content = value;
	}

	setLearnRate(value: LearnRate) {
		this.learnRate = value;
	}

	build(): Page {
		return new Page(this);
	}
}

export { Page };
