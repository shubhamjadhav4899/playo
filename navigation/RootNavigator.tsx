import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import SignInScreen from '../screens/SignInScreen';
import NameScreen from '../screens/NameScreen';
import SelectImageScreen from '../screens/SelectImageScreen';
import GameSelectionScreen from '../screens/GameSelectionScreen';
import StartScreen from '../screens/StartScreen';

const RootNavigator = () => {
  const isSignedIn =false;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {
        isSignedIn?(
          <Stack.Screen name="Main" component={AppNavigator}/>
        ):(
          <Stack.Group>
            <Stack.Screen name='Start' component={StartScreen}/>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
            <Stack.Screen name='SignUp' component={SignInScreen}/>
            <Stack.Screen name='Name' component={NameScreen}/>
            <Stack.Screen name='Image' component={SelectImageScreen}/>
            <Stack.Screen name='GameSelection' component={GameSelectionScreen}/>
          </Stack.Group>
        ) 
      }
    </Stack.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})