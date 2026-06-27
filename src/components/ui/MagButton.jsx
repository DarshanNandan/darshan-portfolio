import { useRef, useState } from "react";
import { RED, INK } from "../../constants/data";

export default function MagButton({ children, href, onClick, variant = "solid", style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, r: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.3, y: relY * 0.35, r: relX * 0.04 });
  };
  const handleLeave = () => setPos({ x: 0, y: 0, r: 0 });

  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "15px 30px", borderRadius: 999,
    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14.5,
    cursor: "pointer", border: "1.5px solid currentColor",
    transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)`,
    textDecoration: "none", whiteSpace: "nowrap",
  };

  const variants = {
    solid: { background: "#fff", color: RED, borderColor: "#fff", boxShadow: pos.x || pos.y ? "0 10px 26px rgba(0,0,0,0.25)" : "none" },
    outline: { background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.6)" },
    dark: { background: INK, color: "#fff", borderColor: INK },
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={ref} href={href} onClick={onClick}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </Tag>
  );
}
