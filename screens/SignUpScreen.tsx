import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSignUp } from "@clerk/clerk-expo";
import axios from "axios";
import { useUserOnboarding } from "../contexts/UserOnBoardingContext";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { firstName, lastName, image } = useUserOnboarding();

  const onSignUpPress = async () => {
    if (!isLoaded || loading) return;
    setLoading(true);
    setError("");

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.log("Sign up error:", err);
      setError(err?.errors?.[0]?.message);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || loading) return;
    setLoading(true);
    setError("");

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
       try {
         const payload = {
          clerkId: signUpAttempt.createdUserId,
          email: emailAddress,
          firstName,
          lastName,
          image,
          sports: ["football", "cricket", "tennis"],
        };

        const res = await axios.post(
          "http://10.0.2.2:3001/api/users/create-or-update",
          payload
        );

        if (res.data.success) {
          await setActive({ session: signUpAttempt.createdSessionId });
        }
       } catch (error) {
        console.log("Error",error);
        
       }
      }
      //  else {
      //   console.log("Verification incomplete:", signUpAttempt.status);
      // }
    } catch (error: any) {
      console.log("Verification error:", error);
      setError(error?.errors?.[0]?.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Conditional rendering for verification screen
  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center bg-white px-4">
        <Text className="text-center mb-2">Verify your email</Text>
        <TextInput
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          style={{
            width: "100%",
            padding: 12,
            marginVertical: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 10,
          }}
          autoCapitalize="none"
        />
        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}
        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={loading}
          className="bg-black py-4 rounded-xl flex-row justify-center items-center"
        >
          {loading && (
            <ActivityIndicator size="small" color="#fff" className="mr-2" />
          )}
          <Text className="text-white text-center font-bold text-base">
            Verify Email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Default Sign-Up UI
  return (
    <View className="flex-1 justify-center bg-white px-4">
      <View className="items-center">
        <Image
          source={{
            uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
          }}
          className="w-20 h-20"
          resizeMode="contain"
        />
        <Text className="text-lg font-semibold mt-2 text-gray-800">
          Welcome to Playo
        </Text>
        <Text className="text-sm text-gray-500">
          Create an account to get started
        </Text>
      </View>

      <View>
        <Text>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          value={emailAddress}
          onChangeText={setEmailAddress}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <TouchableOpacity
        onPress={onSignUpPress}
        disabled={loading}
        className="bg-black py-4 rounded-xl flex-row justify-center items-center"
      >
        {loading && (
          <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
        )}
        <Text className="text-white text-center font-bold text-base">
          Continue
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Text className="font-semibold text-black">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
});
