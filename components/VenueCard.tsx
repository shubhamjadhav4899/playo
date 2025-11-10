import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const VenueCard = ({ item }: { item: any }) => {
    const navigation = useNavigation();

  return (
    <View className="mx-4 my-3">
      <Pressable onPress={()=>{
        navigation.navigate("venueInfo",{
            name:item.name,
            image:item.image,
            sportsAvailable:item.sportsAvailable,
            rating:item.rating,
            timings:item.timings,
            address:item.address,
            location:item.location,
            bookings:item.bookings
        })
      }}>
        <Image
          className="w-full h-52 rounded-t-lg"
          source={{
            uri: item?.image,
          }}
        />
        <View className="px-3 py-2">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-base font-medium text-black">
              {item.name.length > 40
                ? item.name.substring(0, 40) + "..."
                : item?.name}
            </Text>
            <View className="flex-row items-center gap-1 bg-green-500 px-2.5 py-1 rounded-md">
              <AntDesign name="star" size={24} color="white" />
              <Text className="text-white font-bold text-sm">
                {item.rating}
              </Text>
            </View>
          </View>
          <Text className="text-gray-500 text-sm">
            {item.address.length > 40
              ? item.address.substring(0, 40) + "..."
              : item?.address}
          </Text>
          <View className="border border-gray-200 my-3"/>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-black">
                Upto 10% off 
            </Text>
            <Text className="text-sm font-medium text-black">
                INR 250 onward
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default VenueCard;

const styles = StyleSheet.create({});
