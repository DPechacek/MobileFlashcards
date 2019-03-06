import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

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

export function addDeck(deckName) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        let data = JSON.parse(results);
        
        if(data === null) {
          data = {};
        }
        
        data[deckName] = {
          title: deckName,
          questions: [],
        };
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      });
}

export function addCardToDeck(deckName, card) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        const questions = data[deckName].questions;
        questions.push(card);
        data[deckName].questions = questions;
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      });
}

export function removeCardFromDeck(deckName, index) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        const questions = data[deckName].questions;
        questions.slice(index, 1);
        data[deckName].questions = questions;
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      })
}

export function removeDeck(deckName) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        data[deckName] = undefined;
        delete data[deckName];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      });
}