const express = require("express");
const {
  homepage,
  studentsignup,
  studentsignin,
  studentsignout,
  currentUser,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentupdate,
  studentavatar,
  applyinternship,
  applyjob,
  readalljobs,
  readallinternships,
} = require("../controllers/indexControllers");
const { isauthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// POST /
router.post("/student", isauthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// POST /student/signout
router.post("/student/signout", isauthenticated, studentsignout);

// POST /student/send-mail
router.post("/student/send-mail", studentsendmail);

// GET /student/forget-link/:studentId
router.get("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password/:studentId
router.post(
  "/student/reset-password/:id",
  isauthenticated,
  studentresetpassword
);

// POST /student/update/:studentId
router.post("/student/update/:id", isauthenticated, studentupdate);

// POST /student/avatar/:studentId
router.post("/student/avatar/:id", isauthenticated, studentavatar);

// --------------- read all Jobs -------------------

// POST /student/alljobs
router.post("/student/alljobs", isauthenticated, readalljobs);

// --------------- read all Internships -------------------

// POST /student/allinternships
router.post("/student/allinternships", isauthenticated, readallinternships);

// --------------- Apply Internship ----------------

// POST /student/apply/internship/:internshipId
router.post(
  "/student/apply/internship/:internshipId",
  isauthenticated,
  applyinternship
);

// --------------- Apply Job ----------------

// POST /student/apply/job/:jobId
router.post("/student/apply/job/:jobId", isauthenticated, applyjob);

module.exports = router;
