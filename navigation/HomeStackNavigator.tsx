import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
export type HomeStackParamList={
    Home:undefined;
    ProfileDetails:undefined;
}
const Stack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='ProfileDetails' component={View}/>
    </Stack.Navigator>
  )
}

export default HomeStackNavigator

const styles = StyleSheet.create({})