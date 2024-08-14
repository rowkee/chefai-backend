import mealsFunction from "./config/openaiConfig.js";

import express from "express";
import cors from "cors";

const corsOptions = {
  origin: `${process.env.FRONT_END_URL}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/meals", mealsFunction);
