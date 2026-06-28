import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Nav from "./components/Nav";
import GateOverlay from "./components/GateOverlay";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { INK, RED } from "./constants/data";

const SECTIONS = ["home","about","expertise","skills","experience","projects","certifications","contact"];
const SESSION_KEY = "dg_gate_passed";
const VISITORS_KEY = "portfolio_visitors";

function useVisitorCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITORS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setCount(Array.isArray(list) ? list.length : 0);
    } catch (_) {
      setCount(0);
    }
  }, []);
  return count;
}

function Portfolio() {
  const [active, setActive] = useState("home");
  const [gateVisible, setGateVisible] = useState(
    () => sessionStorage.getItem(SESSION_KEY) !== "1"
  );
  const visitorCount = useVisitorCount();

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
      {gateVisible && <GateOverlay onEnter={() => setGateVisible(false)} />}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
            Darshan Gowda N G
          </span>
          {/* Visitor counter link */}
          <Link
            to="/admin"
            title="View visitor dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
              width: "fit-content",
              padding: "3px 8px 3px 4px",
              borderRadius: 6,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(192,57,43,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="#c0392b" strokeWidth="2"/>
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#c0392b" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
              {visitorCount} {visitorCount === 1 ? "visitor" : "visitors"}
            </span>
          </Link>
        </div>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
