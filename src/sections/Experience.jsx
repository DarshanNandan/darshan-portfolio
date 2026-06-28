import { useState } from "react";
import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import { INK, RED, EXPERIENCE, ACHIEVEMENTS } from "../constants/data";

function ExperienceRow({ exp, idx, total }) {
  const [hover, setHover] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setHoveredTag(null); }}
      style={{
        display: "grid", gridTemplateColumns: "200px 1fr", gap: 32,
        paddingBottom: idx < total - 1 ? 48 : 0,
        marginBottom: idx < total - 1 ? 48 : 0,
        borderBottom: idx < total - 1 ? "1px solid rgba(22,20,15,0.1)" : "none",
        background: hover ? RED : "transparent",
        borderRadius: hover ? 18 : 0,
        padding: hover ? "28px 26px" : idx < total - 1 ? "0 0 48px" : "0",
        margin: hover ? "0 0 48px" : idx < total - 1 ? "0 0 48px" : "0",
        transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
        cursor: "default",
      }}
      className="dg-tech-grid"
    >
      <div>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: hover ? "rgba(255,255,255,0.85)" : RED, transition: "color 0.3s ease" }}>{exp.period}</span>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: hover ? "rgba(255,255,255,0.6)" : "rgba(22,20,15,0.5)", marginTop: 6, transition: "color 0.3s ease" }}>{exp.duration}</div>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: hover ? "#fff" : INK, marginBottom: 16, transition: "color 0.3s ease" }}>{exp.title}</h3>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {exp.points.map((pt, i) => (
            <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, lineHeight: 1.65, color: hover ? "rgba(255,255,255,0.82)" : "rgba(22,20,15,0.7)", paddingLeft: 18, position: "relative", transition: "color 0.3s ease" }}>
              <span style={{ position: "absolute", left: 0, color: hover ? "rgba(255,255,255,0.6)" : RED, fontWeight: 700, transition: "color 0.3s ease" }}>—</span>{pt}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
          {exp.tags.map((t) => (
            <span
              key={t}
              onMouseEnter={() => setHoveredTag(t)}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 500,
                padding: "4px 12px", borderRadius: 999,
                background: hoveredTag === t ? "#fff" : hover ? "rgba(255,255,255,0.18)" : "rgba(232,40,26,0.08)",
                color: hoveredTag === t ? RED : hover ? "#fff" : RED,
                border: hoveredTag === t ? `1px solid ${RED}` : hover ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(232,40,26,0.2)",
                transition: "all 0.2s ease",
              }}
            >{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "20px 22px", borderRadius: 14,
        background: hover ? RED : "#fff",
        border: hover ? `1px solid ${RED}` : "1px solid rgba(232,40,26,0.15)",
        boxShadow: hover ? "0 16px 40px rgba(232,40,26,0.35)" : "0 4px 16px rgba(0,0,0,0.05)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
        cursor: "default",
      }}
    >
      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: hover ? "#fff" : RED, marginBottom: 6, transition: "color 0.3s ease" }}>{title}</div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.6, color: hover ? "rgba(255,255,255,0.82)" : "rgba(22,20,15,0.65)", transition: "color 0.3s ease" }}>{desc}</p>
    </div>
  );
}

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
            <ExperienceRow exp={exp} idx={idx} total={EXPERIENCE.length} />
          </Reveal>
        ))}

        {/* Achievements */}
        <Reveal delay={300}>
          <div style={{ marginTop: 64, padding: "36px 40px", background: "rgba(232,40,26,0.06)", borderRadius: 20, border: "1px solid rgba(232,40,26,0.15)" }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: INK, marginBottom: 24 }}>🏆 Achievements</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
              {ACHIEVEMENTS.map((a) => (
                <AchievementCard key={a.title} title={a.title} desc={a.desc} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </BgSection>
  );
}
