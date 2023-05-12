<script lang="ts">
	import { onMount } from 'svelte';
	import questionsStore from '../../stores/questionsStore';
	import { pointsStore } from '../../stores/userPoints';
	import type { QuestionData } from '../../models/types';
	let loaded = false;
	let answers: string[];
	let modalIsOpen = false;
	let answerFromPlayerIsCorrect: boolean;
	let questionData: QuestionData;
	let correctAnswer: string;
	let pointRewards = 3;
	function onAnswerClicked(answer: string) {
		answerFromPlayerIsCorrect = answer === correctAnswer;
		if (!answerFromPlayerIsCorrect) {
			if (pointRewards > 0) pointRewards--;
		} else {
			pointsStore.addPoints(pointRewards);
		}
		modalIsOpen = true;
	}
	function prepareAnswers(questionData: QuestionData) {
		answers = [];
		correctAnswer = parseString(questionData.correct_answer);
		answers.push(...questionData.incorrect_answers);
		answers.push(correctAnswer);
		answers = answers.map(parseString);
		shuffleArray(answers);
	}
	function parseString(value: string): string {
		const parser = new DOMParser();
		const result = parser.parseFromString(value, 'text/html').body.textContent;
		return result ? result : '';
	}
	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	async function closeModal() {
		modalIsOpen = false;
		if (answerFromPlayerIsCorrect) {
			await prepareNextQuestion();
		}
	}
	async function prepareNextQuestion() {
		pointRewards = 3;
		loaded = false;
		await questionsStore.loadNextQuestion();
		questionData = $questionsStore as QuestionData;
		questionData.question = parseString(questionData.question);
		prepareAnswers(questionData);
		loaded = true;
	}
	onMount(async () => {
		await prepareNextQuestion();
	});
</script>

{#if modalIsOpen}
	<div
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
	>
		<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
		<div
			class="bg-white w-full lg:h-max lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
		>
			<div
				class="flex flex-col justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold"
			>
				{#if answerFromPlayerIsCorrect}
					<div class="flex flex-col justify-center items-center">
						<svg
							style="display:inline;color: rgb(55, 255, 0);"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="44"
							zoomAndPan="magnify"
							viewBox="0 0 30 30.000001"
							height="44"
							preserveAspectRatio="xMidYMid meet"
							version="1.0"
							><defs
								><clipPath id="id1"
									><path
										d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 "
										clip-rule="nonzero"
										fill="#37ff00"
									/></clipPath
								></defs
							><g clip-path="url(#id1)"
								><path
									fill="#37ff00"
									d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 "
									fill-opacity="1"
									fill-rule="nonzero"
								/></g
							></svg
						>
						Correct
					</div>
				{:else}
					<div class="flex flex-col justify-center items-center">
						<svg
							style="color: red"
							xmlns="http://www.w3.org/2000/svg"
							width="44"
							height="44"
							fill="currentColor"
							class="bi bi-x-circle-fill"
							viewBox="0 0 16 16"
						>
							<path
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
								fill="red"
							/>
						</svg>
						<div class="flex flex-col items-center">
							<p>Wrong.</p>
							-1 reward point
						</div>
					</div>
				{/if}
				<button
					class="mt-5 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
					on:click={() => closeModal()}
				>
					{answerFromPlayerIsCorrect ? 'Next Question' : 'Try again'}
				</button>
			</div>
		</div>
	</div>
{/if}

<div
	class="flex bg-green-100 items-center justify-center h-screen w-screen"
	class:bg-green-100={questionData && questionData.difficulty === 'easy'}
	class:bg-yellow-100={questionData && questionData.difficulty === 'medium'}
	class:bg-rose-100={questionData && questionData.difficulty === 'hard'}
>
	{#if loaded}
		<div class="text-center max-w-screen-xl w-screen m-16">
			<div>
				<h1 class="text-4xl font-bold mb-4">
					{questionData.question}
				</h1>
				<p class="text-lg">
					Category: {questionData.category}
					<br />
					<b>
						Difficulty: {questionData.difficulty.charAt(0).toUpperCase() +
							questionData.difficulty.slice(1)}
					</b>
				</p>
			</div>
			<div
				class="flex flex-col justify-center items-center border-solid border-2 border-gray-600 rounded-md"
			>
				<div class="flex w-full justify-around">
					<button
						on:click={() => onAnswerClicked(answers[0])}
						class="h-10 w-52 m-2 bg-blue-500 text-white rounded-full hover:bg-gray-900"
						>{answers[0]}</button
					>
					<button
						on:click={() => onAnswerClicked(answers[1])}
						class="h-10 w-52 m-2 bg-red-500 text-white rounded-full hover:bg-gray-900"
						>{answers[1]}</button
					>
				</div>
				<div class="flex w-full justify-around">
					<button
						on:click={() => onAnswerClicked(answers[2])}
						class="h-10 w-52 m-2 bg-green-500 text-white rounded-full hover:bg-gray-900"
						>{answers[2]}</button
					>
					<button
						on:click={() => onAnswerClicked(answers[3])}
						class="h-10 w-52 m-2 bg-yellow-500 text-white rounded-full hover:bg-gray-900"
						>{answers[3]}</button
					>
				</div>
			</div>
			<p class="text-lg">Points in play this round: {pointRewards}</p>

			<h1 class="text-2xl font-bold mb-4">Points Earned: {$pointsStore}</h1>
		</div>
	{:else}
		<h1 class="text-4xl font-bold mb-4">Loading...</h1>
	{/if}
</div>
