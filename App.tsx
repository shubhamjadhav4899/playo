import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import RootNavigator from "./navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store'
import React from "react";
import { UserOnboardingProvider } from "./contexts/UserOnBoardingContext";

const tokenCache={
    async getToken(key:string){
      try{
        return await SecureStore.getItemAsync(key);
      }catch(err){
        return null;
      }
    },
    async saveToken(key:string,value:string){
      try {
        return await SecureStore.setItemAsync(key,value);
      } catch (error) {
        return;
      }
    }
  }

  const AppContent:React.FC =()=>{
    return(
      <UserOnboardingProvider>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
      </UserOnboardingProvider>
    )
  }
export default function App() {

  
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_bXVzaWNhbC1wYW5kYS0xMC5jbGVyay5hY2NvdW50cy5kZXYk">
      <AppContent/>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
