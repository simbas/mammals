/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {mammals: [], status: 'loading', question: [], score: 0};

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
    yield [remainingMammals.pop(), remainingMammals.pop()];
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
      let quizzGenerated = quizz.next();
      if (quizzGenerated.done) {
        nextState.status = 'done';
        return nextState;
      }
      let question = quizzGenerated.value;
      nextState.question = question;
      let firstWinning = (question[0].sleepTotal >= question[1].sleepTotal);
      question[0].winning = firstWinning;
      question[1].winning = !firstWinning;
      nextState.status = 'quizzing';
      return nextState;
    } break;
    case 'SELECT': {
      if (!quizz|| nextState.status !== 'quizzing') {
        return state;
      }

      let mammal = nextState.question.find(mammal => action.payload.name === mammal.name);
      mammal.selected = true;

      if(mammal.winning) {
        nextState.score++;
      }

      nextState.status = 'answered';
      return nextState;
    } break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
