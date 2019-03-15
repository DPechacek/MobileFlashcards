import React, { Component } from 'react';
import { View, Platform, Easing, Animated } from 'react-native';
import {createStore} from "redux";
import {Provider} from "react-redux";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { Entypo, Ionicons } from '@expo/vector-icons';
import {purple, white} from "./utils/colors";
import reducer from './reducers';
import middleware from './middleware';
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import QuizResults from "./components/QuizResults";

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
      },
      Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }),
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }),
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }),
      },
      QuizResults: {
        screen: QuizResults,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }),
      },
    },
    {
      mode: 'modal',
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
          
          const height = layout.initHeight;
          const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0],
          });
          
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });
          
          return { opacity, transform: [{ translateY }] };
        },
      }),
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