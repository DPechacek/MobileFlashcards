import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {black, green, purple, red, white} from "../utils/colors";
import {connect} from "react-redux";
import {flipCard, updateQuiz} from "../actions/quiz";

class Quiz extends Component {
  
  constructor(props) {
    super(props);
  }
  
  next = (correctAnswer) => {
    const { currentCard, currentScore } = this.props.quiz;
    const  { dispatch } = this.props;
    const { questions } = this.props.deck;
    
    let card = currentCard+1;
    let score = correctAnswer ? currentScore+1 : currentScore;
    
    dispatch(updateQuiz(card, score));
    
    if(card === questions.length) {
      this.props.navigation.navigate(
          'QuizResults',
          {
            deckName: this.props.deckName,
            correctCount: score,
          }
      );
    }
  };
  
  flipCard = () => {
    const flipped = this.props.quiz.flipped;
    const { dispatch } = this.props;
    
    dispatch(flipCard(!flipped));
  };
  
  render() {
    const { title, questions } = this.props.deck;
    const { currentCard, flipped } = this.props.quiz;
    
    if(currentCard === questions.length) {
      return null;
    }
    
    return (
        <View>
            <View style={{height: 100, width: '100%'}}>
              <Text style={styles.header}>{title} Quiz</Text>
              <Text style={styles.cardCount}>{`${currentCard+1}/${questions.length}`}</Text>
            </View>
            <TouchableOpacity style={{alignSelf: 'center', width: '100%', }} onPress={this.flipCard}>
              <View style={styles.question}>
                {
                  !flipped ?
                      (
                          <Text style={styles.flipCardQuestion}>
                            {questions[currentCard].question}
                          </Text>
                      ) :
                      (
                          <Text style={styles.flipCardAnswer}>
                            {questions[currentCard].answer}
                          </Text>
                      )
                }
              </View>
            </TouchableOpacity>
            <View style={{height: 100, width: '100%'}}>
              <TouchableOpacity style={styles.correctButton} onPress={() => this.next(true)}>
                <Text style={[styles.buttonText, {color: white}]}>
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.incorrectButton} onPress={() => this.next(false)}>
                <Text style={[styles.buttonText, {color: white}]}>
                  Incorrect
                </Text>
              </TouchableOpacity>
            </View>
        </View>
    );
  }
}

Quiz.propTypes = {
  deck: PropTypes.object.isRequired,
};

function mapStateToProps({ decks, quiz }, { navigation }) {
  const { deckName } = navigation.state.params;
  
  return {
    deck: decks[deckName],
    quiz: quiz,
    deckName: deckName,
  }
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  cardCount: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    marginBottom: 5,
  },
  question: {
    height: 250,
    width: '85%',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  flipCardQuestion: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flipCardAnswer: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: purple,
  },
  quizButton: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: black,
    width: '70%',
    padding: 15,
    margin: 5,
    alignSelf: 'center'
  },
  correctButton: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: green,
    width: '70%',
    padding: 10,
    margin: 5,
    alignSelf: 'center',
  },
  incorrectButton: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: red,
    width: '70%',
    padding: 10,
    margin: 5,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});