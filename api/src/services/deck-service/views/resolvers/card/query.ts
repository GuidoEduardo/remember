import { SearcherImpl } from "../../../../common/resolvers/searcherImpl";
import { Card } from "../../../@types/card";
import { CardController } from "../../../controllers/cardController";

export class CardSearcher extends SearcherImpl<Card> {
	constructor(controller: CardController) {
		super();
		this.controller = controller;
	}
}
