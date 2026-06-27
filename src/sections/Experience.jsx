import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import { INK, RED, EXPERIENCE, ACHIEVEMENTS } from "../constants/data";

export default function Experience() {
  return (
    <BgSection
      id="experience"
      bubbleVariant="dark"
      overlay="linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,248,0.96) 100%)"
      style={{ padding: "100px 5%" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><PillTag>Career Path</PillTag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(30px,4.5vw,44px)", color: INK, margin: "20px 0 10px" }}>
            Professional <span style={{ borderBottom: `4px solid ${RED}` }}>Experience</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(22,20,15,0.5)", marginBottom: 56 }}>
            Test Yantra Software Solutions · Bengaluru, Karnataka, India
          </p>
        </Reveal>

        {EXPERIENCE.map((exp, idx) => (
          <Reveal key={exp.title} delay={idx * 120}>
            <div
              style={{
                display: "grid", gridTemplateColumns: "200px 1fr", gap: 32,
                paddingBottom: idx < EXPERIENCE.length - 1 ? 48 : 0,
                marginBottom: idx < EXPERIENCE.length - 1 ? 48 : 0,
                borderBottom: idx < EXPERIENCE.length - 1 ? "1px solid rgba(22,20,15,0.1)" : "none",
              }}
              className="dg-tech-grid"
            >
              <div>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: RED }}>{exp.period}</span>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(22,20,15,0.5)", marginTop: 6 }}>{exp.duration}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: INK, marginBottom: 16 }}>{exp.title}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.points.map((pt, i) => (
                    <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "rgba(22,20,15,0.7)", paddingLeft: 18, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: RED, fontWeight: 700 }}>—</span>{pt}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
                  {exp.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 500, color: RED, background: "rgba(232,40,26,0.08)", border: "1px solid rgba(232,40,26,0.2)", padding: "4px 12px", borderRadius: 999 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Achievements */}
        <Reveal delay={300}>
          <div style={{ marginTop: 64, padding: "36px 40px", background: "rgba(232,40,26,0.06)", borderRadius: 20, border: "1px solid rgba(232,40,26,0.15)" }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: INK, marginBottom: 24 }}>🏆 Achievements</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
              {ACHIEVEMENTS.map((a) => (
                <div key={a.title} style={{ padding: "20px 22px", background: "#fff", borderRadius: 14, border: "1px solid rgba(232,40,26,0.15)", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: RED, marginBottom: 6 }}>{a.title}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.6, color: "rgba(22,20,15,0.65)" }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </BgSection>
  );
}
