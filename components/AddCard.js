import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform} from 'react-native';
import {black, purple, white} from "../utils/colors";
import {connect} from "react-redux";
import {handleAddCard} from "../actions/decks";

/**
 * Adds a card to the given deck
 */
class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    valid: false
  };
  
  /**
   * When the submit button is pressed, add the card to the deck
   */
  onPress = () => {
    const {dispatch} = this.props;
    const { question, answer } = this.state;
    const { deckName } = this.props;
    
    const card = {
      question,
      answer
    };
    
    // add the card to the deck
    dispatch(handleAddCard(deckName, card));
    
    // reset the UI
    this.setState({
      question: '',
      answer: '',
      valid: false
    });
    
    // go back to the deck
    this.toDeck();
  };
  
  /**
   * Sets the state of the given field to the value
   *
   * @param prop
   * @param value
   */
  setField = (prop, value) => {
    this.setState({
      [prop]: value
    }, () => {
      const { question, answer } = this.state;
  
      // if both fields are filled in, mark valid
      if(question && answer) {
        this.setState({
          valid: true
        });
      }
    });
    
    
  };
  
  // navigates back to the deck
  toDeck = () => {
    const { deckName } = this.props;
    
    this.props.navigation.navigate(
        'Deck',
        { id: deckName }
    )
  };
  
  render() {
    const { valid } = this.state;
    
    return (
        <View style={styles.container}>
          <Text style={{fontSize: 20}}>Add Card</Text>
          <View style={styles.spacer}/>
          <TextInput style={styles.textEntry}
                     onChangeText={(question) => this.setField('question', question)}
                     value={this.state.question}
                     placeholder='Enter your question'/>
          <TextInput style={styles.textEntry}
                     onChangeText={(answer) => this.setField('answer', answer)}
                     value={this.state.answer}
                     multiLine={true}
                     numberOfLines = {3}
                     placeholder='Enter the question answer'/>
          <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
              onPress={this.onPress}
              disabled={!valid}
            >
            <Text style={[styles.submitBtnText, Platform.OS === 'ios' ? {"color": black} : {"color": white}]}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params;
  
  return {
    deckName: deckName
  }
}

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center',
  },
  spacer: {
    height: 30
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    color: white,
    padding: 10,
    borderRadius: 2,
  },
  textEntry: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 20,
    margin: 10,
    padding: 5
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10
  },
});