import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookScreen from '../screens/BookScreen';

 export type BookStackParamList={
    BookHome:undefined;
    VenueInfo:{
      name:string;
      timing:string;
      location:string;
      rating:number;
      sportAvailable:Array<{name:string;icon:string}>;
      booking:any[]
    },
    Slot:{
      place:string;
      sport:any[];
      booking:any[];
    },
    Create:{area:string}
  }

  const Stack = createNativeStackNavigator();
const BookStackNavigator = () => {
 
  return (
    <Stack.Navigator>
      <Stack.Screen name='BookHome' component={BookScreen}/>
    </Stack.Navigator>
  )
}

export default BookStackNavigator

const styles = StyleSheet.create({})