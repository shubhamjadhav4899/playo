import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const TagVenueScreen = () => {
  const [venues, setVenues] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { onVenueSelected } = route?.params;

  const handleSelectVenue =(venue)=>{
    if(onVenueSelected){
      onVenueSelected(venue)
    }
    navigation.goBack();
  }
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3001/api/venues");
        setVenues(response.data);
      } catch (error) {
        console.error("Failed to fetch venue ", error);
      }
    };
    fetchVenue();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 bg-[#294461] pb-6">
        <View className="flex-row items-center gap-3">
          <Ionicons onPress={()=>navigation.goBack()} name="arrow-back" size={24} color={"black"} />
          <Text className="text-white font-medium text-base">
            Tag Venue
          </Text>
        </View>
      </View>
      <FlatList 
      data={venues}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=>(
        <Pressable onPress={()=>handleSelectVenue(item)} className="border border-gray-200 m-3 p-3 rounded-lg bg-white shadow-sm">
          <View className="flex-row gap-4">
            <Image className="w-[90px] h-[90px] rounded-md" source={{uri:item?.image}} />
            <View className="flex-1 justify-center space-y-1 pr-2">
              <Text className="text-base font-semibold" numberOfLines={1}>{item?.name}</Text>
              <Text className="text-gray-500">Near Lohegaon, Pune</Text>
              <Text className="font-medium text-sm text-gray-700">4.5 ( 129 Rating )</Text>
            </View>
            <Ionicons name="shield-checkmark-sharp" size={24} color="green"/>
          </View>
        </Pressable>
      )}
      />
    </SafeAreaView>
  );
};

export default TagVenueScreen;

const styles = StyleSheet.create({});
