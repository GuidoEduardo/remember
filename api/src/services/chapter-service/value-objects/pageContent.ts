export class PageContent {
	private _front: string;
	private _back: string;

	get front(): string {
		return this._front;
	}

	get back(): string {
		return this._back;
	}

	constructor() {
		this._front = '';
		this._back = '';
	}

	edit(front: string, back: string): void {
		this._front = front;
		this._back = back;
	}
}
