import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
  const isSignedIn =true;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {
        isSignedIn?(
          <Stack.Screen name="Main" component={AppNavigator}/>
        ):(
          <Stack.Group></Stack.Group>
        ) 
      }
    </Stack.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})