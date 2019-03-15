import React, { Component } from 'react';
import {connect} from "react-redux";
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {resetQuiz} from "../actions/quiz";

class QuizResults extends Component {
  //implement resetting quiz before going back
  restartQuiz = () => {
    const { dispatch } = this.props;
    
    dispatch(resetQuiz());
    this.props.navigation.navigate('Quiz');
  };
  
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
        <Image width={640} height={480} source={image}/>
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
  image: {
    width: 512,
    height: 384,
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