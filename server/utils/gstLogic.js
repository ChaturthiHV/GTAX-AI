/**
 * GTax AI — Core Business Logic
 * All reconciliation, risk scoring, and GST calculation functions.
 */

/**
 * Reconcile a single invoice against a GSTR-2B record.
 * Returns status ("matched" | "mismatch") and a confidence score 0-100.
 */
export function reconcileInvoice(invoice, gstr2bRecord) {
  if (!gstr2bRecord) {
    return { status: "mismatch", confidenceScore: 10, reason: "Not found in GSTR-2B" };
  }

  const variance = Math.abs(invoice.totalAmount - gstr2bRecord.totalAmount);
  const pct = variance / invoice.totalAmount;

  // Tax type check
  const taxMismatch =
    Math.abs((invoice.cgst || 0) - (gstr2bRecord.cgst || 0)) > 1 ||
    Math.abs((invoice.sgst || 0) - (gstr2bRecord.sgst || 0)) > 1 ||
    Math.abs((invoice.igst || 0) - (gstr2bRecord.igst || 0)) > 1;

  if (pct < 0.01 && !taxMismatch) {
    return { status: "matched", confidenceScore: Math.round(97 - pct * 100) };
  }
  if (pct < 0.05) {
    return { status: "mismatch", confidenceScore: Math.round(65 - pct * 200), reason: `Amount variance: ₹${variance.toFixed(0)}` };
  }
  return {
    status: "mismatch",
    confidenceScore: Math.max(5, Math.round((1 - pct) * 60)),
    reason: `Large variance: ₹${variance.toFixed(0)} (${(pct * 100).toFixed(1)}%)`,
  };
}

/**
 * Calculate vendor risk level from compliance score.
 */
export function vendorRiskLevel(complianceScore) {
  if (complianceScore >= 75) return "Low";
  if (complianceScore >= 50) return "Medium";
  return "High";
}

/**
 * Compute compliance score for a vendor based on their invoice history.
 * Score 0-100: higher = safer.
 */
export function calcVendorComplianceScore(vendor) {
  if (vendor.totalInvoices === 0) return 50;
  const mismatchRate = vendor.mismatchCount / vendor.totalInvoices;
  // Base 100, penalise 80 points for 100% mismatch rate
  const score = Math.round(100 - mismatchRate * 80);
  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate total ITC at risk = sum of GST on all mismatched invoices.
 */
export function calcITCAtRisk(invoices) {
  return invoices
    .filter((inv) => inv.status === "mismatch")
    .reduce((sum, inv) => sum + (inv.cgst || 0) + (inv.sgst || 0) + (inv.igst || 0), 0);
}

/**
 * Calculate total ITC available = sum of GST on matched invoices.
 */
export function calcTotalITC(invoices) {
  return invoices
    .filter((inv) => inv.status === "matched")
    .reduce((sum, inv) => sum + (inv.cgst || 0) + (inv.sgst || 0) + (inv.igst || 0), 0);
}

/**
 * GST Health Score (0-100): composite of match rate and ITC safety.
 * matchRate contributes 60%, ITC safety 40%.
 */
export function calcHealthScore(totalInvoices, matchedInvoices, totalITC, itcAtRisk) {
  if (totalInvoices === 0) return 0;
  const matchRate = matchedInvoices / totalInvoices;
  const itcSafety = totalITC > 0 ? 1 - itcAtRisk / totalITC : 1;
  return Math.round(matchRate * 60 + itcSafety * 40);
}

/**
 * Build full GST summary from invoice array.
 */
export function buildGSTSummary(invoices, period = "Current Period") {
  const totalInvoices = invoices.length;
  const matchedInvoices = invoices.filter((i) => i.status === "matched").length;
  const mismatchedInvoices = invoices.filter((i) => i.status === "mismatch").length;
  const pendingInvoices = invoices.filter((i) => i.status === "pending").length;

  const totalITC = calcTotalITC(invoices);
  const itcAtRisk = calcITCAtRisk(invoices);

  // Simplified GST payable = 18% on taxable of matched invoices (output tax estimate)
  const gstPayable = invoices
    .filter((i) => i.status === "matched")
    .reduce((sum, inv) => sum + inv.taxableAmount * 0.18, 0);

  const healthScore = calcHealthScore(totalInvoices, matchedInvoices, totalITC, itcAtRisk);

  return {
    period,
    totalInvoices,
    matchedInvoices,
    mismatchedInvoices,
    pendingInvoices,
    totalITC,
    itcAtRisk,
    gstPayable,
    healthScore,
  };
}
