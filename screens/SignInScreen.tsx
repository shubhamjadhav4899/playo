import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const SignInScreen = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <View className="flex-1 items-center justify-center px-6 ">
      <Image
        className="w-24 h-24 mb-4"
        source={{
          uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
        }}
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-1">
        Welcome back
      </Text>
      <Text className="text-base text-gray-500 mb-6">Sign to continue</Text>
      <TextInput
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Email or Phone"
        style={{
          width: "100%",
          padding: 12,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"#aaa"}
        placeholder="Password"
        style={{
          width: "100%",
          padding: 12,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
        }}
      />
      {error && <Text className="text-red-500 font-medium">{error}</Text>}
      <Pressable className="bg-green-600 py-3 rounded-xl flex-row justify-center items-center w-full">
        {loading ? (
          <ActivityIndicator size={"small"} color="#ffffff" className="mr-2" />
        ) : (
          <Text className="text-white text-center font-semibold font-medium ">Sign In</Text>
        )}
      </Pressable>
      <View className="flex-row items-center w-full my-3">
        <View className="flex-1 h-[1px] bg-gray-300"/>
        <Text className="mx-2 text-gray-500">OR</Text>
        <View className="flex-1 h-[1px] bg-gray-300"/>
      </View>
      {/* Google Sign In Component */}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
