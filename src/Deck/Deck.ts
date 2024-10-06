import { shuffle } from '../Utility';

export class Deck<T> {
	protected cardList: T[] = [];

	constructor(cardList: T[] = []) {
		this.cardList = cardList;
	}

	shuffle (): T[] {
		this.cardList = shuffle(this.cardList);
		return this.cards;
	}

	static shuffleCards<C>(cards: C[]): C[] {
		return shuffle(cards);
	}

	get cards (): T[] {
		return this.cardList;
	}

	get code(): string {
        let code = '';
        for (const card of this.cards) {
            code += card?.toString() ?? JSON.stringify(card);
        }
        return code;
    }

	get hasCards(): boolean {
        return this.cards.length > 0;
    }

    get isEmpty(): boolean {
        return this.cards.length === 0;
    }

	get size (): number {
		return this.cards.length;
	}
}
