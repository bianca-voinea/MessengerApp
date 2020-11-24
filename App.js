import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Home from "./src/screens/Home"
import Chat from "./src/screens/Chat"

import storeFactory from './src/store/store'
import { Provider } from 'react-redux'


// Navigation
const Stack = createStackNavigator();

// Redux store
const store = storeFactory({})

export default class App extends React.Component{

  render() {
      return (
		<Provider store = {store}>
           	<NavigationContainer>
				<Stack.Navigator headerMode = {"none"} initialRouteName="Home">
					<Stack.Screen  name="Home" component={Home} />
					<Stack.Screen name="Chat" component={Chat} />
				</Stack.Navigator>
			</NavigationContainer>    
		</Provider>
      );
    }
  }