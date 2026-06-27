import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import { CertCard } from "../components/cards";
import { INK, RED, CERTIFICATIONS } from "../constants/data";

const IMG_CREDENTIALS = "/credentials.png";

export default function Certifications() {
  return (
    <BgSection
      id="certifications"
      bubbleVariant="dark"
      overlay="linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.76) 100%)"
      style={{ padding: "100px 5% 120px" }}
    >
      <div
        className="dg-cert-grid"
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 60, alignItems: "center" }}
      >
        <div>
          <Reveal><PillTag>System Badges</PillTag></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(30px,4.5vw,44px)", color: INK, margin: "20px 0 12px" }}>
              Professional <span style={{ borderBottom: `4px solid ${RED}` }}>Credentials</span>
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(22,20,15,0.55)", marginBottom: 44 }}>
              Industry-recognised certifications validating expertise in Java and cloud architecture.
            </p>
          </Reveal>

          <div
            style={{ display: "flex", gap: 20, overflowX: "auto", padding: "4px 0 16px" }}
            className="dg-cert-rail"
          >
            {CERTIFICATIONS.map((cert, i) => (
              <CertCard key={cert.num} {...cert} delay={i * 80} />
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.18)" }}>
            <img src={IMG_CREDENTIALS} alt="Darshan working on professional certifications" style={{ width: "100%", display: "block" }} />
          </div>
        </Reveal>
      </div>
    </BgSection>
  );
}
