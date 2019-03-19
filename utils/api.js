import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

/**
 * Gets the decks from the storage
 *
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        let data = JSON.parse(results);
        
        if(data === null) {
          data = {};
        }
        
        return data;
      });
}

/**
 * Adds a deck with the given name
 *
 * @param deckName
 */
export function addDeck(deckName) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        let data = JSON.parse(results);
        
        // initializes the data
        if(data === null) {
          data = {};
        }
        
        // add the deck
        data[deckName] = {
          title: deckName,
          questions: [],
        };
        
        // put the data back in the store
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      });
}

/**
 * Add the card to the deck
 *
 * @param deckName
 * @param card
 */
export function addCardToDeck(deckName, card) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        const questions = data[deckName].questions; // find the deck with the given name
        questions.push(card);                       // add the card to the list of questions
        data[deckName].questions = questions;       // reset the list of questions on the deck
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));    // Set the decks back on the storage
      });
}

/**
 * Removes the card from the deck
 *
 * @param deckName
 * @param index
 */
export function removeCardFromDeck(deckName, index) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        const questions = data[deckName].questions; // find the deck with the given name
        questions.slice(index, 1);                  // removes the card
        data[deckName].questions = questions;       // set the list of questions on the deck
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));  // set the decks back on the storage
      })
}

/**
 * Removes the deck
 *
 * @param deckName
 */
export function removeDeck(deckName) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);         // deletes the deck from the list
        data[deckName] = undefined;
        delete data[deckName];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));    // and resaves the deck
      });
}