const mongoose = require("mongoose");

const TechSchema = mongoose.Schema({
  techs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "techs",
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("techs", TechSchema);
