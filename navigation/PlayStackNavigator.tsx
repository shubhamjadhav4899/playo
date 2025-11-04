import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayScreen from '../screens/PlayScreen';

export type PlyStackParamList ={
  PlayHome:undefined;
  CreateActivity:undefined;
}

const Stack = createNativeStackNavigator();
const PlayStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name='PlayScreen' component={PlayScreen}/>
    </Stack.Navigator>
  )
}

export default PlayStackNavigator

const styles = StyleSheet.create({})