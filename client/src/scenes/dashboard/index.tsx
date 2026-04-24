import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState, type ChangeEvent } from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreens = `
  "a" "a" "a" "a"
  "b" "b" "b" "b"
  "c" "c" "c"
  "d" "d" "d"
  "e" "e"
  "f" "f" "f"
  "g" "g" "g"
  "h" "h" "h" "h"
  "i" "i"
  "j" "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 900px)");

  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [gstr2bData, setGstr2bData] = useState<any[]>([]);
  const [invoiceFileName, setInvoiceFileName] = useState("");
  const [gstr2bFileName, setGstr2bFileName] = useState("");

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    type: "invoices" | "gstr2b"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:9000/upload/${type}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(`${type} Uploaded Data:`, result);

      if (type === "invoices") {
        setInvoicesData(result.data || []);
        setInvoiceFileName(file.name);
      } else {
        setGstr2bData(result.data || []);
        setGstr2bFileName(file.name);
      }

      alert(`${type} uploaded successfully!`);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <>
    
      <Box
        sx={{
          m: "1.5rem 2.5rem 0 2.5rem",
          p: "1.5rem",
          backgroundColor: "#1f2a40",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography variant="h5" fontWeight="600" mb="1rem">
          Upload Data
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap="1.5rem"
        >
          <Box flex={1}>
            <Typography variant="body2" mb="0.5rem" color="gray">
              Invoices
            </Typography>

            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              component="label"
              fullWidth
              sx={{
                backgroundColor: "#4cceac",
                color: "#000",
                fontWeight: "600",
                "&:hover": { backgroundColor: "#3da58a" },
              }}
            >
              Upload Invoices
              <input
                type="file"
                hidden
                onChange={(e) => handleUpload(e, "invoices")}
              />
            </Button>

            <Typography variant="caption" mt="0.5rem" display="block">
              {invoiceFileName || "No file selected"}
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography variant="body2" mb="0.5rem" color="gray">
              GSTR2B
            </Typography>

            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              component="label"
              fullWidth
              sx={{
                backgroundColor: "#6870fa",
                color: "#fff",
                fontWeight: "600",
                "&:hover": { backgroundColor: "#4f57d3" },
              }}
            >
              Upload GSTR2B
              <input
                type="file"
                hidden
                onChange={(e) => handleUpload(e, "gstr2b")}
              />
            </Button>

            <Typography variant="caption" mt="0.5rem" display="block">
              {gstr2bFileName || "No file selected"}
            </Typography>
          </Box>
        </Box>

        <Box mt="1.5rem" display="flex" gap="2rem" flexWrap="wrap">
          <Typography variant="body2">
            📄 Invoices loaded: {invoicesData.length}
          </Typography>
          <Typography variant="body2">
            🧾 GSTR2B loaded: {gstr2bData.length}
          </Typography>
        </Box>
      </Box>

      <Box
        m="1.5rem 2.5rem"
        width="100%"
        height="100%"
        display="grid"
        gap="1.5rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    </>
  );
};

export default Dashboard;