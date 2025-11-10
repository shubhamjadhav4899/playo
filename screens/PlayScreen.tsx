import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import {
  Bell,
  Filter,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import CalenderGameCard from "../components/CalenderGameCard";
import GameCard from "../components/GameCard";

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
const PlayScreen = () => {
  const route = useRoute();

  const [selectedCategory, setSelectedCategory] = useState<
    "Calender" | "Recommended" | "My Sports" | "Other Sports" | "Past Games"
  >("My Sports");
  const [selectedSport, setSelectedSport] = useState("All");
  const [games, setGames] = useState<games[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchGames = useCallback(async () => {
    console.log(
      "Fetching games - selected category ",
      selectedCategory,
      "userId",
      user?.id
    );
    if (!user?.id && selectedCategory === "Calender") {
      console.log("No user id for calender");
      setGames([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    let endPoint: string;
    let params: { userId?: string } = {};

    if (selectedCategory === "Calender") {
      endPoint = "http://10.0.2.2:3001/api/games/upcoming";
      param: {
        userId: user?.id;
      }
    } else if (selectedCategory === "Recommended") {
      setGames([]);
      setLoading(false);
    } else {
      endPoint = "http://10.0.2.2:3001/api/games/games";
    }
    try {
      const response = await axios.get(endPoint, { params });
      // console.log("API RESPONSE", JSON.stringify(response.data, null, 2));
      setGames(response.data);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, []);
  const handlePressGame = () => {
    navigation.navigate("Create");
  };

  useFocusEffect(
    useCallback(() => {
      fetchGames();
    }, [fetchGames])
  );

  useEffect(() => {
    fetchGames();
  }, []);

  const filterdGames = useMemo(
    () =>
      selectedSport === "All"
        ? games
        : games.filter((game) => game.sport === selectedSport),
    [games, selectedSport]
  );

  const displayGames = useMemo(() => {
    const now = moment();
    if (selectedCategory === "Past Games") {
      return filterdGames.filter((game) => {
        const gameDate = moment(game.date, "Do MMMM", true);
        if (!gameDate.isValid()) {
          console.log("Invalid date");
          return false;
        }
        const gameTime = game.time.split(" - ")[0];
        const gameDateTime = moment(
          `${gameDate.format("YYYY-MM-DD")} ${gameTime}`,
          "YYYY-MM-DD h:mm A"
        );
        return gameDateTime.isBefore(now);
      });
    } else if (selectedCategory === "Calender") {
      return filterdGames
        .filter((game) => {
          const [startTime, endTime] = game.time.split(" - ");
          const gameStartTime = moment(
            `${moment(game.date, "Do MMMM", true).format("YYYY-MM-DD")} ${startTime}`,
            "YYYY-MM-DD h:mm A"
          );
          const gameEndTime = moment(
            `${moment(game.date, "Do MMMM", true).format("YYYY-MM-DD")} ${endTime}`,
            "YYYY-MM-DD h:mm A"
          );
          return (
            gameEndTime.isAfter(now) ||
            (gameStartTime.isBefore(now) && gameStartTime.isAfter(now))
          );
        })
        .sort((a, b) => {
          const aStart = moment(
            `${moment(a.date, "Do MMMM", true).format("YYYY-MM-DD")} ${a.time.split(" - ")[0]}`,
            "YYYY-MM-DD h:mm A"
          );
          const bStart = moment(
            `${moment(b.date, "Do MMMM", true).format("YYYY-MM-DD")} ${b.time.split(" - ")[0]}`,
            "YYYY-MM-DD h:mm A"
          );
          return aStart.isBefore(bStart) ? -1 : 1;
        });
    } else if (selectedCategory === "My Sports") {
      return filterdGames.sort(
        (a, b) =>
          (b.createdAt ? new Date(b.createdAt) : 0) -
          (a.createdAt ? new Date(a.createdAt) : 0)
      );
    }
    return filterdGames;
  }, [filterdGames, selectedCategory]);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-[#1f2937] pb-3">
        <View className="px-4 pt-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-gray-300 text-sm">
              {moment().format("h:mm A")}
            </Text>
            <Text className="text-white text-lg font-semibold">
              Lohegaon, Pune
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <MessageCircle color={"white"} size={22} />
            <Bell color={"white"} size={22} />
            <Image
              source={{
                uri: "https://yt3.ggpht.com/SDrNel5cTA07JHZz2Zj7Zipm0LTdHGa_m4HjXhopYpyqYj5Mq19URoJRi20mlXhfaImqXIuHKw=s88-c-k-c0x00ffffff-no-rj",
              }}
              className="w-9 h-9 rounded-full"
            />
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="mt-4 px-4"
        >
          {[
            "Calender",
            "Recommended",
            "My Sports",
            "Other Sports",
            "Past Games",
          ].map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory(item);
              }}
              className="mr-6 "
              key={index}
            >
              <Text
                className={`text-base font-bold ${selectedCategory == item ? "text-green-400" : "text-white"}`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-4"
        >
          {[
            { name: "All", icon: "🏅" },
            { name: "Cricket", icon: "🏏" },
            { name: "Football", icon: "⚽" },
            { name: "Badminton", icon: "🏸" },
            { name: "Tennis", icon: "🎾" },
            { name: "Cycling", icon: "🚴" },
            { name: "Running", icon: "🏃‍♂️" },
          ].map((sport, index) => (
            <TouchableOpacity
              onPress={() => setSelectedSport(sport.name)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center gap-2 ${selectedSport == sport.name ? "bg-green-500" : "bg-white border border-gray-500"}`}
            >
              <Text className="text-lg">{sport.icon}</Text>
              <Text
                className={`text-base font-semibold ${selectedSport == sport.name ? "text-white" : "text-gray-800"}`}
              >
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="bg-white px-4 py-3 flex-row justify-between items-center border-b border-gray-200">
        <TouchableOpacity
          onPress={handlePressGame}
          className="bg-gray-100 px-4 py-2 rounded-xl"
        >
          <Text className="text-base font-semibold text-gray-800">
            + Create games
          </Text>
        </TouchableOpacity>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <SlidersHorizontal size={22} color={"#1f2937"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Filter size={22} color={"#1f2937"} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="px-4 pt-3">
        {loading ? (
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size={"large"} color="#1f2937"/>
          </View>
        ) : displayGames.length == 0 ? (
          <View className="mt-10 justify-center items-center">
            <Text className="text-gray-500 text-lg font-medium">no Games Available under {selectedCategory}</Text>
          </View>
        ) : (
          displayGames.map((game, idx) =>
            selectedCategory == "Calender" ? <CalenderGameCard key={game._id} game={game} /> : <GameCard key={game._id} game={game} />
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
