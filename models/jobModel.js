const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    employe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employe",
    },
    jobtittle: String,
    skill: String,
    jobtype: {
      type: String,
      enum: ["In ofice", "remote"],
    },
    openings: Number,
    decription: String,
    preferences: String,
    salary: Number,
    perks: String,
    assessment: String,
  },
  { timestamps: true }
);

const Job = mongoose.model("job", jobModel);

module.exports = Job;
