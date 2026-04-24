export interface Invoice {
  _id: string;
  invoiceNumber: string;
  gstin: string;
  vendorName: string;
  date: string;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  status: "matched" | "mismatch" | "pending";
  confidenceScore: number;
}

export interface Vendor {
  _id: string;
  name: string;
  gstin: string;
  complianceScore: number;
  riskLevel: "Low" | "Medium" | "High";
  totalInvoices: number;
  mismatchCount: number;
}

export interface Alert {
  _id: string;
  type: "ITC_MISMATCH" | "VENDOR_RISK" | "FILING_DUE" | "RECONCILE";
  message: string;
  severity: "High" | "Medium" | "Low";
  date: string;
  status: "open" | "resolved" | "dismissed";
}

export interface MonthlyRecon {
  month: string;
  matched: number;
  mismatch: number;
  pending: number;
}

export interface ITCTrend {
  month: string;
  amount: number;
}

export interface GSTSummary {
  _id: string;
  period: string;
  totalInvoices: number;
  matchedInvoices: number;
  mismatchedInvoices: number;
  pendingInvoices: number;
  totalITC: number;
  itcAtRisk: number;
  gstPayable: number;
  healthScore: number;
  monthlyReconciliation: MonthlyRecon[];
  itcRiskTrend: ITCTrend[];
}
