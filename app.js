import dotenv from "dotenv";
dotenv.config();

import mealsFunction from "./config/openaiConfig.js";

import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

const corsOptions = {
  origin: "https://chefai-frontend-khaki.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/meals", mealsFunction);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
