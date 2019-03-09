import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform} from 'react-native';
import {purple, white} from "../utils/colors";
import {connect} from "react-redux";
import {handleAddCard, handleAddDeck} from "../actions/decks";
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {
  state = {
    question: '',
    answer: '',
    valid: false
  };
  
  onPress = () => {
    const {dispatch} = this.props;
    const { question, answer } = this.state;
    const { deckName } = this.props;
    
    const card = {
      question,
      answer
    };
    
    dispatch(handleAddCard(deckName, card));
    
    this.setState({
      question: '',
      answer: '',
      valid: false
    });
    
    this.toDeck();
  };
  
  setField = (prop, value) => {
    this.setState({
      [prop]: value
    }, () => {
      const { question, answer } = this.state;
  
      if(question && answer) {
        this.setState({
          valid: true
        });
      }
    });
    
    
  };
  
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
            <Text style={styles.submitBtnText}>SUBMIT</Text>
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

export default connect(mapStateToProps)(AddDeck);

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