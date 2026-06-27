import { useState, useEffect } from "react";
import { useReveal } from "../../hooks/useReveal";

export default function Counter({ target, suffix = "", duration = 1500 }) {
  const [ref, shown] = useReveal();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!shown) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, target, duration]);

  const display = Number.isInteger(target) ? Math.round(val) : val.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}
