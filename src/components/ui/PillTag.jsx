export default function PillTag({ children, dark }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Inter', sans-serif",
        fontSize: 12.5, fontWeight: 700,
        letterSpacing: "0.04em", textTransform: "uppercase",
        padding: "8px 18px", borderRadius: 999,
        background: dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.9)",
        color: dark ? "#fff" : "#E8281A",
        backdropFilter: "blur(6px)",
      }}
    >
      {children}
    </span>
  );
}
