const express = require("express");
const helmet = require("helmet");

const db = require("../data/db.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const mot = process.env.MOT || "No Message";
    const shoutouts = await db("shoutouts");
    res.status(200).json({ messageOfTheDay: mot, shoutouts: shoutouts });
  } catch (error) {
    console.error("\nERROR", error);
    res.status(500).json({ error: "Cannot retrieve the shoutouts" });
  }
});

server.post("/shoutouts", async (req, res) => {
  try {
    const [id] = await db("shoutouts").insert(req.body);
    const shoutouts = await db("shoutouts");

    res.status(201).json(shoutouts);
  } catch (error) {
    console.error("\nERROR", error);
    res.status(500).json({ error: "Cannot add the shoutout" });
  }
});

module.exports = server;
