import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    gstin: { type: String, required: true },
    vendorName: { type: String, required: true },
    date: { type: Date, required: true },
    taxableAmount: { type: Number, required: true },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["matched", "mismatch", "pending"],
      default: "pending",
    },
    confidenceScore: { type: Number, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
