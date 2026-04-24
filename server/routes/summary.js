import express from "express";
import { gstSummary } from "../data/gstData.js";

const router = express.Router();

// GET /summary/gst-summary
router.get("/gst-summary", async (req, res) => {
  try {
    res.status(200).json(gstSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
