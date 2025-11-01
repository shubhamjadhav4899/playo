import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserOnboarding } from "../contexts/UserOnBoardingContext";

const NameScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const {setFirstName,setLastName}=useUserOnboarding();
  const handleNext =()=>{
    if(!firstName.trim()) return;
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    navigation.navigate('Image');
  }
  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <Text className="text-2xl font-bold mb-4">Let's get to know you!</Text>
      <Text className="text-sm mb-1">First Name *</Text>
      <TextInput
      placeholder="Enter First Name"
        value={firstName}
        onChangeText={setFirst}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <Text className="text-sm mb-1">Last Name (Optional)</Text>
      <TextInput
      placeholder="Enter Last Name"
        value={lastName}
        onChangeText={setLast}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <TouchableOpacity onPress={handleNext} className="bg-black py-4 rounded-xl">
        <Text className="text-white text-center font-bold text-base">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({});
