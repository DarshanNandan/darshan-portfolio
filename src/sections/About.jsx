import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import Counter from "../components/ui/Counter";
import { INK, RED, IMG2, STATS_ABOUT } from "../constants/data";

export default function About() {
  return (
    <BgSection
      id="about"
      bubbleVariant="dark"
      overlay="linear-gradient(180deg, rgba(250,250,248,0.75) 0%, rgba(250,250,248,0.70) 100%)"
      style={{ padding: "120px 5%" }}
    >
      <div
        className="dg-about-grid"
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 60, alignItems: "center" }}
      >
        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.18)" }}>
            <img src={IMG2} alt="Darshan at work" style={{ width: "100%", display: "block" }} />
          </div>
        </Reveal>

        <div>
          <Reveal><PillTag>About Me</PillTag></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", color: INK, margin: "20px 0 18px", lineHeight: 1.15 }}>
              Engineering reliable systems,<br />one service at a time.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.8, color: "rgba(22,20,15,0.68)", maxWidth: 560, marginBottom: 16 }}>
              I'm <strong>Darshan Gowda N G</strong>, a Senior Full Stack Engineer with 5.6 years of experience designing and scaling distributed systems using Java, Spring Boot and React.js.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, lineHeight: 1.8, color: "rgba(22,20,15,0.62)", maxWidth: 560, marginBottom: 36 }}>
              Proven track record building high-throughput microservices with Kafka and Redis, optimizing REST APIs for sub-100ms latency, and deploying cloud-native solutions on AWS.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 460 }}>
              {STATS_ABOUT.map((s) => (
                <div key={s.label} style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 16 }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, color: RED }}>
                    <Counter target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(22,20,15,0.55)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </BgSection>
  );
}
