import {GET_QUIZ, UPDATE_QUIZ, RESET_QUIZ, FLIP_CARD} from "../constants/quiz";

const defaultState = {
  currentCard: 0,
  currentScore: 0,
  flipped: false
};

function quiz(state = defaultState, action) {
  switch (action.type) {
    case GET_QUIZ:
      return state;
    case UPDATE_QUIZ:
      return {
        currentCard: action.card,
        currentScore: action.score,
        flipped: false
      };
    case FLIP_CARD:
      return {
        ...state,
        flipped: action.flipped
      };
    case RESET_QUIZ:
      return defaultState;
    default:
      return state;
  }
}

export default quiz;