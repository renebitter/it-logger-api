const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.get("/", (req, res) => res.json({ msg: "LOCAL NODE SERVER RUNNING" }));

// Connect Database
connectDB();

// Init Middleware
// app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/logs", require("./routes/logs"));
app.use("/api/techs", require("./routes/techs"));
// Test routes branch

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
