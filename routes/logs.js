const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const Log = require("../models/Log");

// @route GET api/logs
// @desc GET all logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({
      date: "descending",
    });

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/logs
// @desc Add new log
router.post(
  "/",
  [
    check("message", "message is required.").not().isEmpty(),
    check("tech", "tech is required.").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { message, tech, attention, date } = req.body;

      const newLog = new Log({
        message,
        tech,
        attention,
        date,
      });

      const log = await newLog.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route PUT api/logs/:id
// @desc Update log
router.put("/:id", async (req, res) => {
  const { message, tech, attention, date } = req.body;

  //Build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (tech) logFields.tech = tech;
  if (attention) logFields.attention = attention;
  if (date) logFields.date = date;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "log not found." });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route DELETE api/logs/:id
// @desc Delete log
router.delete("/:id", async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found." });

    log = await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: "Log Removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
