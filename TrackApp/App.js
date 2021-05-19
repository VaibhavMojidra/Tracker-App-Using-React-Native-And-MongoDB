import React from 'react';
import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigatorRef';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as TrackProvider} from './src/context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
  TrackListScreen,
  TrackDetailScreen,
});
trackListFlow.navigationOptions = {
  title: 'My Tracks',
  tabBarIcon: <FontAwesome name="map-marker" size={24} color="black" />,
};

const switchNavigator=createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignInScreen,
    SignUpScreen
  }),
  mainFlow:createBottomTabNavigator({
    trackListFlow,
    TrackCreateScreen,
    AccountScreen,
  })
});

const App= createAppContainer(switchNavigator);
export default ()=>{
  return(
    <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <App ref={(navigator)=>{setNavigator(navigator)}}/>
          </AuthProvider>
        </LocationProvider>
    </TrackProvider>
  )
}
console.disableYellowBox = true;

