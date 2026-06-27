import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import { ExpertiseCardFull, ExpertiseCardStatic } from "../components/cards";
import { EXPERTISE_CARDS, IMG_EXPERTISE } from "../constants/data";

const STATS = [
  { val: "30%", label: "Latency reduction" },
  { val: "40%", label: "DB query improvement" },
  { val: "70%", label: "Faster release cycles" },
  { val: "99.9%", label: "System availability" },
];

export default function Expertise() {
  return (
    <BgSection
      id="expertise"
      bubbleVariant="light"
      overlay="linear-gradient(160deg, rgba(22,20,15,0.82) 0%, rgba(50,18,14,0.78) 60%, rgba(232,40,26,0.72) 100%)"
      style={{
        padding: "100px 5% 120px",
        backgroundImage: `linear-gradient(160deg, rgba(22,20,15,0.82) 0%, rgba(50,18,14,0.78) 60%, rgba(232,40,26,0.72) 100%), url(${IMG_EXPERTISE})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><PillTag dark>My Expertise</PillTag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", color: "#fff", margin: "20px 0 14px", lineHeight: 1.08 }}>
            Building modern digital solutions with code.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.78)", maxWidth: 520, marginBottom: 40 }}>
            5.6+ years delivering production-grade platforms — from high-throughput microservices to cloud-native deployments.
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={160}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 24px", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.18)", minWidth: 120 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 28, color: "#fff" }}>{s.val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className="dg-expertise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 20 }}>
          {EXPERTISE_CARDS.map((card, i) => (
            <ExpertiseCardFull key={card.num} {...card} delay={i * 80} />
          ))}
        </div>

        {/* Mobile fallback */}
        <div className="dg-expertise-mobile" style={{ flexDirection: "column", gap: 16, display: "none" }}>
          {EXPERTISE_CARDS.map((card) => (
            <ExpertiseCardStatic key={card.num} num={card.num} title={card.title} desc={card.desc} />
          ))}
        </div>
      </div>
    </BgSection>
  );
}
