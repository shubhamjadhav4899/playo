import {
  Image,
  
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { Bell, Filter, MessageCircle, SlidersHorizontal } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PlayScreen = () => {
  const route = useRoute();

  const [selectedCategory, setSelectedCategory] = useState<
    "Calender" | "Recommended" | "My Sports" | "Other Sports" | "Past Games"
  >("My Sports");
  const [selectedSport, setSelectedSport] = useState("All");
  // const [game, setGame] = useState<Game[]>([])

  const navigation = useNavigation();

  const handlePressGame = ()=>{
    navigation.navigate("Create");
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-[#1f2937] pb-3">
        <View className="px-4 pt-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-gray-300 text-sm">
              {moment().format("h:mm A")}
            </Text>
            <Text className="text-white text-lg font-semibold">
              Lohegaon, Pune
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <MessageCircle color={"white"} size={22} />
            <Bell color={"white"} size={22} />
            <Image
              source={{
                uri: "https://yt3.ggpht.com/SDrNel5cTA07JHZz2Zj7Zipm0LTdHGa_m4HjXhopYpyqYj5Mq19URoJRi20mlXhfaImqXIuHKw=s88-c-k-c0x00ffffff-no-rj",
              }}
              className="w-9 h-9 rounded-full"
            />
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="mt-4 px-4"
        >
          {[
            "Calender",
            "Recommended",
            "My Sports",
            "Other Sports",
            "Past Games",
          ].map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory(item);
              }}
              className="mr-6 "
              key={index}
            >
              <Text
                className={`text-base font-bold ${selectedCategory == item ? "text-green-400" : "text-white"}`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-4"
        >
          {[
            { name: "All", icon: "🏅" },
            { name: "Cricket", icon: "🏏" },
            { name: "Football", icon: "⚽" },
            { name: "Badminton", icon: "🏸" },
            { name: "Tennis", icon: "🎾" },
            { name: "Cycling", icon: "🚴" },
            { name: "Running", icon: "🏃‍♂️" },
          ].map((sport, index) => (
            <TouchableOpacity
              onPress={() => setSelectedSport(sport.name)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center gap-2 ${selectedSport == sport.name ? "bg-green-500" : "bg-white border border-gray-500"}`}
            >
              <Text className="text-lg">{sport.icon}</Text>
              <Text
                className={`text-base font-semibold ${selectedSport == sport.name ? "text-white" : "text-gray-800"}`}
              >
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="bg-white px-4 py-3 flex-row justify-between items-center border-b border-gray-200">
        <TouchableOpacity onPress={handlePressGame} className="bg-gray-100 px-4 py-2 rounded-xl">
          <Text className="text-base font-semibold text-gray-800">+ Create Game</Text>
        </TouchableOpacity>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <SlidersHorizontal size={22} color={"#1f2937"}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Filter size={22} color={"#1f2937"}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
