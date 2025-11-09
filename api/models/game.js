const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  area: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  admin: { type: String, required: true },
  totalPlayers: { type: Number, required: true },
  activityAccess: { type: String, default: "public" },
  players: [{ type: String }],
  queries: [
    {
      userId: { type: String },
      query: { type: String },
      timeStamp: { type: Date },
    },
  ],
  requests: [
    {
      userId: { type: String },
      comment: { type: String },
      status: { type: String, default: "pending" },
    },
  ],
  isBooked: { type: Boolean, default: false },
  courtNumber: { type: Number, default: null },
  matchFull: { type: Boolean, default: false },
});
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

module.exports = Game;
