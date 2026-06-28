import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

const REPULSION_RADIUS = 180;   // px — distance at which mouse starts pushing
const REPULSION_STRENGTH = 240; // px — max push displacement

const Bubbles = forwardRef(function Bubbles({ variant = "light", count = 7, seedOffset = 0 }, ref) {
  const color =
    variant === "light" ? "rgba(255,255,255,0.16)" : "rgba(232,40,26,0.14)";

  const containerRef = useRef(null);
  const mouseRef = useRef(null);
  const rafRef = useRef(null);

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

  const [offsets, setOffsets] = useState(() =>
    Array.from({ length: count }, () => ({ x: 0, y: 0 }))
  );
  const offsetsRef = useRef(offsets);

  // Expose mouse handlers to parent via ref
  useImperativeHandle(ref, () => ({
    onSectionMouseMove(e) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    onSectionMouseLeave() {
      mouseRef.current = null;
    },
  }));

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) { rafRef.current = requestAnimationFrame(animate); return; }

    const rect = container.getBoundingClientRect();
    const mouse = mouseRef.current;

    const next = bubbles.map((b, i) => {
      // Bubble centre in px relative to container
      const bx = (b.left / 100) * rect.width;
      const by = (b.top / 100) * rect.height;

      let targetX = 0;
      let targetY = 0;

      if (mouse) {
        const dx = bx - mouse.x;
        const dy = by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          targetX = (dx / dist) * force;
          targetY = (dy / dist) * force;
        }
      }

      // Smooth lerp toward target
      const cur = offsetsRef.current[i];
      return {
        x: cur.x + (targetX - cur.x) * 0.075,
        y: cur.y + (targetY - cur.y) * 0.075,
      };
    });

    offsetsRef.current = next;
    setOffsets([...next]);
    rafRef.current = requestAnimationFrame(animate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        overflow: "hidden", pointerEvents: "none", zIndex: 1,
      }}
    >
      {bubbles.map((b, i) => (
        <span
          key={b.key}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: color,
            filter: "blur(2px)",
            animation: `dgFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
            transform: `translate(${offsets[i]?.x ?? 0}px, ${offsets[i]?.y ?? 0}px)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
});

export default Bubbles;
