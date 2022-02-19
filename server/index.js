import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
