import {ADD_CARD, ADD_DECK, DELETE_DECK, GET_DECK, GET_DECKS, REMOVE_CARD, SET_DECKS} from "../constants/decks";

function decks(state = {}, action) {
  switch (action.type) {
    case SET_DECKS:
      return Object.assign({}, action.decks);
    case GET_DECKS:
      return state;
    case GET_DECK:
      return state[action.key];
    case ADD_DECK:
      return {
        ...state,
        [action.key]: {
          title: action.key,
          questions: []
        },
      };
    case DELETE_DECK:
      state[action.key] = null;
      delete state[action.key];
      return state;
    case ADD_CARD:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: [
              ...state[action.key].questions,
              action.card
          ]
        }
      };
    case REMOVE_CARD:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: questions.slice(action.index, 1)
        }
      };
    default:
      return state;
  }
}

export default decks;