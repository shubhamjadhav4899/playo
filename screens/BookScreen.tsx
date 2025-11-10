import {
  
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import VenueCard from "../components/VenueCard";

const BookScreen = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3001/api/venues");
        // console.log(response.data);
        
        setVenues(response.data);
      } catch (error) {
        console.error("Failed to fetch venues :", error);
      }
    };
    fetchVenues();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Text>Viman Nagar</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
        <View className="flex-row items-center gap-3">
          <Ionicons name="chatbox-outline" size={22} color="black" />
          <Ionicons name="notifications-outline" size={22} color="black" />
          <Image
            className="w-8 h-8 rounded-full"
            source={{
              uri: user?.imageUrl,
            }}
          />
        </View>
      </View>
      <View className="mx-4 flex-row items-center justify-between bg-[#e8e8e8] px-4 py-2 rounded-full mb-4">
        <TextInput
          placeholder="Search for Venues"
          className="flex-1 text-base"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={22} color="black" />
      </View>
      <View className="flex-row gap-3 px-4 pt-2">
        {["Sport & Availability", "Favourites", "Offers"].map((label, idx) => (
          <View
            key={idx}
            className="border-2 border-gray-200 rounded-xl py-4 px-2"
          >
            <Text className="text-sm text-gray-700">{label}</Text>
          </View>
        ))}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={venues}
        renderItem={({ item }) => <VenueCard item={item} />}
        keyExtractor={(item)=>item._id}
        contentContainerStyle={{
          paddingBottom:20
        }}
      />
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({});
