import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Deck extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text></Text>
        </View>
    );
  }
}

Deck.propTypes = {
  deck: PropTypes.object.isRequired
};

function mapStateToProps({ decks }, { id }) {
  return {
    deck: decks[id]
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});

export default connect()(Deck);