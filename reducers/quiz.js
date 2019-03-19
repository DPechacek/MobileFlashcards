import {GET_QUIZ, UPDATE_QUIZ, RESET_QUIZ, FLIP_CARD} from "../constants/quiz";

const defaultState = {
  currentCard: 0,
  currentScore: 0,
  flipped: false
};

/**
 * Reducer for updating the state of the active quiz.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function quiz(state = defaultState, action) {
  switch (action.type) {
    case GET_QUIZ:
      return state;
    case UPDATE_QUIZ:
      return {
        currentCard: action.card,   // updates the card
        currentScore: action.score, // updates the score
        flipped: false              // resets the flipped state of the card
      };
    case FLIP_CARD:
      return {
        ...state,
        flipped: action.flipped     // flips the state of the card
      };
    case RESET_QUIZ:
      return defaultState;          // resets the quiz to the default state
    default:
      return state;
  }
}

export default quiz;