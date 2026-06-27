import Bubbles from "./Bubbles";

export default function BgSection({
  id, overlay, bubbleVariant = "light",
  children, minHeight, style = {}, gallery,
}) {
  return (
    <section
      id={id}
      style={{
        position: "relative", overflow: "hidden",
        minHeight: minHeight || "auto",
        background: overlay,
        ...style,
      }}
    >
      {gallery}
      <Bubbles variant={bubbleVariant} seedOffset={id ? id.length * 3 : 0} />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}
