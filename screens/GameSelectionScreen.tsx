import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { set } from "mongoose";

const GameSelectionScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const sports = [
    {
      id: "1",
      name: "Badminton",
      image:
        "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg",
    },
    {
      id: "2",
      name: "Cricket",
      image:
        "https://images.pexels.com/photos/3800517/pexels-photo-3800517.jpeg",
    },
    {
      id: "3",
      name: "Football",
      image:
        "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    },
    {
      id: "4",
      name: "Tennis",
      image:
        "https://images.pexels.com/photos/5836917/pexels-photo-5836917.jpeg",
    },
    {
      id: "5",
      name: "Yoga",
      image: "https://images.pexels.com/photos/317155/pexels-photo-317155.jpeg",
    },
    {
      id: "6",
      name: "Pickle Ball",
      image:
        "https://images.pexels.com/photos/17299530/pexels-photo-17299530.jpeg",
    },
    {
      id: "7",
      name: "Basketball",
      image:
        "https://images.pexels.com/photos/1905009/pexels-photo-1905009.jpeg",
    },
  ];
  const [localSelected, setLocalSelected] = useState<string[]>([]);
  const toggleSelection = (id: string) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };
  const handleDebut = () => {
    navigation.navigate("SignUp");
  }
  const renderItem = ({ item }) => {
    const isSelected = localSelected.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item.id)}
        className="mb-6 mr-3 w-[48%]"
      >
        <View
          className={`rounded-xl overflow-hidden ${isSelected ? "border-2 border-green-200" : "border border-gray-200"} bg-gray-100`}
        >
          <Image
            className="w-full h-32"
            resizeMode="cover"
            source={{ uri: item?.image }}
          />
          {isSelected && <View></View>}
        </View>
        <Text  className={`text-base text-center ${isSelected ? "text-green-500" : "text-black"}`}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      className="flex-1 bg-white px-4 pt-4"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Text className="text-2xl font-bold text-black mb-2">
        GameSelectionScreen
      </Text>
      <Text className="text-base text-gray-600 font-semibold">Select your favourite sport to get started</Text>
      <View className="mt-10"/>
      <FlatList
        data={sports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View className="absolute bottom-6 left-6 right-6">
        <TouchableOpacity
          className={`py-4 rounded-xl ${localSelected.length > 0 ? "bg-green-600" : "bg-gray-300"}`}
       disabled={localSelected.length ===0}
       onPress={handleDebut}
       >
          <Text className="text-white text-center font-semibold text-base">
            {localSelected.length > 0 ? "Make my debut" : "Select a Game"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameSelectionScreen;

const styles = StyleSheet.create({});
