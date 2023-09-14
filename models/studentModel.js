const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      maxLength: [15, "First Name should not exceed more than 15 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      maxLength: [15, "Last Name should not exceed more than 15 characters"],
    },
    // contact: {
    //   type: String,
    //   required: [true, "Contact is required"],
    //   maxLength: [10, "Contact should not exceed more than 10 characters"],
    //   minLength: [10, "Contact should have atleast 10 characters"],
    // },
    // city: {
    //   type: String,
    //   required: [true, "City is required"],
    //   minLength: [3, "City should have atleast 3 characters"],
    // },
    // gender: {
    //   type: String,
    //   enum: ["Male", "Female", "Other"],
    // },
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://plus.unsplash.com/premium_photo-1692441579282-6a106b012a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=70 0&q=60",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      maxLength: [15, "Password should not exceed more than 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
      //   match: [],
    },

    resetPasswordToken: {
      type: String,
      default: "0",
    },

    resume: {
      education: [],
      jobs: [],
      internships: [],
      responsibilities: [],
      courses: [],
      skills: [],
      projects: [],
      accomplishments: [],
    },
    internships: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "internship",
      },
    ],
    jobs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "job",
      },
    ],
  },
  { timestamps: true }
);

studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const Student = mongoose.model("student", studentModel);

module.exports = Student;
