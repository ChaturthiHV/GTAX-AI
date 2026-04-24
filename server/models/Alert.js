import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ITC_MISMATCH", "VENDOR_RISK", "FILING_DUE", "RECONCILE"],
      required: true,
    },
    message: { type: String, required: true },
    severity: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["open", "resolved", "dismissed"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Alert = mongoose.model("Alert", AlertSchema);
export default Alert;
