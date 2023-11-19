import { DifficultyLevel, Prisma, PrismaClient } from '@prisma/client';
import { Repository } from '../../../services/common/repository';
import { Controller } from '../../../services/common/controller';
import { UserCreate, Users } from '../../../services/user-service/@types/user';
import { generateMock } from '@anatine/zod-mock';
import { User } from '../../../services/user-service/entities/user';
import { DeckCreate, Decks } from '../../../services/deck-service/@types/deck';
import { Deck } from '../../../services/deck-service/entities/deck';
import { CardCreate, Cards } from '../../../services/deck-service/@types/card';
import { Card } from '../../../services/deck-service/entities/card';
import { AnswerCreate } from '../../../services/deck-service/@types/answer';

export class Seeder {
	private repositories: { [key: string]: Repository<any> };
	private controllers: { [key: string]: Controller<any> };

	setRepositories(value: { [key: string]: Repository<any> }): Seeder {
		this.repositories = value;

		return this;
	}

	setControllers(value: { [key: string]: Controller<any> }): Seeder {
		this.controllers = value;

		return this;
	}

	async run(usersNumber: number): Promise<void> {
		await this.createUsers(usersNumber);
	}

	private async createUsers(usersNumber: number): Promise<void> {
		console.log('✨ seeding users...');

		const usersToCreate: UserCreate[] = [];
		const usernames: string[] = [];
		const emails: string[] = [];

		for (let i = 0; i < usersNumber; i++) {
			let user = generateMock(User);

			if (usernames.includes(user.username) || emails.includes(user.email)) continue;

			usernames.push(user.username);
			emails.push(user.email);

			usersToCreate.push({
				email: user.email,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
			});
		}

		console.log(`inserting ${usersToCreate.length} users.`);
		console.log(`💫 ${await this.controllers.user.createMany(usersToCreate)} users created.\n`);

		const users = await this.repositories.user.getAll();
		await this.createDecks(users);
	}

	private async createDecks(users: Users): Promise<void> {
		console.log('✨ seeding decks...');

		const decksToCreate: DeckCreate[] = [];

		users.forEach((user) => {
			for (let i = 0; i <= Math.floor(Math.random() * 5); i++) {
				let deck = generateMock(Deck);

				decksToCreate.push({
					ownerId: user.externalId,
					title: deck.title,
				});
			}
		});

		console.log(`inserting ${decksToCreate.length} decks.`);
		console.log(`💫 ${await this.controllers.deck.createMany(decksToCreate)} decks created.\n`);

		const decks = await this.repositories.deck.getAll();
		await this.createCards(users, decks);
	}

	private async createCards(users: Users, decks: Decks): Promise<void> {
		console.log('✨ seeding cards...');

		const cardsToCreate: CardCreate[] = [];

		decks.forEach((deck) => {
			for (let i = 0; i <= Math.floor(Math.random() * 10); i++) {
				let card = generateMock(Card);

				cardsToCreate.push({
					deckId: deck.externalId,
					contentFront: card.contentFront,
					contentBack: card.contentBack,
				});
			}
		});

		console.log(`inserting ${cardsToCreate.length} decks.`);
		console.log(`💫 ${await this.controllers.card.createMany(cardsToCreate)} cards created.\n`);

		const cards = await this.repositories.card.getAll();
		await this.createAnswers(users, cards);
	}

	public async createAnswers(users: Users, cards: Cards): Promise<void> {
		console.log('✨ seeding answers...');

		const answersToCreate: AnswerCreate[] = [];

		for (const user of users) {
			for (const card of cards) {
				const index = Math.floor(Math.random() * Object.keys(DifficultyLevel).length);
				const value = Object.values(DifficultyLevel)[index];

				answersToCreate.push({
					cardId: card.externalId,
					answeredById: user.externalId,
					difficulty: DifficultyLevel[value],
				});
			}
		}

		console.log(`inserting ${answersToCreate.length} answers.`);
		console.log(`💫 ${await this.controllers.answer.createMany(answersToCreate)} answers created.\n`);
	}
}
