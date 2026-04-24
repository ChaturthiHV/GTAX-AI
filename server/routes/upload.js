import express from "express";
import multer from "multer";
import XLSX from "xlsx";

const router = express.Router();

// Keep file in memory, so we do not need to save it on disk
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel files (.xls, .xlsx) are allowed"));
    }
  },
});

function parseExcelBuffer(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return {
    sheetName,
    rowCount: rows.length,
    rows,
  };
}

// POST /upload/invoices
// POST /upload/gstr2b
router.post("/:type", upload.single("file"), (req, res) => {
  try {
    const { type } = req.params;

    if (!["invoices", "gstr2b"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either 'invoices' or 'gstr2b'",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = parseExcelBuffer(req.file.buffer);

    return res.status(200).json({
      success: true,
      message: `${type} file uploaded and parsed successfully`,
      type,
      fileName: req.file.originalname,
      sheetName: result.sheetName,
      rowCount: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to parse Excel file",
      error: error.message,
    });
  }
});

export default router;