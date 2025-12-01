import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Amenitites from "../components/Amenitites";

const VenueInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <ScrollView>
        <Image
          className="w-full h-52"
          source={{
            uri: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800",
          }}
        />
        <View className="p-4">
          <Text>{route?.params?.name}</Text>
          <View className="flex-row items-center mt-2 gap-2">
            <Ionicons name="time-outline" color="black" size={24} />
            <Text className="text-base font-medium">5:00 AM TO 11:00 AM</Text>
          </View>
          <View className="flex-row items-center mt-2 gap-2">
            <Ionicons name="location-outline" color="black" size={24} />
            <Text className="text-base font-medium">
              {route?.params?.location}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-around px-4 py-2">
          <View>
            <View className="flex-row">
              <Text>100 Total Activities</Text>
            </View>
            <Pressable className="mt-2 w-40 border border-gray-400 rounded-md py-2 items-center">
              <Text className="text-sm font-medium">1 Upcoming</Text>
            </Pressable>
          </View>
          <View>
            <View className="flex-row">
              {[0, 0, 0, 0, 0].map((_, i) => (
                <FontAwesome
                  key={i}
                  className="px-1"
                  name={i < Math.floor(route.params.rating) ? "star" : "star-o"}
                  size={15}
                  color="#FFD700"
                />
              ))}
              <Text>{route.params.rating} (9 ratings)</Text>
            </View>
            <Pressable className="mt-2 w-40 border border-gray-400 rounded-md py-2 items-center">
              <Text className="text-sm font-medium">Rate Venue</Text>
            </Pressable>
          </View>
        </View>
        <Text className="text-base font-semibold mx-4 mt-4">
          Sport Available
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params?.sportsAvailable.map((item, index) => (
            <View className="border border-gray-400 m-3 p-5 w-32 h-24 rounded-md justify-center">
              <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color="gray"
              style={{
                textAlign: "center",
              }}
            />
            <Text className="text-center mt-2 font-bold">{item.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Amenitites/>
      </ScrollView>
      <Pressable className="bg-green-600 p-3 mb-8 rounded-md mx-4">
        <Text className="text-white text-center font-bold">BOOK NOW</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default VenueInfoScreen;

const styles = StyleSheet.create({});
