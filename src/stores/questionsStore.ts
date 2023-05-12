import { writable } from 'svelte/store';
import { getRandomQuestion } from '../prividers/qustionsAPI';
import type { QuestionData } from '../models/types';
function createQuestionsStore() {
	const questionsStore = writable();

	async function loadNextQuestion() {
		const question: QuestionData = await getRandomQuestion();
		setNextQuestion(question);
	}
	function setNextQuestion(q: QuestionData) {
		questionsStore.set(q);
	}

	return {
		...questionsStore,
		loadNextQuestion
	};
}
const questionsStore = createQuestionsStore();

export default questionsStore;
