import React, { Component } from 'react';
import {connect} from "react-redux";
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {resetQuiz} from "../actions/quiz";

/**
 * Shows the results of the quiz
 */
class QuizResults extends Component {
  // Resets the quiz and navigates back
  restartQuiz = () => {
    const { dispatch } = this.props;
    
    dispatch(resetQuiz());
    this.props.navigation.navigate('Quiz');
  };
  
  /**
   * Goes back to the deck
   */
  backToDeck = () => {
    const { dispatch, deckName } = this.props;
  
    dispatch(resetQuiz());
    this.props.navigation.navigate('Deck',
        {
          deckName: deckName
        })
  };
  
  render() {
    const { correctCount, deck } = this.props;
    const totalQuestions = deck.questions.length;
    const score = correctCount/totalQuestions;
    let image = score > .75 ?
        require('../assets/congrats.jpg') :
        score > .60 ?
            require('../assets/soClose.jpg') :
            require('../assets/fail.jpg');
  
    let message = score > .75 ?
        'Congratulations! You did great!' :
        score > .60 ?
            'You were close! Keep studying!' :
            'Better luck next time!...?';
  
    return (
      <View style={styles.container}>
        <Image width={360} height={270} source={image} style={{alignSelf: 'center'}}/>
        <Text style={styles.imageText}>
          You got {correctCount} out of {totalQuestions} correct.
        </Text>
        <Text style={styles.imageText}>
          {message}
        </Text>
        <TouchableOpacity style={styles.backButton}
                          onPress={this.restartQuiz}>
          <Text style={styles.backButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton}
                          onPress={this.backToDeck}>
          <Text style={styles.backButtonText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({ decks }, { navigation }) {
  // gets the deckname and count off the navigation params
  const { deckName, correctCount } = navigation.state.params;
  
  return {
    deck: decks[deckName],
    deckName: deckName,
    correctCount: correctCount,
  }
}

export default connect(mapStateToProps)(QuizResults);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  imageText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
  },
  backButton: {
    width: '85%',
    padding: 5,
    margin: 5,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});