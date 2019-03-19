import {ADD_CARD, ADD_DECK, DELETE_DECK, GET_DECK, GET_DECKS, REMOVE_CARD, SET_DECKS} from "../constants/decks";

/**
 * Reducer for updating/getting deck
 *
 * @param state
 * @param action
 * @returns {*}
 */
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
          title: action.key,    // set the new deck title
          questions: []         // and initialize the questions array to an empty array
        },
      };
    case DELETE_DECK:
      const {[action.key]: key, ...rest} = state;   // get the deck we're deleting and then the rest
      return Object.assign({}, rest);        // return the 
    case ADD_CARD:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: [                        // add the card into the array
              ...state[action.key].questions,
              action.card
          ]
        }
      };
    case REMOVE_CARD:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],                       // remove the card from the array
          questions: questions.slice(action.index, 1)
        }
      };
    default:
      return state;
  }
}

export default decks;