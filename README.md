# GTax AI — AI-Powered GST Co-Pilot for MSMEs

GTax AI is a smart GST compliance dashboard designed for small and medium businesses (MSMEs) to simplify invoice reconciliation, detect ITC mismatches, track vendor risk, and reduce filing errors.

It helps businesses move from **reactive filing** to **proactive compliance** by showing key GST insights in a simple and interactive dashboard.

---

## 🚀 Features

- **Invoice Reconciliation**
  - Matches invoice data and highlights mismatches
  - Detects pending, matched, and mismatch records

- **ITC Risk Analysis**
  - Calculates Input Tax Credit (ITC)
  - Shows ITC at risk due to mismatched invoices

- **Vendor Risk Monitoring**
  - Tracks vendor compliance score
  - Flags risky suppliers based on mismatch history

- **GST Summary Dashboard**
  - Displays total invoices, matched invoices, mismatches, GST payable, and health score

- **Real-Time Alerts**
  - Highlights high-risk invoices and compliance issues
  - Helps users act before filing deadlines

- **AI-Powered Compliance Assistance**
  - Supports decision-making with smart GST insights
  - Makes GST compliance easier for non-experts

---

## 🧠 Problem Statement

Small businesses often struggle with GST due to:
- Filing errors
- ITC claim rejections
- Non-compliant suppliers
- Frequent regulatory changes
- Heavy dependency on manual accounting support

GTax AI solves this by acting as a **GST co-pilot** that helps users identify risks early and stay compliant with less manual effort.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, MUI
- **Backend:** Node.js, Express.js
- **Data Handling:** Mock JSON / in-memory data for fast demo
- **Charts & UI:** Recharts, Material UI components
- **State Management:** Redux Toolkit / RTK Query (if used)

---

## 📁 Project Structure

```bash
GTAX-AI/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── state/
│   │   ├── scenes/
│   │   └── App.tsx
│   └── package.json
│
├── server/
│   ├── data/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── index.js
│
└── README.md