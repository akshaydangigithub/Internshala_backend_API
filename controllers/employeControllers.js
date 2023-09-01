const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const { sendtoken } = require("../utils/SendToken");
const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ message: "Secure employe Homepage" });
});

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id);
  res.status(200).json({ employe });
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!employe) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  const isPasswordMatched = await employe.comparePassword(req.body.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Credentials", 401));
  }

  sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token");

  res.status(200).json({
    message: "Logged out",
  });
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email });

  if (!employe) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
    employe._id
  }`;
  sendMail(req, res, next, url);
  employe.resetPasswordToken = "1";
  await employe.save();

  res.json({ employe, url });
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id);

  if (!employe) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  if (employe.resetPasswordToken == "1") {
    employe.resetPasswordToken = "0";
    employe.password = req.body.password;
    await employe.save();
  } else {
    return next(
      new ErrorHandler("You have already changed your password", 404)
    );
  }

  res.status(200).json({ message: "password has successfully changed !" });
});

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id);

  employe.password = req.body.password;
  await employe.save();

  sendtoken(employe, 200, res);
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findByIdAndUpdate(req.params.id, req.body);
  res
    .status(200)
    .json({ success: true, message: "employe updated successfully", employe });
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id);
  const file = req.files.avatar;
  const fileName = `resummebuilder-${Date.now()}${path.extname(file.name)}`;

  if (employe.avatar.fileId !== "") {
    await imagekit.deleteFile(employe.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: fileName,
  });
  employe.avatar = { fileId, url };
  await employe.save();
  res.status(200).json({ success: true, message: "avatar uploaded", employe });
});

// --------------------- Internship ----------------------------

exports.createInternship = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id);
  const internship = await new Internship(req.body);
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();
  res
    .status(201)
    .json({ success: true, message: "Internship created", internship });
});

exports.readInternship = catchAsyncErrors(async (req, res, next) => {
  const { internships } = await Employe.findById(req.id).populate(
    "internships"
  );
  res
    .status(200)
    .json({ success: true, message: "Internship found", internships });
});

exports.readSingleInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Internship found", internship });
});


// --------------------- Job ----------------------------

exports.createJob = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id);
  const job = await new Job(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();
  res
    .status(201)
    .json({ success: true, message: "Job created", job });
});

exports.readJob = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id).populate(
    "jobs"
  );
  res
    .status(200)
    .json({ success: true, message: "Job found", jobs });
});

exports.readSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Job found", job });
});