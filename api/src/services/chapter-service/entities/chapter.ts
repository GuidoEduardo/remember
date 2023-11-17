import { randomUUID } from 'crypto';
import { AggregateRoot } from '../../common/aggregateRoot';
import { AuthorId } from '../value-objects/authorId';
import { ChapterId } from '../value-objects/chapterId';
import { Page } from './page';

class Chapter extends AggregateRoot<ChapterId> {
	private _authorId: AuthorId;
	private _title: String;
	private _pages: Page[];

	initializeChapter(authorId: AuthorId): void {
		this._authorId = authorId;
		this.setId(new ChapterId(randomUUID()));
		this.initializePages(authorId);
	}

	initializePages(authorId: AuthorId) {
		this._pages.forEach((page) => {
			page.initializePage(authorId, super.id);
		});
	}

	constructor(builder: Builder) {
		super();
		super.setId(builder.chapterId);
		this._authorId = builder.authorId;
		this._title = builder.title;
		this._pages = builder.pages;
	}

	newBuilder(): Builder {
		return new Builder();
	}
}

class Builder {
	authorId: AuthorId;
	chapterId: ChapterId;
	title: String;
	pages: Page[];

	setAuthorId(value: AuthorId) {
		this.authorId = value;
	}

	setChapterId(value: ChapterId) {
		this.chapterId = value;
	}

	setTitle(value: String) {
		this.title = value;
	}

	setPages(value: Page[]) {
		this.pages = value;
	}

	build(): Chapter {
		return new Chapter(this);
	}
}

export { Chapter };
