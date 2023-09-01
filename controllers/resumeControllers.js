const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

// ------------------------ RESUME -----------------------

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id);
  res.status(200).json({ message: "Secure ResumePage", resume });
});

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Education", student });
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Education", student });
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredEducation = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.education = FilteredEducation;
  await student.save();
  res.status(200).json({ message: "Deleted Education", student });
});

// ------------------------ JOBS -----------------------
exports.addjobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Jobs", student });
});

exports.editjobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Jobs", student });
});

exports.deletejobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredJobs = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );
  student.resume.jobs = FilteredJobs;
  await student.save();
  res.status(200).json({ message: "Deleted Jobs", student });
});

// ------------------------ INTERNSHIPS -----------------------
exports.addinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Internships", student });
});

exports.editinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internshipIndex = student.resume.internships.findIndex(
    (i) => i.id === req.params.internshipid
  );
  student.resume.internships[internshipIndex] = {
    ...student.resume.internships[internshipIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Internships", student });
});

exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredInternships = student.resume.internships.filter(
    (i) => i.id !== req.params.internshipid
  );
  student.resume.internships = FilteredInternships;
  await student.save();
  res.status(200).json({ message: "Deleted Internships", student });
});

// ------------------------ RESPONSIBILITIES -----------------------

exports.addresponsibility = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Responsibilities", student });
});

exports.editresponsibility = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibilityIndex = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.responsibilityid
  );
  student.resume.responsibilities[responsibilityIndex] = {
    ...student.resume.responsibilities[responsibilityIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Responsibilities", student });
});

exports.deleteresponsibility = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredResponsibilities = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.responsibilityid
  );
  student.resume.responsibilities = FilteredResponsibilities;
  await student.save();
  res.status(200).json({ message: "Deleted Responsibilities", student });
});

// ------------------------ COURSES -----------------------

exports.addcourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Courses", student });
});

exports.editcourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const courseIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.courseid
  );
  student.resume.courses[courseIndex] = {
    ...student.resume.courses[courseIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Courses", student });
});

exports.deletecourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredCourses = student.resume.courses.filter(
    (i) => i.id !== req.params.courseid
  );
  student.resume.courses = FilteredCourses;
  await student.save();
  res.status(200).json({ message: "Deleted Courses", student });
});

// ------------------------ SKILLS -----------------------

exports.addskill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Skills", student });
});

exports.editskill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillid
  );
  student.resume.skills[skillIndex] = {
    ...student.resume.skills[skillIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Skills", student });
});

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredSkills = student.resume.skills.filter(
    (i) => i.id !== req.params.skillid
  );
  student.resume.skills = FilteredSkills;
  await student.save();
  res.status(200).json({ message: "Deleted Skills", student });
});

// ------------------------ PROJECTS -----------------------

exports.addproject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Projects", student });
});

exports.editproject= catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectIndex = student.resume.projects.findIndex(
    (i) => i.id === req.params.projectid
  );
  student.resume.projects[projectIndex] = {
    ...student.resume.projects[projectIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Projects", student });
});

exports.deleteproject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredProjects = student.resume.projects.filter(
    (i) => i.id !== req.params.projectid
  );
  student.resume.projects = FilteredProjects;
  await student.save();
  res.status(200).json({ message: "Deleted Projects", student });
});

// ------------------------ ACCOMPLISHMENTS -----------------------

exports.addaccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Added Accomplishments", student });
});

exports.editaccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accomplishmentIndex = student.resume.accomplishments.findIndex(
    (i) => i.id === req.params.accomplishmentid
  );
  student.resume.accomplishments[accomplishmentIndex] = {
    ...student.resume.accomplishments[accomplishmentIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "Updated Accomplishments", student });
});

exports.deleteaccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const FilteredAccomplishments = student.resume.accomplishments.filter(
    (i) => i.id !== req.params.accomplishmentid
  );
  student.resume.accomplishments = FilteredAccomplishments;
  await student.save();
  res.status(200).json({ message: "Deleted Accomplishments", student });
});
