import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import PillTag from "../components/ui/PillTag";
import { ProjectCard } from "../components/cards";
import { PROJECTS } from "../constants/data";

export default function Projects() {
  return (
    <BgSection
      id="projects"
      bubbleVariant="light"
      overlay="linear-gradient(160deg, rgba(22,20,15,0.78) 0%, rgba(60,16,12,0.75) 100%)"
      style={{ padding: "120px 5%" }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal><PillTag dark>Featured Work</PillTag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,50px)", color: "#fff", margin: "20px 0 12px", lineHeight: 1.1 }}>
            Projects That Define<br /><span style={{ borderBottom: "4px solid #E8281A" }}>My Journey</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 540, marginBottom: 52 }}>
            Production-grade platforms and full stack microservices built for scale and speed.
          </p>
        </Reveal>

        <div className="dg-projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 100} />
          ))}
        </div>
      </div>
    </BgSection>
  );
}
