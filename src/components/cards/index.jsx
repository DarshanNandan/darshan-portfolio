import { useState } from "react";
import Reveal from "../ui/Reveal";
import { RED, INK } from "../../constants/data";

/* ---- ExpertiseCardFull ---- */
export function ExpertiseCardFull({ num, title, desc, tags, delay }) {
  const [hover, setHover] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setHoveredTag(null); }}
        style={{
          background: hover ? RED : "rgba(255,255,255,0.97)",
          borderRadius: 20, padding: "28px 26px",
          boxShadow: hover ? "0 24px 50px rgba(232,40,26,0.4)" : "0 10px 30px rgba(0,0,0,0.18)",
          backdropFilter: "blur(6px)",
          transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          cursor: "default", height: "100%",
          display: "flex", flexDirection: "column", gap: 12,
        }}
      >
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: hover ? "rgba(255,255,255,0.35)" : "rgba(232,40,26,0.25)", lineHeight: 1 }}>{num}</span>
        <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: hover ? "#fff" : INK, transition: "color 0.3s ease" }}>{title}</h4>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: hover ? "rgba(255,255,255,0.85)" : "rgba(22,20,15,0.62)", flex: 1, transition: "color 0.3s ease" }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {tags.map((t) => (
            <span
              key={t}
              onMouseEnter={() => setHoveredTag(t)}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                padding: "4px 11px", borderRadius: 999,
                background: hoveredTag === t ? "#fff" : hover ? "rgba(255,255,255,0.18)" : "rgba(232,40,26,0.08)",
                color: hoveredTag === t ? RED : hover ? "#fff" : RED,
                border: hoveredTag === t ? `1px solid ${RED}` : hover ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(232,40,26,0.2)",
                transition: "all 0.2s ease",
              }}
            >{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---- ExpertiseCardStatic ---- */
export function ExpertiseCardStatic({ num, title, desc, tags }) {
  const [hover, setHover] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setHoveredTag(null); }}
      style={{
        background: hover ? RED : "rgba(255,255,255,0.97)",
        borderRadius: 20, padding: "28px 26px",
        boxShadow: hover ? "0 24px 50px rgba(232,40,26,0.4)" : "0 10px 30px rgba(0,0,0,0.18)",
        display: "flex", flexDirection: "column", gap: 12,
        transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: hover ? "rgba(255,255,255,0.35)" : "rgba(232,40,26,0.25)", lineHeight: 1, transition: "color 0.3s ease" }}>{num}</span>
      <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: hover ? "#fff" : INK, transition: "color 0.3s ease" }}>{title}</h4>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: hover ? "rgba(255,255,255,0.85)" : "rgba(22,20,15,0.62)", flex: 1, transition: "color 0.3s ease" }}>{desc}</p>
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {tags.map((t) => (
            <span
              key={t}
              onMouseEnter={() => setHoveredTag(t)}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                padding: "4px 11px", borderRadius: 999,
                background: hoveredTag === t ? "#fff" : hover ? "rgba(255,255,255,0.18)" : "rgba(232,40,26,0.08)",
                color: hoveredTag === t ? RED : hover ? "#fff" : RED,
                border: hoveredTag === t ? `1px solid ${RED}` : hover ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(232,40,26,0.2)",
                transition: "all 0.2s ease",
              }}
            >{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- TechGroup ---- */
export function TechGroup({ title, items, delay }) {
  const [hover, setHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? RED : "rgba(255,255,255,0.92)",
          borderRadius: 18, padding: "26px 24px", backdropFilter: "blur(6px)",
          transition: "background 0.35s ease, box-shadow 0.35s ease",
          boxShadow: hover ? "0 20px 50px rgba(232,40,26,0.4)" : "none",
          cursor: "default",
        }}
      >
        <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: hover ? "#fff" : INK, marginBottom: 14, transition: "color 0.3s ease" }}>{title}</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {items.map((it) => (
            <span
              key={it}
              onMouseEnter={() => setHoveredItem(it)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                padding: "9px 16px", borderRadius: 10,
                background: hoveredItem === it ? "#fff" : hover ? "rgba(255,255,255,0.18)" : "#fff",
                color: hoveredItem === it ? RED : hover ? "#fff" : "rgba(22,20,15,0.78)",
                border: hover ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(22,20,15,0.1)",
                transition: "all 0.2s ease", cursor: "default",
              }}
            >{it}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---- ProjectCard ---- */
export function ProjectCard({ eyebrow, title, desc, tags, points, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "rgba(255,255,255,0.95)", borderRadius: 18, backdropFilter: "blur(6px)",
          padding: "28px 26px", height: "100%", display: "flex", flexDirection: "column",
          transition: "transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease",
          transform: hover ? "translateY(-8px) rotate(-0.6deg)" : "translateY(0) rotate(0deg)",
          boxShadow: hover ? "0 30px 60px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: RED }}>{eyebrow}</span>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 21, color: INK, margin: "8px 0 10px" }}>{title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.65, color: "rgba(22,20,15,0.65)", marginBottom: 14, flex: 1 }}>{desc}</p>
        {points && (
          <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {points.map((p, i) => (
              <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(22,20,15,0.6)", paddingLeft: 14, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: RED }}>—</span>{p}
              </li>
            ))}
          </ul>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {tags.map((t) => (
            <span key={t} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 500, color: "rgba(22,20,15,0.65)", background: "rgba(22,20,15,0.06)", padding: "5px 12px", borderRadius: 999 }}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---- CertCard ---- */
export function CertCard({ num, category, title, issuer, year, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay} style={{ flexShrink: 0, width: 230 }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? RED : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(6px)", borderRadius: 16, padding: "22px 22px",
          minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: hover ? "0 20px 50px rgba(232,40,26,0.45)" : "0 10px 30px rgba(0,0,0,0.15)",
          transition: "background 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease",
          transform: hover ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
          cursor: "default",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: hover ? "rgba(255,255,255,0.8)" : RED, letterSpacing: "0.04em", transition: "color 0.3s ease" }}>{category}</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: hover ? "rgba(255,255,255,0.5)" : "rgba(22,20,15,0.3)", transition: "color 0.3s ease" }}>{num}</span>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14.5, color: hover ? "#fff" : INK, marginBottom: 6, lineHeight: 1.3, transition: "color 0.3s ease" }}>{title}</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: hover ? "rgba(255,255,255,0.7)" : "rgba(22,20,15,0.45)", textTransform: "uppercase", letterSpacing: "0.03em", transition: "color 0.3s ease" }}>
            {issuer} · {year}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
