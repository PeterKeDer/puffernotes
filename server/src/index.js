import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import { postUpload, getAudioFile, getStatus } from "./controller";
import audioUpload from "./audioUpload";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/test", (req, res) => res.send("Hello World!"));
app.post("/upload", audioUpload.single("audio"), postUpload);
app.get("/audio/:id", getAudioFile);
app.get("/status/:id", getStatus);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
