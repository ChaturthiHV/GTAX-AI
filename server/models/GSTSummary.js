import mongoose from "mongoose";

const MonthlyReconSchema = new mongoose.Schema({
  month: String,
  matched: Number,
  mismatch: Number,
  pending: Number,
});

const ITCTrendSchema = new mongoose.Schema({
  month: String,
  amount: Number,
});

const GSTSummarySchema = new mongoose.Schema(
  {
    period: { type: String, required: true },
    totalInvoices: { type: Number, default: 0 },
    matchedInvoices: { type: Number, default: 0 },
    mismatchedInvoices: { type: Number, default: 0 },
    pendingInvoices: { type: Number, default: 0 },
    totalITC: { type: Number, default: 0 },
    itcAtRisk: { type: Number, default: 0 },
    gstPayable: { type: Number, default: 0 },
    healthScore: { type: Number, min: 0, max: 100, default: 0 },
    monthlyReconciliation: [MonthlyReconSchema],
    itcRiskTrend: [ITCTrendSchema],
  },
  { timestamps: true }
);

const GSTSummary = mongoose.model("GSTSummary", GSTSummarySchema);
export default GSTSummary;
