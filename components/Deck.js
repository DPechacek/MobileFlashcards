import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {black, gray, white} from "../utils/colors";
import {connect} from "react-redux";

class Deck extends Component {
  
  render() {
    const { title, questions } = this.props.deck;
    
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subHeader}>{`${questions.length} ${questions.length === 1 ? "card" : "cards"}`}</Text>
          <TouchableOpacity style={styles.addButton}
                            onPress={() => this.props.navigation.navigate(
                                'AddCard',
                                { deckName: title }
                            )}
          >
            <View>
              <Text style={styles.buttonText}>Add Card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizButton}>
            <View>
              <Text style={[styles.buttonText, {color: white}]}>Start Quiz</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

Deck.propTypes = {
  deck: PropTypes.object.isRequired,
};

function mapStateToProps({ decks }, { navigation }) {
  const { id } = navigation.state.params;
  
  return {
    deck: decks[id]
  }
}

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 25,
    color: gray,
  },
  addButton: {
    borderWidth: 3,
    borderRadius: 5,
    width: '70%',
    padding: 15,
    margin: 5,
  },
  quizButton: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: black,
    width: '70%',
    padding: 15,
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});