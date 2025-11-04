import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Book,
  Calendar,
  Edit,
  Gift,
  HelpCircle,
  LogOut,
  Settings,
  Share2,
  Users,
  Wallet,
} from "lucide-react-native";
const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="bg-[#294461] p-4 pb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                className="w-16 h-16 rounded-full mr-4"
                source={{
                  uri: "https://yt3.ggpht.com/SDrNel5cTA07JHZz2Zj7Zipm0LTdHGa_m4HjXhopYpyqYj5Mq19URoJRi20mlXhfaImqXIuHKw=s88-c-k-c0x00ffffff-no-rj",
                }}
              />
              <View>
                <Text className="text-white text-xl font-bold">
                  Shubham Jadhav
                </Text>
                <Text className="text-white text-sm">150 Karma point</Text>
              </View>
            </View>

            <TouchableHighlight>
              <Edit color={"white"} size={24} />
            </TouchableHighlight>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Calendar color={"green"} size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  My Bookings
                </Text>
                <Text className="text-gray-500 text-sm">
                  View Transactions & Receipts
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2"></View>
            {/* Playpals */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Users color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Playpals
                </Text>
                <Text className="text-gray-500 text-sm">
                  View & Manage Players
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />

            {/* Passbook */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Wallet color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Passbook
                </Text>
                <Text className="text-gray-500 text-sm">
                  Manage Karma, Playo Credits, etc
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />

            {/* Preference and Privacy */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Settings color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Preference and Privacy
                </Text>
                <Text className="text-gray-500 text-sm">
                  Manage Your Settings
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Secondary Section */}
        <View className="px-4 mt-4 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {/* Offers */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Gift color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Offers
                </Text>
                <Text className="text-gray-500 text-sm">
                  View Available Discounts
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />

            {/* Blogs */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Book color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Blogs
                </Text>
                <Text className="text-gray-500 text-sm">
                  Read Latest Articles
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />

            {/* Invite & Earn */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Share2 color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Invite & Earn
                </Text>
                <Text className="text-gray-500 text-sm">
                  Refer Friends for Rewards
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />

            {/* Help & Support */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <HelpCircle color="green" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Help & Support
                </Text>
                <Text className="text-gray-500 text-sm">Get Assistance</Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />

            {/* Logout */}
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <LogOut color="red" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-red-600 text-base font-semibold">
                  Logout
                </Text>
                <Text className="text-gray-500 text-sm">
                  Sign Out of Your Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
