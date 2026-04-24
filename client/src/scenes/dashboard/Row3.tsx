import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import StatusChip from "@/components/StatusChip";
import { useGetInvoicesQuery, useGetVendorsQuery, useGetGSTSummaryQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";

const Row3 = () => {
  const { palette } = useTheme();
  const { data: invoices } = useGetInvoicesQuery();
  const { data: vendors } = useGetVendorsQuery();
  const { data: summary } = useGetGSTSummaryQuery();

  const dataGridStyles = {
    "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
    "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` },
    "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` },
    "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
    "& .MuiDataGrid-columnHeaderTitle": { fontSize: "10px", color: palette.grey[600], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  };

  const invoiceColumns = [
    { field: "invoiceNumber", headerName: "Invoice #", flex: 1, renderCell: (p: GridCellParams) => (
      <Typography sx={{ fontSize: "11px", fontFamily: "IBM Plex Mono, monospace", color: palette.grey[300] }}>{p.value as string}</Typography>
    )},
    { field: "vendorName", headerName: "Vendor", flex: 1.2, renderCell: (p: GridCellParams) => (
      <Typography sx={{ fontSize: "11px", color: palette.grey[300] }}>{p.value as string}</Typography>
    )},
    { field: "date", headerName: "Date", flex: 0.7, renderCell: (p: GridCellParams) => (
      <Typography sx={{ fontSize: "11px", color: palette.grey[500] }}>{new Date(p.value as string).toLocaleDateString("en-IN")}</Typography>
    )},
    { field: "totalAmount", headerName: "Total (₹)", flex: 0.8, renderCell: (p: GridCellParams) => (
      <Typography sx={{ fontSize: "11px", fontFamily: "IBM Plex Mono, monospace", color: palette.grey[300] }}>₹{(p.value as number).toLocaleString("en-IN")}</Typography>
    )},
    { field: "status", headerName: "Status", flex: 0.7, renderCell: (p: GridCellParams) => (
      <StatusChip status={p.value as string} />
    )},
    { field: "confidenceScore", headerName: "Confidence", flex: 0.6, renderCell: (p: GridCellParams) => {
      const score = p.value as number;
      const color = score >= 80 ? palette.primary[400] : score >= 50 ? "#f2b455" : "#ff5252";
      return <Typography sx={{ fontSize: "11px", fontFamily: "IBM Plex Mono, monospace", color, fontWeight: 600 }}>{score}%</Typography>;
    }},
  ];

  const vendorColumns = [
    { field: "name", headerName: "Vendor Name", flex: 1.2 },
    { field: "gstin", headerName: "GSTIN", flex: 1, renderCell: (p: GridCellParams) => (
      <Typography sx={{ fontSize: "10px", fontFamily: "IBM Plex Mono, monospace", color: palette.grey[500] }}>{p.value as string}</Typography>
    )},
    { field: "complianceScore", headerName: "Score", flex: 0.5, renderCell: (p: GridCellParams) => {
      const score = p.value as number;
      const color = score >= 75 ? palette.primary[400] : score >= 50 ? "#f2b455" : "#ff5252";
      return <Typography sx={{ fontSize: "12px", fontFamily: "IBM Plex Mono, monospace", color, fontWeight: 700 }}>{score}</Typography>;
    }},
    { field: "riskLevel", headerName: "Risk", flex: 0.6, renderCell: (p: GridCellParams) => (
      <StatusChip status={p.value as string} />
    )},
    { field: "totalInvoices", headerName: "Invoices", flex: 0.5 },
    { field: "mismatchCount", headerName: "Mismatches", flex: 0.6, renderCell: (p: GridCellParams) => (
      <Typography sx={{ fontSize: "12px", color: (p.value as number) > 3 ? "#ff5252" : palette.grey[300], fontWeight: 600 }}>{p.value as number}</Typography>
    )},
  ];

  // GST health score ring
  const healthScore = summary?.healthScore ?? 0;
  const healthColor = healthScore >= 75 ? palette.primary[500] : healthScore >= 50 ? "#f2b455" : "#ff5252";

  return (
    <>
      {/* Box G — Invoice DataGrid */}
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Invoice Ledger"
          subtitle="recent invoices with reconciliation status"
          sideText={`${invoices?.length ?? 0} total`}
        />
        <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={dataGridStyles}>
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={invoices ?? []}
            columns={invoiceColumns}
            getRowId={(row) => row._id}
          />
        </Box>
      </DashboardBox>

      {/* Box H — Vendor Risk DataGrid */}
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Vendor Risk Board"
          subtitle="compliance scores & risk levels"
          sideText={`${vendors?.filter((v) => v.riskLevel === "High").length ?? 0} high risk`}
        />
        <Box mt="0.5rem" p="0 0.5rem" height="80%" sx={dataGridStyles}>
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={vendors ?? []}
            columns={vendorColumns}
            getRowId={(row) => row._id}
          />
        </Box>
      </DashboardBox>

      {/* Box I — ITC Summary */}
      <DashboardBox gridArea="i">
        <BoxHeader title="ITC Summary" subtitle="input tax credit position" sideText="" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" flexDirection="column" alignItems="stretch">
          {[
            { label: "Total ITC Available", value: `₹${((summary?.totalITC ?? 0) / 100000).toFixed(2)}L`, color: palette.primary[400] },
            { label: "ITC at Risk", value: `₹${((summary?.itcAtRisk ?? 0) / 100000).toFixed(2)}L`, color: "#ff5252" },
            { label: "GST Payable", value: `₹${((summary?.gstPayable ?? 0) / 100000).toFixed(2)}L`, color: palette.secondary[400] },
          ].map((item) => (
            <FlexBetween key={item.label} p="8px 0" sx={{ borderBottom: `1px solid ${palette.grey[800]}` }}>
              <Typography variant="h6" fontSize="11px">{item.label}</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 700, color: item.color, fontFamily: "IBM Plex Mono, monospace" }}>
                {item.value}
              </Typography>
            </FlexBetween>
          ))}
          <Box mt="0.5rem">
            <Typography variant="h6" fontSize="10px" mb="0.3rem">ITC Risk Percentage</Typography>
            <Box sx={{ height: "8px", background: palette.grey[800], borderRadius: "4px", overflow: "hidden" }}>
              <Box
                sx={{
                  height: "100%",
                  width: `${summary ? (summary.itcAtRisk / summary.totalITC) * 100 : 0}%`,
                  background: `linear-gradient(90deg, #ff5252, #ff8a80)`,
                  borderRadius: "4px",
                }}
              />
            </Box>
            <Typography variant="h6" fontSize="10px" mt="0.2rem" color="#ff5252">
              {summary ? ((summary.itcAtRisk / summary.totalITC) * 100).toFixed(1) : 0}% of ITC at risk
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      {/* Box J — Health Score */}
      <DashboardBox gridArea="j">
        <BoxHeader title="GST Health Score" subtitle="overall compliance rating" sideText="" />
        <FlexBetween p="0.5rem 1.5rem" gap="1rem">
          <Box textAlign="center">
            <Typography sx={{ fontSize: "48px", fontWeight: 800, color: healthColor, fontFamily: "IBM Plex Mono, monospace", lineHeight: 1 }}>
              {healthScore}
            </Typography>
            <Typography variant="h6" fontSize="10px" mt="0.3rem">out of 100</Typography>
          </Box>
          <Box flex={1}>
            <Box sx={{ height: "10px", background: palette.grey[800], borderRadius: "5px", overflow: "hidden", mb: "0.4rem" }}>
              <Box sx={{ height: "100%", width: `${healthScore}%`, background: healthColor, borderRadius: "5px", transition: "width 0.6s ease" }} />
            </Box>
            <Typography variant="h6" fontSize="10px">
              {healthScore >= 75
                ? "Compliance is strong. Keep up reconciliation frequency."
                : healthScore >= 50
                ? "Moderate risk. Resolve mismatches to improve ITC claims."
                : "High risk. Multiple vendors and invoices need urgent attention."}
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
    </>
  );
};

export default Row3;
