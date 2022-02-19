import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { postUpload, getAudioFile, getResult } from "./controller";
import audioUpload from "./audioUpload";

dotenv.config();

const app = express();



app.use(bodyParser.json());

app.post("/upload", audioUpload.single("audio"), postUpload);
app.get("/audio/:id", getAudioFile);
// app.get("/process", process);
app.get("/result/:id", getResult);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
