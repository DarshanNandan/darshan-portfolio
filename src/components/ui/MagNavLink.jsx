import { useRef, useState } from "react";

export default function MagNavLink({ children, href, onClick, style = {}, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.22,
      y: (e.clientY - rect.top - rect.height / 2) * 0.28,
    });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1)",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        display: "inline-block",
        ...style,
      }}
    >
      {children}
    </a>
  );
}
