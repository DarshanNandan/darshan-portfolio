import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import { INK, RED } from "./constants/data";

const SECTIONS = ["home","about","expertise","skills","experience","projects","certifications","contact"];

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav active={active} onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <Expertise />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />

      {/* Footer */}
      <footer style={{
        background: INK,
        borderTop: `2px solid ${RED}`,
        padding: "40px 5%",
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "center", gap: 16,
      }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
          Darshan Gowda N G
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          Senior Java Full Stack Engineer · Bengaluru, India
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          Built with React + Vite
        </span>
      </footer>
    </div>
  );
}
