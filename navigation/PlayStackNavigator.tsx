import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayScreen from '../screens/PlayScreen';
import CreateActivityScreen from '../screens/CreateActivityScreen';
import TagVenueScreen from '../screens/TagVenueScreen';
import SelectedTimeScreen from '../screens/SelectedTimeScreen';
import GameSetupScreen from '../screens/GameSetupScreen';

export type PlyStackParamList ={
  PlayHome:undefined;
  CreateActivity:undefined;
}

const Stack = createNativeStackNavigator();
const PlayStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='PlayScreen' component={PlayScreen}/>
      <Stack.Screen name='Create' component={CreateActivityScreen}/>
      <Stack.Screen name='TagVenue' component={TagVenueScreen}/>
      <Stack.Screen name='SelectTime' component={SelectedTimeScreen}/>
      <Stack.Screen name='GameSetup' component={GameSetupScreen}/>
    </Stack.Navigator>
  )
}

export default PlayStackNavigator

const styles = StyleSheet.create({})