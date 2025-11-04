import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SelectedTimeScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { onTimeSelected } = route?.params;
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
    const [selectedPreset, setSelectedPreset] = useState('');


  const times = [
    {
      id: "0",
      type: "Morning",
      timings: "12 AM - 9 AM",
      icon: <Feather name="sun" size={24} color="black" />,
    },
    {
      id: "1",
      type: "Day",
      timings: "9 AM - 4 PM",
      icon: <Feather name="sun" size={24} color="black" />,
    },
    {
      id: "2",
      type: "Evening",
      timings: "4 PM - 9 PM",
      icon: <Feather name="sunset" size={24} color="black" />,
    },
    {
      id: "3",
      type: "Night",
      timings: "9 PM - 12 AM",
      icon: <Ionicons name="cloudy-night-outline" size={24} color="black" />,
    },
  ];

  const formatTime = (time) => {
    if (!time) return "Select Time";
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}:${ampm}`;
  };

   const handleConfirmStartTime = (time) => {
    setStartTime(time);
    setStartTimePickerVisible(false);
  };

  const handleConfirmEndTime = (time) => {
    setEndTime(time);
    setEndTimePickerVisible(false);
  };

  const selectPresetTime = (item) => {
    setSelectedPreset(item.type);
    if (onTimeSelected) {
      onTimeSelected(item.timings);
    }
    navigation.goBack();
  };

    const handleDone = () => {
    if (startTime && endTime) {
      const interval = `${formatTime(startTime)} - ${formatTime(endTime)}`;
      if (onTimeSelected) {
        onTimeSelected(interval);
      }
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please select both start and end times.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      marginTop: "100",
      title: "Select Suitable",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      headerStyle: {
        marginTop: 10,
      },
    });
  }, [navigation]);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-4">Quick Time Selection</Text>
      <View className="flex-row flex-wrap justify-between">
        {times.map((item) => (
          <Pressable
          onPress={()=>selectPresetTime(item)}
            key={item.id}
            className="w-[47%] mb-4 bg-white rounded-lg p-4 items-center justify-center shadow-sm"
          >
            {item.icon}
            <Text className="mt-2 font-semibold">{item.type}</Text>
            <Text className="text-gray-500">{item.timings}</Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-lg font-bold mt-6 mb-2 ">Or Choose Exact time</Text>
      <View className="space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium">Start Time:</Text>
          <Button
            title={formatTime(startTime)}
            onPress={() => setStartTimePickerVisible(true)}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium">End Time:</Text>
          <Button
            title={formatTime(endTime)}
            onPress={() => setEndTimePickerVisible(true)}
          />
        </View>
      </View>
      {
        startTime && endTime && (
            <Pressable onPress={handleDone} className="bg-green-600 mt-6 py-3 rounded-md">
                    <Text className="text-white text-center font-semibold text-base">Done</Text>
            </Pressable>
        )
      }
      <DateTimePickerModal isVisible={startTimePickerVisible} mode="time" onConfirm={handleConfirmStartTime} onCancel={()=>setStartTimePickerVisible(false)} is24Hour={false}/>
      <DateTimePickerModal isVisible={endTimePickerVisible} mode="time" onConfirm={handleConfirmEndTime} onCancel={()=>setEndTimePickerVisible(false)} is24Hour={false}/>
    </ScrollView>
  );
};

export default SelectedTimeScreen;

const styles = StyleSheet.create({});
