import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  MapPin,
  MoreVertical,
  Share2,
} from "lucide-react-native";

interface Player {
  _id: string;
  imageUrl: string;
  name: string;
}
interface Game {
  _id: string;
  sport: string;
  area: string;
  date: string;
  time: string;
  activityAccess: string;
  totalPlayers: string;
  players: Player[];
  isBooked: boolean;
  courtNumber?: string;
  adminName: string;
  adminUrl?: string;
  matchFull: boolean;
  requests: { userId: string; comment: string; status: string }[];
  isInProgrss: boolean;
  isUserAdmin: boolean;
  createdAt?: Date;
  userRequestStatus?: string;
}

interface Request {
  userId: string;
  comment: string;
  status: string;
  imageUrl: string;
  name: string;
}

interface Venue {
  name: string;
  sportsAvailable: string[];
  bookings: any[];
}
const GameSetupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { game } = route?.params as { game: Game };
  const { user } = useUser();
  const userId = user?.id;
  const [players, setPlayers] = useState<Player[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchFull, setMatchFull] = useState(game.matchFull);
  const [queryModalVisible, setQueryModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [comment, setComment] = useState("");

  const [startTime, endTime] = game?.time
    .split(" - ")
    .map((time) => time.trim());

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, marginRight: 10 }}
      >
        <View className="bg-[#294461] p-4 pb-6">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity>
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <View className="flex-row gap-4">
              <Share2 color="white" size={24} />
              <MoreVertical color="white" size={24} />
            </View>
          </View>
          <View className="mt-6 flex-row items-center gap-4">
            <Text className="text-white text-2xl font-bold">{game.sport}</Text>
            <View className="bg-white px-3 py-1 rounded-lg">
              <Text className="text-gray-800 text-sm font-medium">
                Mixed Doubles
              </Text>
            </View>
            <View className="ml-auto flex-row items-center gap-2">
              <Text className="text-white text-base font-medium">
                Match Full
              </Text>
              <TouchableOpacity>
                <Text className="text-white text-2xl">
                  {matchFull ? "🔒" : "🔓"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-4 text-white text-base font-semibold">
            {game?.date},{startTime}
          </Text>
          <TouchableOpacity className="mt-4 bg-green-500 px-4 py-2 rounded-lg flex-row items-center gap-2 w-11/12">
            <MapPin size={24} color="white" />
            <Text className="text-base text-white">{game.area}</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-4 mt-6 bg-white rounded-lg flex-row items-center gap-3 p-4">
          <Text className="text-2xl">↔️</Text>
          <View className="flex-1">
            <Text className="text-base font-semibold">Add Expense</Text>
            <Text className="text-gray-500 text-sm mt-1 w-3/4">
              Start adding your expenses to split cost among players
            </Text>
          </View>
          <ChevronRight color={"gray"} size={24} />
        </View>
        <View className="mx-4 mt-6">
          <Image
            source={{
              uri: "https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png",
            }}
            className="w-full h-56 rounded-xl"
            resizeMode="cover"
          />
        </View>
        <View className="mx-4 mt-6 bg-white p-4 rounded-xl">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">
              Players ({players.length})
            </Text>
            <Globe color="gray" size={24} />
          </View>
          <View className="mt-4 flex-row justify-between items-center">
            <Text className="text-base font-medium">
              ❤️ You are not covered 🙂
            </Text>
            <Text className="text-base font-medium text-blue-600">
              Learn More
            </Text>
          </View>
          {loading ? (
            <Text className="text-center text-gray-500 mt-4">
              Players Loading
            </Text>
          ) : players.length === 0 ? (
            <Text className="text-center text-gray-500 mt-4">
              No Player found
            </Text>
          ) : (
            <>
              <View className="mt-4 flex-row items-center gap-4">
                <Image
                  className="w-16 h-16 rounded-full"
                  source={{ uri: game?.adminUrl }}
                />
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-base font-medium">
                      {game?.adminName}
                    </Text>
                    <View className="bg-gray-200 px-2 py-1 rounded-md">
                      <Text className="text-xs font-semibold">Host</Text>
                    </View>
                  </View>
                  <View className="mt-2 bg-amber-300 px-2 py-1 rounded-md self-start">
                    <Text className="text-xs font-medium text-black">
                      INTERMEDIATE
                    </Text>
                  </View>
                </View>
              </View>
              {players
                ?.filter((player) => player.name !== game?.adminName)
                .map((player, index) => (
                  <View
                    key={index}
                    className="mt-4 flex-row items-center gap-4"
                  >
                    <Image
                      source={{
                        uri: player.imageUrl || "https://i.pravatar.cc/100",
                      }}
                      className="w-16 h-16 rounded-full"
                    />
                    <View>
                      <Text className="text-base font-medium">
                        {player.name}
                      </Text>
                      <View className="mt-2 border border-orange-400 px-2 py-1 rounded-md w-32">
                        <Text className="text-xs font-semibold text-orange-800">
                          INTERMEDIATE
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </>
          )}
          {game?.isUserAdmin ? (
            <>
              <View className="border-t border-gray-200 my-4" />
              <TouchableOpacity className="flex-row items-center gap-4">
                <View className="w-16 h-16 border border-gray-200 rounded-full justify-center items-center">
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/343/343303.png",
                    }}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-base font-medium flex-1">
                  Add Co-Host
                </Text>
                <ChevronRight color="black" size={24} />
              </TouchableOpacity>
              <View className="border-t border-gray-200 my-4" />
              <View className="flex-row items-center">
                <TouchableOpacity className="items-center">
                  <View className="w-16 h-16 border border-gray-200 rounded-full justify-center items-center">
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/1474/1474545.png",
                      }}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="mt-2 text-sm font-medium">Add</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="w-16 h-16 border border-gray-200 rounded-full justify-center items-center">
                    <Image   source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/7928/7928637.png",
                      }}
                      className="w-8 h-8"
                      resizeMode="contain"/>
                  </View>
                   <Text className="mt-2 text-sm font-medium">
                    Manage ({requests.length})
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameSetupScreen;

const styles = StyleSheet.create({});
