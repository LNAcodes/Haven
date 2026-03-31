const SEVERITY_COLOR_MAP = {
  low: "var(--color-severity-low)",
  medium: "var(--color-severity-medium)",
  high: "var(--color-severity-high)",
  critical: "var(--color-severity-critical)",
};

export function getSeverityColor(severity) {
  return SEVERITY_COLOR_MAP[severity] ?? "var(--color-primary)";
}
