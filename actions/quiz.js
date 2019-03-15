import {GET_QUIZ, UPDATE_QUIZ, RESET_QUIZ, FLIP_CARD} from "../constants/quiz";

export function getQuiz() {
  return {
    type: GET_QUIZ
  }
}

export function updateQuiz(card, score) {
  return {
    type: UPDATE_QUIZ,
    card: card,
    score: score
  }
}

export function flipCard(flipped) {
  return {
    type: FLIP_CARD,
    flipped: flipped
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}