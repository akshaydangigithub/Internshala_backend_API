const express = require("express");
const router = express.Router();
const {
  resume,
  addeducation,
  editeducation,
  deleteeducation,
  addjobs,
  editjobs,
  deletejobs,
  addinternship,
  editinternship,
  deleteinternship,
  addresponsibility,
  editresponsibility,
  deleteresponsibility,
  addcourse,
  editcourse,
  deletecourse,
  addskill,
  editskill,
  deleteskill,
  addproject,
  editproject,
  deleteproject,
  addaccomplishment,
  editaccomplishment,
  deleteaccomplishment,
} = require("../controllers/resumeControllers");
const { isauthenticated } = require("../middlewares/auth");

// ---------------------- RESUME -----------------------

// GET /
router.get("/", isauthenticated, resume);

// POST /add-edu
router.post("/add-edu", isauthenticated, addeducation);

// POST /edit-edu/:eduid
router.post("/edit-edu/:eduid", isauthenticated, editeducation);

// POST /delete-edu/:eduid
router.post("/delete-edu/:eduid", isauthenticated, deleteeducation);

// ---------------------- JOBS -----------------------

// POST /add-jobs
router.post("/add-jobs", isauthenticated, addjobs);

// POST /edit-jobs/:jobid
router.post("/edit-jobs/:jobid", isauthenticated, editjobs);

// POST /delete-jobs/:jobid
router.post("/delete-jobs/:jobid", isauthenticated, deletejobs);

// ---------------------- INTERNSHIPS -----------------------

// POST /add-internship
router.post("/add-internship", isauthenticated, addinternship);

// POST /edit-internship/:internshipid
router.post("/edit-internship/:internshipid", isauthenticated, editinternship);

// POST /delete-internship/:internshipid
router.post(
  "/delete-internship/:internshipid",
  isauthenticated,
  deleteinternship
);

// -------------------------- RESPONSIBILITIES -----------------------

// POST /add-responsibility
router.post("/add-responsibility", isauthenticated, addresponsibility);

// POST /edit-responsibility/:responsibilityid
router.post(
  "/edit-responsibility/:responsibilityid",
  isauthenticated,
  editresponsibility
);

// POST /delete-responsibility/:responsibilityid
router.post(
  "/delete-responsibility/:responsibilityid",
  isauthenticated,
  deleteresponsibility
);

// -------------------------- COURSES -----------------------

// POST /add-course
router.post("/add-course", isauthenticated, addcourse);

// POST /edit-course/:courseid
router.post("/edit-course/:courseid", isauthenticated, editcourse);

// POST /delete-course/:courseid
router.post("/delete-course/:courseid", isauthenticated, deletecourse);

// -------------------------- SKILLS -----------------------

// POST /add-skill
router.post("/add-skill", isauthenticated, addskill);

// POST /edit-skill/:skillid
router.post("/edit-skill/:skillid", isauthenticated, editskill);

// POST /delete-skill/:skillid
router.post("/delete-skill/:skillid", isauthenticated, deleteskill);

// -------------------------- PROJECTS -----------------------

// POST /add-project
router.post("/add-project", isauthenticated, addproject);

// POST /edit-project/:projectid
router.post("/edit-project/:projectid", isauthenticated, editproject);

// POST /delete-project/:projectid
router.post("/delete-project/:projectid", isauthenticated, deleteproject);

// -------------------------- ACCOMPLISHMENTS -----------------------

// POST /add-accomplishment
router.post("/add-accomplishment", isauthenticated, addaccomplishment);

// POST /edit-accomplishment/:accomplishmentid
router.post(
  "/edit-accomplishment/:accomplishmentid",
  isauthenticated,
  editaccomplishment
);

// POST /delete-accomplishment/:accomplishmentid
router.post(
  "/delete-accomplishment/:accomplishmentid",
  isauthenticated,
  deleteaccomplishment
);

module.exports = router;
