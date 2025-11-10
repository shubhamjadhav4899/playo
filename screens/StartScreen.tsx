import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

const StartScreen = () => {
  const navigation = useNavigation();
  const mapView = useRef(null);
  const users = [
    {
      image:
        "https://images.pexels.com/photos/7208625/pexels-photo-7208625.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Hey!",
    },
    {
      image:
        "https://images.pexels.com/photos/2913125/pexels-photo-2913125.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "let's play",
    },
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "I'm always",
    },
    {
      image:
        "https://images.pexels.com/photos/4307678/pexels-photo-4307678.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "At 8pm?",
    },
   
    {
      image:
        "https://images.pexels.com/photos/3264235/pexels-photo-3264235.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "What up?",
    },
     {
      image:
        "https://images.pexels.com/photos/1379031/pexels-photo-1379031.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Hey!",
    },
  ];
  const BANGLORE_CORD = {
    latitude: 12.9916987,
    longitude: 77.5945627,
  };

  const generateCircularPoint = (center, radius, numPoints) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints; // Fix: divide by numPoints

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const latitude = center.latitude + (radius / 111) * Math.cos(angle);
      const longitude =
        center.longitude +
        (radius / (111 * Math.cos(center.latitude))) * Math.sin(angle);
      points.push({ latitude, longitude });
    }
    return points;
  };
  const circularPoints = generateCircularPoint(BANGLORE_CORD, 5, users.length); // Fix: use users.length

 useEffect(() => {
    mapView.current.fitToCoordinates(circularPoints, {
      edgePadding: {
        top: 80,
        bottom: 80,
        left: 80,
        right: 80,
      },
    });
  }, []);


  return (
    <>
    <SafeAreaView className="flex-1 bg-white">
      <MapView
        ref={mapView}
        initialRegion={{
          latitude: BANGLORE_CORD.latitude,
          longitude: BANGLORE_CORD.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: 350 }}
      >
        {circularPoints?.map((point, index) => {
          const user = users[index % users.length];
          return (
            <Marker key={index} coordinate={point}>
              <View className="h-[50px] w-[100px]">
                <Image
                  source={{ uri: user?.image }}
                  className=" w-[30px] h-[30px] rounded-full"
                  resizeMode="cover"
                />
                
              
               
                <Text className="text-xs">{user?.description}</Text>
              </View>
             
            </Marker>
          );
        })}
      </MapView>
      <View className="mt-10 items-center justify-center">
        <Text className="text-xl font-semibold text-center w-1/2">Find player in your naighbhourhood</Text>
        <Text className="text-gray-500 text-base mt-5">Just like you did as a kid</Text>
      </View>
      <Pressable onPress={()=>navigation.navigate('SignIn')} className="mt-10 items-center justify-center">
        <Text className="text-base text-gray-500">
          Already have an account? Login
        </Text>
      </Pressable>
      <View className="items-center justify-center mt-6">
        <Image source={{uri:'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50'}} resizeMode="contain" className="w-[110px] h-[60px]"/>
      </View>
    </SafeAreaView>
    <View className="bg-white p-6">
      <Pressable onPress={()=>navigation.navigate('Name')} className="bg-green-500 py-3 rounded-lg">
        <Text className="text-white text-base font-medium text-center">LET, SET, GO</Text>
      </Pressable>
    </View>
    </>

  );
};

export default StartScreen;

const styles = StyleSheet.create({});
