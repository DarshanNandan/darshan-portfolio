import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import MagButton from "../components/ui/MagButton";
import PillTag from "../components/ui/PillTag";
import Counter from "../components/ui/Counter";
import { RED, IMG8_HERO, STATS_HERO } from "../constants/data";

export default function Hero({ onNav }) {
  return (
    <BgSection
      id="home"
      bubbleVariant="light"
      overlay="linear-gradient(125deg, rgba(232,40,26,0.95) 0%, rgba(180,24,15,0.93) 55%, rgba(22,20,15,0.92) 100%)"
      minHeight="100vh"
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 0 40px", overflow: "hidden" }}
    >
      {/* Full-bleed right image panel */}
      <Reveal delay={150} className="dg-hero-img" style={{
        position: "absolute", top: 0, right: "-8%", bottom: 0,
        width: "62%", display: "flex", alignItems: "flex-end", justifyContent: "center",
        zIndex: 2, pointerEvents: "none",
      }}>
        <img
          src={IMG8_HERO}
          alt="Darshan Gowda N G"
          className="dg-hero-photo"
          style={{ display: "block", height: "100%", maxHeight: 1040, width: "auto", objectFit: "contain", filter: "drop-shadow(-30px 30px 60px rgba(0,0,0,0.35))" }}
        />
      </Reveal>

      {/* Text grid */}
      <div
        className="dg-hero-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 1360, margin: "0 auto", width: "100%", alignItems: "center", padding: "0 4%", position: "relative", zIndex: 3 }}
      >
        <div className="dg-hero-text-col" style={{ position: "relative", maxWidth: 460, marginRight: "auto", textAlign: "left" }}>
          <Reveal><PillTag dark>Available for new opportunities</PillTag></Reveal>
          <Reveal delay={100}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.1, color: "#fff", margin: "20px 0 16px" }}>
              Hi, I'm a<br />Senior Java<br />Full Stack Engineer
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.92)", maxWidth: 380, marginBottom: 28 }}>
              5.6+ years building scalable microservices, REST APIs and modern web applications using Java, Spring Boot, React and cloud technologies.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="dg-hero-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <MagButton variant="solid" onClick={() => onNav("projects")}>View My Work →</MagButton>
              <MagButton variant="outline" onClick={() => onNav("contact")}>Contact Me</MagButton>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="dg-hero-row" style={{ display: "flex", gap: 26, marginTop: 38, flexWrap: "wrap", paddingBottom: 40 }}>
              {STATS_HERO.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, color: "#fff" }}>
                    <Counter target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div />
      </div>
    </BgSection>
  );
}
