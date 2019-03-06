import {ADD_CARD, ADD_DECK, DELETE_DECK, GET_DECK, GET_DECKS, REMOVE_CARD, SET_DECKS} from "../constants/decks";
import * as API from '../utils/api';

export function setDecks(decks) {
  return {
    type: SET_DECKS,
    decks: decks
  }
}

export function getDecks() {
  return {
    type: GET_DECKS
  }
}

export function getDeck(deckName) {
  return {
    type: GET_DECK,
    key: deckName,
  }
}

export function addDeck(deckName) {
  return {
    type: ADD_DECK,
    key: deckName,
  }
}

export function removeDeck(deckName) {
  return {
    type: DELETE_DECK,
    key: deckName,
  }
}

export function addCard(deckName, card) {
  return {
    type: ADD_CARD,
    key: deckName,
    card: card,
  }
}

export function removeCard(deckName, index) {
  return {
    type: REMOVE_CARD,
    key: deckName,
    index: index,
  }
}

export function handleAddDeck(deckName) {
  return (dispatch) => {
    API.addDeck(deckName);
    dispatch(addDeck(deckName));
  }
}

export function handleRemoveDeck(deckName) {
  return (dispatch) => {
    API.removeDeck(deckName);
    dispatch(removeDeck(deckName));
  }
}

export function handleAddCard(deckName, card) {
  return (dispatch) => {
    API.addCardToDeck(deckName, card);
    dispatch(addCard(deckName, card));
  }
}

export function handleRemoveCard(deckName, index) {
  return (dispatch) => {
    API.removeCardFromDeck(deckName, index);
    dispatch(removeCard(deckName, index));
  }
}