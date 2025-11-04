const express = require("express");
const router = express.Router();

const User = require("../models/user");
router.post("/create-or-update", async (req, res) => {
    console.log("✅ Received POST request");
  console.log("Headers:", req.headers["content-type"]);
  console.log("Incoming user data:", req.body);
  const { clerkId, email, firstName, lastName, image, sports, provider } =
    req.body;
  if (!clerkId || !email || !firstName || !image) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    let user = await User.findOne({ clerkId });
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.image = image;
      user.sport = sports;
      await user.save();
    } else {
      user = await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        image,
        sports,
        provider,
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
