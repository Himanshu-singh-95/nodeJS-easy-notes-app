const express = require("express");

// create express app
const app = express();

app.use(express.json());

// define a simple route for testing
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// Require Notes routes
const notesRouter = require("./routers/note.routes");
// using midleware to use router file for all request with `\notes`
app.use("/notes", notesRouter);

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
