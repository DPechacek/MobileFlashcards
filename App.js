import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import {createStore} from "redux";
import {Provider} from "react-redux";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { Entypo, Ionicons } from '@expo/vector-icons';
import {purple, white} from "./utils/colors";
import reducer from './reducers';
import middleware from './middleware';

const Tabs = createBottomTabNavigator(
    {
      DeckList: DeckList,
      AddDeck: AddDeck,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          const {routeName} = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          
          if (routeName === 'DeckList') {
            iconName = 'md-list-box';
          } else if (routeName === 'AddDeck') {
            iconName = 'add-to-list';
            IconComponent = Entypo;
          }
          
          return <IconComponent name={iconName} size={30} color={tintColor}/>
        },
      }),
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowRadius: 6,
          shadowOpacity: 1,
          shadowColor: 'rgba(0,0,0,0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
        },
      },
    }
);

const MainNavigator = createStackNavigator(
    {
      Home: {
        screen: Tabs,
      }
    }
);

const MainContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
        <Provider store={createStore(reducer, middleware)}>
          <View style={{flex: 1}}>
            <MainContainer />
          </View>
        </Provider>
    );
  }
}