const express = require("express");
const isAuth = require("../middlewares/auth");
const offre = require("../models/offre");
const user = require("../models/user");
const Process = require("../models/Process");
const portfolios = require("../models/portfolios");
const bcrypt = require("bcryptjs");
const Notification = require("../models/Notification");
const Payment = require("../models/Payment");

const router = express.Router();

router.get("/my-offer", isAuth, async (req, res) => {
  try {
    const offerList = await offre.find({
      client: req.user._id,
    });
    res.status(201).json({ message: "my  Offers ! ", data: offerList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});
router.post("/add-offer", isAuth, async (req, res) => {
  try {
    const { title, description, price, durationLimit, attachement, skills } =
      req.body;
    const newOffer = await offre.create({
      client: req.user._id,
      title,
      description,
      price,
      durationLimit,
      attachement,
      skills,
    });
    res.status(201).json({ message: "new Offer created ! ", data: newOffer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});
router.put("/update-offer/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const offerUpdated = await offre.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(200).json({ message: " Offer updated ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});

// Route for updating proposal status
router.put("/offer/:offerId/proposal/:proposalId", isAuth, async (req, res) => {
  const { offerId, proposalId } = req.params;
  const { status } = req.body; // Assuming the status is provided in the request body

  try {
    // Find the offer by ID
    const offer = await offre.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Find the proposal within the offer
    const proposalIndex = offer.proposals.findIndex(
      (proposal) => proposal._id.toString() === proposalId
    );
    if (proposalIndex === -1) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    offer.findByIdAndUpdate(offerId, { offerSituation: "closed" });
    // Update the proposal status
    offer.proposals[proposalIndex].situation = status;
    await offer.save();
    const createProcess = await Process.create({
      client: req.user._id,
      freelancer: offer.proposals[proposalIndex].freelancer,
      offre: offerId,
    });

    res.status(200).json({
      message: "Proposal status updated and Process Created ! ",
      createProcess,
    });
  } catch (error) {
    console.error("Error updating proposal status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/delete-offer/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const offerDeleted = await offre.findByIdAndDelete(id);
    res.status(200).json({ message: " Offer deleted ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});

router.get("/freelancer-portfolio/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await portfolios
      .findOne({ user: id })
      .populate("user", "-password");
    res
      .status(200)
      .json({ message: "freelancer portfolio ! ", data: portfolio });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});

router.get("/offer/:id/proposals", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const offerDetails = await offre
      .findById(id)
      .select("title proposals")
      .populate("proposals.freelancer", "-password");
    res.status(201).json({ message: "offer ! ", data: offerDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});

router.put("/update-profile", isAuth, async (req, res) => {
  try {
    const { newPassword, currentPassword } = req.body;
    const findUser = await user.findById(req.user._id);
    if (newPassword !== undefined) {
      bcrypt
        .compare(currentPassword, findUser.password)
        .then(function (result) {
          if (result === true) {
            bcrypt.hash(newPassword, 12, async (err, hash) => {
              if (err) {
                res.status(404).json({ status: false, message: err });
              } else if (hash) {
                const updateProfile = await user.findByIdAndUpdate(
                  req.user._id,
                  {
                    password: hash,
                  },
                  { new: true }
                );
                res.status(200).json({ data: updateProfile });
              }
            });
          } else {
            res.status(404).json({ message: "Password is not correct" });
          }
        });
    } else {
      const updateProfile = await user.findByIdAndUpdate(req.user._id, {
        ...req.body,
      });
      res.status(200).json({ data: updateProfile });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/offer/accept-offer", isAuth, async (req, res) => {
  try {
    const { offerId, freelancerId, price, deliveryTime, proposalId } = req.body;

    const newProcess = await Process.create({
      client: req.user._id,
      offre: offerId,
      freelancer: freelancerId,
      price,
      deliveryTime,
    });
    const findOffer = await offre.findById(offerId);

    // Update offerSituation to "closed"
    findOffer.offerSituation = "closed";

    // Iterate through proposals to update their situation
    findOffer.proposals.forEach((proposal) => {
      if (proposal._id == proposalId) {
        proposal.situation = "Accepted";
      } else {
        proposal.situation = "Refused";
      }
    });
    await findOffer.save();

    res.status(201).json({ message: "offer Accepted", data: newProcess });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/offer-accepted", isAuth, async (req, res) => {
  try {
    const myProcess = await Process.find({ client: req.user._id })
      .populate("client", "-password")
      .populate("freelancer", "-password")
      .populate("offre");
    res.status(200).json({ message: "my process", data: myProcess });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/payment/make-payment/:id", isAuth, async (req, res) => {
  try {
    const myProcess = await Process.findById(req.params.id)
      .populate("client", "-password")
      .populate("freelancer", "-password")
      .populate("offre");
    await user.findByIdAndUpdate(myProcess.client._id, {
      balance: myProcess.client.balance - myProcess.price,
    });
    await user.findByIdAndUpdate(myProcess.freelancer._id, {
      balance: myProcess.freelancer.balance + myProcess.price,
    });
    const process = await Process.findOneAndUpdate(
      { _id: req.params.id },
      { projectProcess: "Finished" }
    );

    res.status(200).json({ message: "payment added ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/freelancers-list", isAuth, async (req, res) => {
  try {
    const freelancers = await user.find({ role: "freelancer" });

    res.status(200).json({ message: "freelancer list ! ", data: freelancers });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/deposit-money", isAuth, async (req, res) => {
  try {
    const { price, paymentMessage, d17Number } = req.body;
    const deposit = await Payment.create({
      client: req.user._id,
      price,
      paymentMessage,
      d17Number,
    });

    res.status(200).json({ message: "deposit Added  ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/deposit-history", isAuth, async (req, res) => {
  try {
    const payment = await Payment.find({
      client: req.user._id,
    }).populate("client");
    res.status(201).json(payment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

module.exports = router;
