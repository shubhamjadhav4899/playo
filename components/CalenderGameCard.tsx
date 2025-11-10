import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
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

interface CalenderGameCardProp {
  game: games;
}
const CalenderGameCard: React.FC<CalenderGameCardProp> = ({ game }) => {
  const navigation= useNavigation();
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const isPending = game.userRequestStatus ==='pending';
  return (
    <TouchableOpacity activeOpacity={0.4} className="p-4 bg-white rounded-xl shadow-md">
<Text className="text-blue-600 text-base font-medium mb-3 border-b border-gray-100 pb-2">
{game?.date}
</Text>
{
  isPending ? (
    <View>

    </View>
  ):(
    <View className="flex-row items-center gap-3">
      <View className="overflow-hidden">
        <Image className="w-12 h-12 rounded-full border border-gray-100" source={{uri:game.adminUrl}}/>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-1">
          {game?.adminName}'s {game?.sport} Game
        </Text>
        <Text className="text-gray-500 text-sm mb-2" numberOfLines={2} ellipsizeMode="tail">{game.area}</Text>
        <View className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm ">
          {game?.isBooked ?(
            <>
            <Text className="text-center text-gray-700 font-medium text-xs mb-1">
              Court {game.courtNumber}
            </Text>
            <Text className="text-center bg-green-600 text-white text-sm font-medium py-1.5 rounded-md">
              Booked
            </Text>
            </>
          ):(
            <Text className="text-center text-gray-700 font-medium text-sm">
              {game.time}
            </Text>
          )}
        </View>
         {game.matchFull && (
              <Image
                source={{
                  uri: 'https://playo-website.gumlet.io/playo-website-v3/match_full.png',
                }}
                className="w-[100px] h-[70px] mt-2 self-center"
                resizeMode="contain"
              />
            )}
      </View>
      <View className="items-center justify-center">
        <Text className="text-2xl font-bold text-green-600 ">{game?.players.length}</Text>
        <Text className="text-sm font-medium text-gray-600 mt-1">Going</Text>
      </View>
    </View>
  )
}
    </TouchableOpacity>
  );
};

export default CalenderGameCard;

const styles = StyleSheet.create({});
