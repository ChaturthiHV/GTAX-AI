import express from "express";
import { alerts } from "../data/gstData.js";

const router = express.Router();

// GET /alert/alerts
router.get("/alerts", async (req, res) => {
  try {
    const sorted = [...alerts].sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      return (order[a.severity] || 2) - (order[b.severity] || 2);
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
