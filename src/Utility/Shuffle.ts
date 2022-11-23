import { deepCopy } from './DeepCopy';

/**
* The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
*
*/
export function shuffle(items: any[]): any[] {
	const array = deepCopy(items);
	let currentIndex: number = array.length;
	while (currentIndex) {
		// Pick a remaining element…
		const randomIndex: number = Math.floor(Math.random() * currentIndex--);
		const randomCard = array[randomIndex];
		// And swap it with the current element.
		const currentCard = array[currentIndex];
		array[currentIndex] = randomCard;
		array[randomIndex] = currentCard;
	}
	return array;
}
