import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as webBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
const useWarmUpBrowser = () => {
  useEffect(() => {
    void webBrowser.warmUpAsync();
    return () => {
      void webBrowser.coolDownAsync();
    };
  }, []);
};
const GoogleSignIn = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useWarmUpBrowser();

  const googleSignInPress = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/"),
      });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        setError("Google SignIn failed. Please try again.");
      }
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [startOAuthFlow]);
  return (
    <View className="w-full">
      {error && (
        <Text className="text-red-500 text-sm text-center mb-3">{error}</Text>
      )}

      <TouchableOpacity
        className="w-full border border-gray-300 py-3 mt-3 rounded-lg flex-row justify-center items-center"
        disabled={loading}
        onPress={googleSignInPress}
      >
        {loading ? (
          <ActivityIndicator color="#ff5722" />
        ) : (
          <>
            <Image
              source={{ uri: "https://www.google.com/favicon.ico" }}
              className="w-5 h-5 mr-2"
            />
            <Text className="text-gray-900 text-base font-semibold">
              SignIn with Google
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({});
