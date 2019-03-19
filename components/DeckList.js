import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from "react-redux";
import {getDecks} from "../utils/api";
import {setDecks} from "../actions/decks";
import DeckItem from "./DeckItem";
import {gray} from "../utils/colors";

/**
 * Displays the list of decks
 */
class DeckList extends Component {

  // when the component loads, gets the list of decks from the store and displays them
  componentDidMount() {
    const {dispatch} = this.props;
    
    this.getData()
        .then((decks) => dispatch(setDecks(decks)));
  }
  
  /**
   * Gets the data and returns it.
   * @returns {Promise<void>}
   */
  async getData() {
    return await getDecks();
  }
  
  _keyExtractor = (item, index) => item;
  
  render() {
    return (
        <FlatList
            style={{backgroundColor: gray}}
            data={Object.keys(this.props.decks)}
            renderItem={({item}) => <DeckItem id={item} navigation={this.props.navigation}/>}
            keyExtractor={this._keyExtractor}
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
