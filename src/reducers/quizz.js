/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {mammals: [], status: 'loading', score: 0};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function* quizzGenerator (mammals) {
  let remainingMammals = mammals.slice(0);
  shuffleArray(remainingMammals);

  while (remainingMammals.length >= 2) {
    yield [remainingMammals.pop().name, remainingMammals.pop().name];
  }
}

let quizz;

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {

    case 'LOAD': {
      nextState.mammals = action.payload;
      let mammals = action.payload;
      nextState.mammals.sort(function(a, b) {
        return b.sleepTotal - a.sleepTotal;
      });
      quizz = quizzGenerator(mammals);
      for (let mammal of nextState.mammals) {
        mammal.quizzing = false;
      }
      nextState.status = 'ready';
      return nextState;
    } break;
    case 'GENERATE': {
      if (!quizz) {
        return state;
      }
      for (let mammal of nextState.mammals) {
        mammal.quizzing = false;
      }
      let quizzGenerated = quizz.next();
      if (quizzGenerated.done) {
        console.log('oups');
        return state;
      }
      let [mammalName1, mammalName2] = quizzGenerated.value;
      let mammal1 = nextState.mammals.find(mammal => mammal.name === mammalName1);
      let mammal2 = nextState.mammals.find(mammal => mammal.name === mammalName2);
      mammal1.quizzing = true;
      mammal2.quizzing = true;
      nextState.status = 'quizzing';
      return nextState;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
