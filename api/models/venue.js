const mongoose = require("mongoose");
const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: Number,
  image: String,
  deferLink: String,
  fullLink: String,
  avgRating: Number,
  lat: Number,
  lag: Number,
  icon: String,
  filter_by: [String],
  sportsAvailable: [
    {
      id: String,
      name: String,
      icon: String,
      price: Number,
      courts: {
        id: String,
        name: String,
        number: Number,
      },
    },
  ],
  location: String,
  address: {
    type: String,
    required: true,
  },
  booking: [
    {
      courtNumber: { type: String, required: true },
      date: { type: String, requried: true },
      time: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      sport: {
        type: String,
        requied: true,
      },
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    },
  ],
});

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
