import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {lightPurp, white} from "../utils/colors";
import {connect} from "react-redux";

class DeckItem extends Component {
  render() {
    const { deck } = this.props;
    
    return (
        <TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.subHeader}>{`${deck.questions.length} cards`}</Text>
          </View>
        </TouchableOpacity>
    );
  }
}

DeckItem.propTypes = {
  id: PropTypes.string.isRequired
};

function mapStateToProps({ decks }, { id }) {
  return {
    deck: decks[id]
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    margin: 1,
    padding: 5,
    backgroundColor: lightPurp
  },
  title: {
    fontSize: 30,
    color: white
  },
  subHeader: {
    fontSize: 20,
    color: white
  },
});

export default connect(mapStateToProps)(DeckItem);