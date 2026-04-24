📦 Data Models
Invoice
invoiceNumber
gstin
vendorName
date
taxableAmount
cgst
sgst
igst
totalAmount
status
confidenceScore
Vendor
name
gstin
complianceScore
riskLevel
totalInvoices
mismatchCount
Alert
type
message
severity
date
status
GST Summary
totalInvoices
matchedInvoices
mismatchedInvoices
totalITC
itcAtRisk
gstPayable
healthScore


⚙️ How It Works
Invoice data is loaded into the system
Records are reconciled and matched against GST data
Mismatches are detected and confidence scores are assigned
Vendor risk is calculated based on compliance patterns
GST summary metrics are generated
Alerts are shown for high-risk items and filing issues


🧪 Demo Flow
Open the dashboard
View GST summary cards
Check matched vs mismatched invoices
Observe ITC at risk
Review vendor risk levels
Inspect alerts for compliance issues


🔧 Installation
Frontend
cd client
npm install
npm run dev
Backend
cd server
npm install
npm start

If the project uses mock data only, the backend may not be required for demo mode.



🎯 Project Goal

To build a GST compliance assistant that helps MSMEs:

reduce penalties
recover blocked ITC
identify risky vendors
simplify filing
save time and manual effo