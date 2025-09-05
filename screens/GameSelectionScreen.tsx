import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const GameSelectionScreen = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  return (
    <View className='flex-1 items-center justify-center px-6'>
      <Text>GameSelectionScreen</Text>
    </View>
  )
}

export default GameSelectionScreen

const styles = StyleSheet.create({})