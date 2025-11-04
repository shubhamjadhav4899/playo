const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const User = require("../models/user");

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

module.exports = router;
