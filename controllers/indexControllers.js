const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const { sendtoken } = require("../utils/SendToken");
const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ message: "Secure Homepage" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships");

  await Student.populate(student, [
    {
      path: "internships.employe",
      model: "employe",
    },
    {
      path: "jobs.employe",
      model: "employe",
    },
  ]);

  res.status(200).json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!student) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  const isPasswordMatched = await student.comparePassword(req.body.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Credentials", 401));
  }

  sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token");

  res.status(200).json({
    message: "Logged out",
  });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
    student._id
  }`;
  sendMail(req, res, next, url);
  student.resetPasswordToken = "1";
  await student.save();

  res.json({ student, url });
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  if (student.resetPasswordToken == "1") {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErrorHandler("You have already changed your password", 404)
    );
  }

  res.status(200).json({ message: "password has successfully changed !" });
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  const newPassword = req.body.password;
  if (!newPassword) {
    return res.status(400).json({ message: "Password is required" });
  }

  student.password = newPassword;
  await student.save();

  sendtoken(student, 200, res);
});


exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body);
  res
    .status(200)
    .json({ success: true, message: "student updated successfully", student });
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  const file = req.files.avatar;
  const fileName = `resummebuilder-${Date.now()}${path.extname(file.name)}`;

  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: fileName,
  });
  student.avatar = { fileId, url };
  await student.save();
  res.status(200).json({ success: true, message: "avatar uploaded", student });
});

// --------------- read all Jobs -------------------

exports.readalljobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find().populate("employe");
  res.status(200).json({ success: true, jobs });
});

// --------------- read all Internships -------------------

exports.readallinternships = catchAsyncErrors(async (req, res, next) => {
  const internships = await Internship.find().populate("employe");
  res.status(200).json({ success: true, internships });
});

// --------------- Apply Internship ----------------

exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const internship = await Internship.findById(req.params.internshipId);

  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();

  res.status(200).json({ success: true, message: "Applied Successfully" });
});

// --------------- Apply Job ----------------

exports.applyjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const job = await Job.findById(req.params.jobId);

  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();

  res.status(200).json({ success: true, message: "Applied Successfully" });
});
