import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {connect} from "react-redux";
import {getDecks} from "../utils/api";
import {setDecks} from "../actions/decks";
import DeckItem from "./DeckItem";
import {gray} from "../utils/colors";

class DeckList extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    
    this.getData()
        .then((decks) => dispatch(setDecks(decks)));
  }
  
  async getData() {
    await getDecks();
  }
  
  _keyExtractor = (item, index) => item;
  
  renderSeparator = () => (
      <View
          style={{
            backgroundColor: 'red',
            height: 0.5,
          }}
      />
  );
  
  render() {
    return (
        <FlatList
            style={{backgroundColor: gray}}
            data={Object.keys(this.props.decks)}
            renderItem={({item}) => <DeckItem id={item}/>}
            keyExtractor={this._keyExtractor}
            // ItemSeparatorComponent={this.renderSeparator}
        />
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: !!decks ? decks : {}
  }
}

export default connect(mapStateToProps)(DeckList);
