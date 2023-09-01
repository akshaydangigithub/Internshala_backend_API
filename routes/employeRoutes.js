const express = require("express");
const {
  homepage,
  employesignup,
  employesignin,
  employesignout,
  currentEmploye,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
  createInternship,
  readInternship,
  readSingleInternship,
  createJob,
  readJob,
  readSingleJob,
} = require("../controllers/employeControllers");
const { isauthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// POST /employe
router.post("/current", isauthenticated, currentEmploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /employe/signin
router.post("/signin", employesignin);

// POST /employe/signout
router.post("/signout", isauthenticated, employesignout);

// POST /employe/send-mail
router.post("/send-mail", employesendmail);

// GET /employe/forget-link/:employeId
router.get("/forget-link/:id", employeforgetlink);

// POST /employe/reset-password/:employeId
router.post("/reset-password/:id", isauthenticated, employeresetpassword);

// POST /employe/update/:employeId
router.post("/update/:id", isauthenticated, employeupdate);

// POST /employe/avatar/:employeId
router.post("/avatar/:id", isauthenticated, employeavatar);

// ----------- Internship --------------

// POST /employe/internship/create
router.post("/internship/create", isauthenticated, createInternship);

// POST /employe/internship/read
router.post("/internship/read", isauthenticated, readInternship);

// POST /employe/internship/read:id
router.post("/internship/read/:id", isauthenticated, readSingleInternship);


// ------------ Job -------------------


// POST /employe/job/create
router.post("/job/create", isauthenticated, createJob);

// POST /employe/job/read 
router.post("/job/read", isauthenticated, readJob);

// POST /employe/job/read:id
router.post("/job/read/:id", isauthenticated, readSingleJob);

module.exports = router;
