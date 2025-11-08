import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface Player {
  _id: string;
  imageUrl: string;
  name: string;
}
interface games {
  _id: string;
  sport: string;
  area: string;
  date: string;
  time: string;
  activityAccess: string;
  totalPlayers: string;
  players: Player[];
  isBooked: boolean;
  courtNumber?: string;
  adminName: string;
  adminUrl?: string;
  matchFull: boolean;
  requests: { userId: string; comment: string; status: string }[];
  isInProgrss: boolean;
  createdAt?: Date;
  userRequestStatus?: string;
}
const CalenderGameCard = () => {
  return (
    <View>
      <Text>CalenderGameCard</Text>
    </View>
  )
}

export default CalenderGameCard

const styles = StyleSheet.create({})