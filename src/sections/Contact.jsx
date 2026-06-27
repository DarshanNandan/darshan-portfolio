import BgSection from "../components/ui/BgSection";
import Reveal from "../components/ui/Reveal";
import ContactForm from "../components/ContactForm";
import { IMG4 } from "../constants/data";

export default function Contact() {
  return (
    <BgSection
      id="contact"
      bubbleVariant="light"
      overlay="linear-gradient(180deg, rgba(22,20,15,0.93) 0%, rgba(22,20,15,0.95) 100%)"
      style={{ padding: "100px 5% 90px" }}
    >
      <Reveal>
        <h2
          className="dg-contact-title"
          style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 800,
            fontSize: "clamp(70px,13vw,170px)",
            color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            lineHeight: 0.95, textAlign: "center", letterSpacing: "0.01em",
          }}
        >
          CONTACT
        </h2>
      </Reveal>

      <Reveal delay={150}>
        <ContactForm />
      </Reveal>
    </BgSection>
  );
}
