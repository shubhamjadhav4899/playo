const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const User = require("../models/user");
const moment = require("moment");
router.post("/create", async (req, res) => {
  try {
    const {
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      activityAccess = "public",
    } = req.body;

    const newGame = new Game({
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      activityAccess,
      players: [admin],
    });

    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (error) {
    console.error("Error Creating Game ", error);
    res.status(500).json({ message: "Failed to create game" });
  }
});

//GET upcoming games - USER specific

router.get("/upcoming", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("Requested userId:", userId); // Debug the received userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch games where user is admin, player, or has a pending request
    const games = await Game.find({
      $or: [
        { admin: userId }, // Match exact admin ID
        { players: userId }, // Match exact player ID in array
        { requests: { $elemMatch: { userId, status: "pending" } } }, // Match pending requests
      ],
    });

    console.log("Raw games by userId:", games);

    const currentDateTime = moment();
    const formattedGames = await Promise.all(
      games.map(async (game) => {
        const adminUser = await User.findOne({ clerkId: game.admin });
        if (!adminUser) {
          console.warn(
            `Admin user with clerkId ${game.admin} not found, skipping game ${game._id}`
          );
          return null;
        }

        const playerUsers = await User.find({ clerkId: { $in: game.players } });
        const playerMap = playerUsers.reduce((map, user) => {
          map[user.clerkId] = user;
          return map;
        }, {});

        const [startTime, endTime] = game.time.split(" - ");
        const gameDate = moment(game.date, "Do MMMM", true);
        if (!gameDate.isValid()) {
          console.warn(
            `Invalid date format for game ${game._id}: ${game.date}`
          );
          return null;
        }
        const gameEndTime = moment(
          `${gameDate.format("YYYY-MM-DD")} ${endTime}`,
          "YYYY-MM-DD h:mm A"
        );

        if (gameEndTime.isAfter(currentDateTime)) {
          const userRequest = game.requests.find(
            (req) => req.userId === userId
          );
          return {
            _id: game._id,
            sport: game.sport,
            date: game.date,
            time: game.time,
            area: game.area,
            players: game.players
              .map((playerId) => {
                const player = playerMap[playerId];
                return player
                  ? {
                      _id: player.clerkId,
                      imageUrl: player.image || "https://i.pravatar.cc/100",
                      name: `${player.firstName} ${
                        player.lastName || ""
                      }`.trim(),
                    }
                  : null;
              })
              .filter((player) => player !== null),
            totalPlayers: game.totalPlayers,
            queries: game.queries || [],
            requests: game.requests || [],
            isBooked: game.isBooked || false,
            courtNumber: game.courtNumber || null,
            adminName: `${adminUser.firstName} ${
              adminUser.lastName || ""
            }`.trim(),
            adminUrl: adminUser.image || "https://i.pravatar.cc/100",
            isUserAdmin: game.admin === userId,
            matchFull: game.matchFull || false,
            activityAccess: game.activityAccess,
            isInProgress:
              moment(
                `${gameDate.format("YYYY-MM-DD")} ${startTime}`,
                "YYYY-MM-DD h:mm A"
              ).isBefore(currentDateTime) &&
              gameEndTime.isAfter(currentDateTime),
            userRequestStatus: userRequest ? userRequest.status : null,
          };
        }
        return null;
      })
    );

    const validGames = formattedGames
      .filter((game) => game !== null)
      .sort((a, b) => {
        const aStart = moment(
          `${moment(a.date, "Do MMMM", true).format("YYYY-MM-DD")} ${
            a.time.split(" - ")[0]
          }`,
          "YYYY-MM-DD h:mm A"
        );
        const bStart = moment(
          `${moment(b.date, "Do MMMM", true).format("YYYY-MM-DD")} ${
            b.time.split(" - ")[0]
          }`,
          "YYYY-MM-DD h:mm A"
        );
        return aStart.isBefore(bStart) ? -1 : 1;
      });

    res.status(200).json(validGames);
  } catch (err) {
    console.error("Error fetching games:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch upcoming games", error: err.message });
  }
});

router.get("/games", async (req, res) => {
  try {
    const games = await Game.find({});
    const currentDateTime = moment();

    const filteredGames = games.filter((game) => {
      const gameDate = moment(game.date, "Do MMMM", true);
      if (!gameDate.isValid()) {
        console.warn(`Invalid date format for game ${game._id}: ${game.date}`);
        return false;
      }
      const [startTime, endTime] = game.time.split(" - ");
      const gameStartTime = moment(
        `${gameDate.format("YYYY-MM-DD")} ${startTime}`,
        "YYYY-MM-DD h:mm A"
      );
      const gameEndTime = moment(
        `${gameDate.format("YYYY-MM-DD")} ${endTime}`,
        "YYYY-MM-DD h:mm A"
      );
      return (
        gameEndTime.isAfter(currentDateTime) ||
        (gameStartTime.isBefore(currentDateTime) &&
          gameEndTime.isAfter(currentDateTime))
      );
    });

    const formattedGames = await Promise.all(
      filteredGames.map(async (game) => {
        const adminUser = await User.findOne({ clerkId: game.admin });
        if (!adminUser) {
          console.warn(
            `Admin user with clerkId ${game.admin} not found, skipping game ${game._id}`
          );
          return null;
        }

        const playerUsers = await User.find({ clerkId: { $in: game.players } });
        const playerMap = playerUsers.reduce((map, user) => {
          map[user.clerkId] = user;
          return map;
        }, {});

        return {
          _id: game._id,
          sport: game.sport,
          date: game.date,
          time: game.time,
          area: game.area,
          players: game.players
            .map((playerId) => {
              const player = playerMap[playerId];
              return player
                ? {
                    _id: player.clerkId,
                    imageUrl: player.image || "https://i.pravatar.cc/100",
                    name: `${player.firstName} ${player.lastName || ""}`.trim(),
                  }
                : null;
            })
            .filter((player) => player !== null),
          totalPlayers: game.totalPlayers,
          queries: game.queries || [],
          requests: game.requests || [],
          isBooked: game.isBooked || false,
          courtNumber: game.courtNumber || null,
          adminName: `${adminUser.firstName} ${
            adminUser.lastName || ""
          }`.trim(),
          adminUrl: adminUser.image || "https://i.pravatar.cc/100",
          matchFull: game.matchFull || false,
          activityAccess: game.activityAccess,
          createdAt: game.createdAt, // Add createdAt for sorting
        };
      })
    );

    const validGames = formattedGames
      .filter((game) => game !== null)
      .sort((a, b) => b.createdAt - a.createdAt); // Sort by creation date descending
    res.status(200).json(validGames);
  } catch (err) {
    console.error("Error fetching games:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch games", error: err.message });
  }
});
module.exports = router;
