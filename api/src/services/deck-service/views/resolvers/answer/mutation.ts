import { MutatorImpl } from "../../../../common/resolvers/mutatorImpl";
import { Answer } from "../../../@types/answer";
import { AnswerController } from "../../../controllers/answerController";

export class AnswerMutator extends MutatorImpl<Answer> {
	constructor(controller: AnswerController) {
		super();
		this.setController(controller);
	}
}
