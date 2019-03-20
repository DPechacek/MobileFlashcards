import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform} from 'react-native';
import {black, gray, purple, white} from "../utils/colors";
import {connect} from "react-redux";
import {handleAddDeck} from "../actions/decks";
import { NavigationActions } from 'react-navigation';

/**
 * Add a deck to the list
 */
class AddDeck extends Component {
  state = {
    text: ''
  };
  
  /**
   * Adds the deck
   */
  onPress = () => {
    const {dispatch} = this.props;
    const deckName = this.state.text;
    
    dispatch(handleAddDeck(deckName));
    
    this.setState({
      text: ''
    });
    
    // back to the deck list
    this.toDeck(deckName);
  };
  
  /**
   * Back to the desk list
   */
  toDeck = (deckName) => {
    this.props.navigation.navigate(
        'Deck',
        { id: deckName }
    )
  };
  
  render() {
    return (
        <View style={styles.container}>
          <Text style={{fontSize: 20}}>Add Deck</Text>
          <Text style={{fontSize: 16}}>Please name your new deck.</Text>
          <TextInput style={styles.textEntry}
                     onChangeText={(text) => this.setState({text})}
                     value={this.state.text}
                     placeholder='Enter name'/>
           {/* Button is disabled if fields are not valid*/}
          <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
              onPress={this.onPress} disabled={this.state.text === ''}>
            <Text style={[styles.submitBtnText, Platform.OS === 'ios' ? {"color": black} : {"color": white}]}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

export default connect()(AddDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center',
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
    width: '75%',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 20,
    margin: 10,
    padding: 5
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
});