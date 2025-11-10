import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { Bookmark, MapPin } from "lucide-react-native";
interface Player {
  _id: string;
  imageUrl: string;
  name: string;
}
interface games {
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
  createdAt?: Date;
  userRequestStatus?: string;
}
interface GameCardProps {
  game: games;
}
const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigation = useNavigation();
  const { user } = useUser();
  const isUserInRequests = game.requests.some(
    (request) => request.userId === user?.id
  );

  return (
    <TouchableOpacity className="my-2.5 p-3.5 bg-white rounded-lg border border-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">Regular</Text>
        <Bookmark color="black" size={24} />
      </View>
      <View className="mt-2.5">
        <View className="flex-row items-center">
          <View className="flex-row">
            <Image
              className="w-14 h-14 rounded-full"
              source={{ uri: game.adminUrl }}
            />
            <View className="flex-row items-center -ml-1.5">
              {game.players
                .filter((player) => player.name !== game.adminName)
                .map((player, idx) => (
                  <Image
                    className="w-11 h-11 rounded-full -ml-1.5 border border-white"
                    key={idx}
                    source={{ uri: player.imageUrl }}
                  />
                ))}
            </View>
          </View>
          <View className="ml-2.5 flex-1">
            <Text className="text-base font-medium">
              * {game.players.length}/{game.totalPlayers} Going
            </Text>
          </View>
          <View className="bg-[#ffbd3] px-2.5 py-1.5 rounded-lg border border-[#EEDC82] bg-yellow-200">
            <Text className="font-medium text-sm">
              Only {game.totalPlayers - game.players.length} Slot left 🚀
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-2.5">
          <View>
            <Text className="text-gray-500 text-md">
              {game.adminName} | 321 karma | On Fire
            </Text>
            <Text className="mt-2.5 text-md font-medium">
              {game?.date}, {game.time.split(" - ")[0]}
            </Text>
          </View>
          {game.matchFull && (
            <Image
              source={{
                uri: "https://playo-website.gumlet.io/playo-website-v3/match_full.png",
              }}
              className="w-[100px] h-[70px]"
              resizeMode="contain"
            />
          )}
        </View>
        <View className="mt-2.5 flex-row items-center gap-1.5">
          <MapPin size={20} color="black" />
          <Text className="text-sm flex-1">{game.area}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-3">
          <View className="bg-gray-200 px-2.5 py-1.5 rounded-md">
            <Text className="text-sm font-normal">Intermediate to Advanced</Text>
          </View>
          {isUserInRequests && (
            <View className="bg-green-600 px-2.5 py-1 rounded-md">
              <Text className="text-white text-sm text-center">Requested</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({});
