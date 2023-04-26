const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.send("welcome to front end");
});

app.listen(port, () => {
  console.log(`Front end listening on port ${port} `);
});
