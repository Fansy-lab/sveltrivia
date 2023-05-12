import type { QuestionData } from '../models/types';
async function getRandomQuestion(): Promise<QuestionData> {
	try {
		const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
		const data = await response.json();
		return data.results[0] as QuestionData;
	} catch (error) {
		throw Error('something went wrong:', error);
	}
}
export { getRandomQuestion };
