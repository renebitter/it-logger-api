const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const Log = require("../models/Log");

// @route GET api/logs
// @desc GET all logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find();
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
      const { message, tech, attention } = req.body;

      const log = new Log({
        message,
        tech,
        attention,
      });

      await log.save();

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
  const { message, tech, attention } = req.body;

  //Build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (tech) logFields.tech = tech;
  logFields.attention = attention;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "log not found." });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    ); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one.

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

    log = await Log.findByIdAndRemove(req.params.id); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one.

    res.send("Log Removed.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
