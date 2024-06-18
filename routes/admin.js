const express = require("express");
const user = require("../models/user");
const portfolios = require("../models/portfolios");
const offre = require("../models/offre");
const Payment = require("../models/Payment");
const Process = require("../models/Process");
const Reclamation = require("../models/Reclamation");
const Withdraw = require("../models/Withdraw");

const router = express.Router();

router.get("/list-users/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const usersList = await user.find({ role: type });
    res.status(200).json(usersList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});
router.delete("/delete-client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await user.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
});
router.delete("/delete-freelancer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await user.findByIdAndDelete(id);
    res.status(200).json({ message: "freelancer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userPortfolio = await portfolios.find({ user: id });
    res
      .status(200)
      .json({ message: "user Portfolio  ! ", data: userPortfolio });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});

router.get("/process-list", async (req, res) => {
  try {
    const processList = await Process.find({})
      .populate("offre")
      .populate("client")
      .populate("freelancer");
    res.status(200).json({ message: "process list   ! ", data: processList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});
router.get("/reclamations", async (req, res) => {
  try {
    const reclam = await Reclamation.find({}).populate("user");
    res.status(201).json(reclam);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});
router.get("/deposit-history", async (req, res) => {
  try {
    const payment = await Payment.find({}).populate("client");
    res.status(201).json(payment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});
router.put("/approval-payment/:id", async (req, res) => {
  try {
    const client = await Payment.findById(req.params.id);
    const User = await user.findById(client.client);

    const userUpdatedBalance = await user.findByIdAndUpdate(
      client.client,
      {
        balance: +User.balance + +client.price,
      },
      { new: true }
    );
    await Payment.findByIdAndUpdate(req.params.id, {
      paymentProcess: "Finished",
    });

    res.status(201).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});
router.put("/approval-withdraw-request/:id", async (req, res) => {
  try {
    const freelancer = await Withdraw.findById(req.params.id);
    const User = await user.findById(freelancer.freelancer);

    const userUpdatedBalance = await user.findByIdAndUpdate(
      freelancer.freelancer,
      {
        balance: +User.balance - +freelancer.price,
      },
      { new: true }
    );
    await Withdraw.findByIdAndUpdate(req.params.id, {
      paymentProcess: "Finished",
    });

    res.status(201).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

router.get("/get-withdraw-request", async (req, res) => {
  try {
    const withdrawRequest = await Withdraw.find({}).populate("freelancer");

    res.status(200).json(withdrawRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
