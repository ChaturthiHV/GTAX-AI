import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import invoiceRoutes from "./routes/invoice.js";
import vendorRoutes from "./routes/vendor.js";
import alertRoutes from "./routes/alert.js";
import summaryRoutes from "./routes/summary.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/invoice", invoiceRoutes);
app.use("/vendor", vendorRoutes);
app.use("/alert", alertRoutes);
app.use("/summary", summaryRoutes);
app.use("/upload", uploadRoutes);
app.get("/health", (req, res) => res.json({ status: "ok", product: "GTax AI" }));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`GTax AI Server running on port ${PORT}`);
  console.log("Using in-memory mock data — connect MongoDB for production");
});

/*
 * PRODUCTION: Replace mock data in routes with Mongoose calls.
 * mongoose.connect(process.env.MONGO_URL)
 */
