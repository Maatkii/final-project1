const express = require("express");
const offre = require("../models/offre");
const Portfolio = require("../models/portfolios");
const User = require("../models/user");
const isAuth = require("../middlewares/auth");
const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const Process = require("../models/Process");
const Withdraw = require("../models/Withdraw");

const router = express.Router();
// Route for adding a new proposal to an offer
router.post("/offer/:offerId/proposals", async (req, res) => {
  const offerId = req.params.offerId;
  const { freelancerId, description } = req.body; // Assuming freelancerId and description are provided in the request body

  try {
    // Find the offer by ID
    const offer = await offre.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Create a new proposal
    const newProposal = {
      freelancer: freelancerId,
      description: description,
      situation: "Pending",
    };

    // Add the new proposal to the offer's proposals array
    offer.proposals.push(newProposal);
    await offer.save();

    res.status(201).json({ message: "Proposal added successfully", offer });
  } catch (error) {
    console.error("Error adding proposal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/", isAuth, async (req, res) => {
  try {
    const { experience, skills, projects, socialMediaLinks } = req.body;
    const portfolio = new Portfolio({
      user: req.user._id,
      experience,
      skills,
      projects,
      socialMediaLinks,
    });
    const savedPortfolio = await portfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get portfolio by ID
router.get("/", isAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id }).populate(
      "user",
      "-password"
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res
      .status(200)
      .json({ message: "freelancer portfolio !", data: portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Experience
router.put("/add-new-experience", isAuth, async (req, res) => {
  try {
    // const { title, startDate, endDate, companyName } = req.body;
    const freelancerPortfolio = await Portfolio.findOne({ user: req.user._id });
    freelancerPortfolio.experience = [
      ...freelancerPortfolio.experience,
      { ...req.body, _id: new mongoose.Types.ObjectId() },
    ];
    freelancerPortfolio.save();
    res.status(201).json({ message: "Experience Added ! " });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/update-profile", isAuth, async (req, res) => {
  try {
    const updatePortfolio = await Portfolio.findOneAndUpdate(
      { user: req.user._id },
      {
        ...req.body.freelancerPortfolio,
      },
      { new: true } // Return the updated document
    );
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body.updateUser,
      },
      { new: true } // Return the updated document
    );

    res.status(201).json({ message: "profile updated ! " });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/add-proposal/offer/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const addNewProposal = await offre.findByIdAndUpdate(
      id,
      {
        $push: {
          proposals: { ...req.body, freelancer: req.user._id },
        },
      },
      { new: true }
    );
    const notification = await Notification.create({
      notificationFor: addNewProposal.client,
      notificationFrom: req.user._id,
      description: `${req.user.firstName} ${req.user.lastName} add a new proposal for ${addNewProposal.title}`,
      path: "/manage-tasks",
    });

    res
      .status(200)
      .json({ message: "New Proposal Added! ", data: notification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/my-process", isAuth, async (req, res) => {
  try {
    const myProcess = await Process.find({ freelancer: req.user._id })
      .populate("client", "-password")
      .populate("freelancer", "-password")
      .populate("offre");

    res.status(200).json({ message: "freelancer process ", data: myProcess });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/add-project-link/:id", isAuth, async (req, res) => {
  try {
    const myProcess = await Process.findByIdAndUpdate(
      req.params.id,
      {
        projectLink: req.body.projectLink,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "freelancer process updated", data: myProcess });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/add-withdraw-request", isAuth, async (req, res) => {
  try {
    const { d17Number, price } = req.body;
    const withdrawRequest = await Withdraw.create({
      freelancer: req.user._id,
      d17Number,
      price,
    });

    res.status(201).json({ message: "freelancer request withdraw added ! " });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/get-withdraw-request", isAuth, async (req, res) => {
  try {
    const withdrawRequest = await Withdraw.find({
      freelancer: req.user._id,
    });

    res.status(200).json(withdrawRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
