import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import BookNavigator from './BookStackNavigator';
import PlayStackNavigator from './PlayStackNavigator';
import BookStackNavigator from './BookStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { RouteProp } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'
type TabParamList = {
    Home: undefined;
    Play: undefined;
    Book: undefined;
    More: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();
const AppNavigator:React.FC = () => {
  return (
    <Tab.Navigator screenOptions={({
        route,
    }:{
        route:RouteProp<TabParamList, keyof TabParamList>;
    })=>({
        tabBarIcon:({color,size}:{color:string,size:number})=>{
            let iconName:string='';
            if(route.name=="Home") iconName='home';
            else if(route.name=="Play") iconName ='person';
            else if(route.name=="Book") iconName ='calendar';
            else if(route.name=="More") iconName ='menu';
            return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor:"#34C759",
        tabBarInactiveTintColor:"#666666"
    })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{headerShown:false}}/>
      <Tab.Screen name="Play" component={PlayStackNavigator} options={{headerShown:false}}/>
      <Tab.Screen name="Book" component={BookStackNavigator} options={{headerShown:false}}/>
      <Tab.Screen name="More" component={ProfileScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})