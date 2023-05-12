import { c as create_ssr_component, a as subscribe } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
async function getRandomQuestion() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    throw Error("something went wrong:", error);
  }
}
function createQuestionsStore() {
  const questionsStore2 = writable();
  async function loadNextQuestion() {
    const question = await getRandomQuestion();
    setNextQuestion(question);
  }
  function setNextQuestion(q) {
    questionsStore2.set(q);
  }
  return {
    ...questionsStore2,
    loadNextQuestion
  };
}
const questionsStore = createQuestionsStore();
function createPointsStore() {
  const store = writable(0);
  function addPoints(points) {
    console.log("llega", points);
    store.update((x) => x += points);
    console.log(store);
  }
  return {
    addPoints,
    ...store
  };
}
const pointsStore = createPointsStore();
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_questionsStore;
  let $$unsubscribe_pointsStore;
  $$unsubscribe_questionsStore = subscribe(questionsStore, (value) => value);
  $$unsubscribe_pointsStore = subscribe(pointsStore, (value) => value);
  $$unsubscribe_questionsStore();
  $$unsubscribe_pointsStore();
  return `${``}

<div class="${[
    "flex bg-green-100 items-center justify-center h-screen w-screen",
    "  "
  ].join(" ").trim()}">${`<h1 class="text-4xl font-bold mb-4">Loading...</h1>`}</div>`;
});
export {
  Page as default
};
