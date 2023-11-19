import { SearcherImpl } from '../../../../common/resolvers/searcherImpl';
import { Answer } from '../../../@types/answer';
import { AnswerController } from '../../../controllers/answerController';

export class AnswerSearcher extends SearcherImpl<Answer> {
	constructor(controller: AnswerController) {
		super();
		this.setController(controller);
	}
}
