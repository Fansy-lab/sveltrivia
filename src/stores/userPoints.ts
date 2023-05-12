import { writable } from 'svelte/store';
function createPointsStore() {
	const store = writable(0);
	function addPoints(points: number) {
		console.log('llega', points);
		store.update((x) => (x += points));
		console.log(store);
	}
	return {
		addPoints,
		...store
	};
}
export const pointsStore = createPointsStore();
