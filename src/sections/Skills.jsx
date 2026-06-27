import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import { TechGroup } from "../components/cards";
import { INK, IMG3, SKILLS } from "../constants/data";

export default function Skills() {
  return (
    <BgSection
      id="skills"
      bubbleVariant="dark"
      overlay="linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(250,250,248,0.72) 100%)"
      style={{ padding: "100px 5%" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><PillTag>Technical Stack</PillTag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(30px,4.5vw,44px)", color: INK, margin: "20px 0 12px" }}>
            Technologies I Work With
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: "rgba(22,20,15,0.6)", marginBottom: 52 }}>
            Full stack expertise across modern development, distributed systems and cloud infrastructure.
          </p>
        </Reveal>

        <div className="dg-tech-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 30, rowGap: 24 }}>
          {Object.entries(SKILLS).map(([title, items], i) => (
            <TechGroup key={title} title={title} items={items} delay={i * 100} />
          ))}
        </div>
      </div>
    </BgSection>
  );
}
