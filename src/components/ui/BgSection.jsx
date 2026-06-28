import { useRef, useCallback } from "react";
import Bubbles from "./Bubbles";

export default function BgSection({
  id, overlay, bubbleVariant = "light",
  children, minHeight, style = {}, gallery,
}) {
  const bubblesRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    bubblesRef.current?.onSectionMouseMove(e);
  }, []);

  const handleMouseLeave = useCallback(() => {
    bubblesRef.current?.onSectionMouseLeave();
  }, []);

  return (
    <section
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative", overflow: "hidden",
        minHeight: minHeight || "auto",
        background: overlay,
        ...style,
      }}
    >
      {gallery}
      <Bubbles
        ref={bubblesRef}
        variant={bubbleVariant}
        seedOffset={id ? id.length * 3 : 0}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}
