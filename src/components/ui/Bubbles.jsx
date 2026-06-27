export default function Bubbles({ variant = "light", count = 7, seedOffset = 0 }) {
  const color =
    variant === "light" ? "rgba(255,255,255,0.16)" : "rgba(232,40,26,0.14)";

  const bubbles = Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset;
    return {
      key: seed,
      size: 40 + ((seed * 37) % 140),
      left: (seed * 53) % 100,
      top: (seed * 29) % 100,
      duration: 14 + (seed % 10),
      delay: (seed % 7) * -1.4,
    };
  });

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        overflow: "hidden", pointerEvents: "none", zIndex: 1,
      }}
    >
      {bubbles.map((b) => (
        <span
          key={b.key}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size, height: b.size,
            borderRadius: "50%",
            background: color,
            filter: "blur(2px)",
            animation: `dgFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
