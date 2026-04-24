import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

type StatusType = "matched" | "mismatch" | "pending" | "Low" | "Medium" | "High" | "High-sev" | "Medium-sev" | "Low-sev" | "open" | "resolved";

interface Props {
  status: StatusType | string;
}

const StatusChip = ({ status }: Props) => {
  const { palette } = useTheme();

  const config: Record<string, { bg: string; color: string; label: string }> = {
    matched:       { bg: "rgba(18,239,200,0.12)", color: palette.primary[400], label: "matched" },
    mismatch:      { bg: "rgba(255,82,82,0.12)",  color: "#ff5252",            label: "mismatch" },
    pending:       { bg: "rgba(136,132,216,0.12)",color: "#8884d8",            label: "pending" },
    Low:           { bg: "rgba(18,239,200,0.12)", color: palette.primary[400], label: "Low Risk" },
    Medium:        { bg: "rgba(242,180,85,0.12)", color: palette.secondary[500], label: "Med Risk" },
    High:          { bg: "rgba(255,82,82,0.12)",  color: "#ff5252",            label: "High Risk" },
    "High-sev":    { bg: "rgba(255,82,82,0.12)",  color: "#ff5252",            label: "High" },
    "Medium-sev":  { bg: "rgba(242,180,85,0.12)", color: palette.secondary[500], label: "Medium" },
    "Low-sev":     { bg: "rgba(136,132,216,0.12)",color: "#8884d8",            label: "Low" },
    open:          { bg: "rgba(255,82,82,0.12)",  color: "#ff5252",            label: "open" },
    resolved:      { bg: "rgba(18,239,200,0.12)", color: palette.primary[400], label: "resolved" },
  };

  const cfg = config[status] ?? { bg: "rgba(255,255,255,0.08)", color: palette.grey[400], label: status };

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </Box>
  );
};

export default StatusChip;
