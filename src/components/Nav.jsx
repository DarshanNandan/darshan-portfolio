import { useState, useEffect } from "react";
import MagNavLink from "./ui/MagNavLink";
import { NAV, RED, INK, RESUME_PDF } from "../constants/data";

export default function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", f);
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "14px 5%" : "22px 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? INK : "rgba(22,20,15,0.0)",
        boxShadow: scrolled ? "0 6px 24px rgba(0,0,0,0.25)" : "none",
        borderBottom: scrolled ? `2px solid ${RED}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); onNav("home"); }}
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", textDecoration: "none" }}
      >
        Darshan<span style={{ color: RED }}>.</span>
      </a>

      <nav style={{ display: "flex", gap: 28 }} className="dg-nav-desktop">
        {NAV.map((item) => {
          const id = item.toLowerCase();
          const isActive = active === id;
          return (
            <MagNavLink
              key={item}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); onNav(id); }}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                background: isActive ? RED : "transparent",
                padding: "7px 14px", borderRadius: 999,
                textDecoration: "none", transition: "all 0.2s ease",
              }}
            >
              {item}
            </MagNavLink>
          );
        })}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="dg-nav-desktop"
          style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13.5,
            color: "#fff", background: "transparent", padding: "11px 24px",
            borderRadius: 999, textDecoration: "none",
            border: "2px solid rgba(255,255,255,0.5)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
        >
          View Resume
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="dg-nav-toggle"
          style={{
            display: "none", background: RED, border: "none",
            borderRadius: 8, width: 38, height: 36,
            fontSize: 18, color: "#fff", cursor: "pointer",
          }}
        >
          {open ? "×" : "≡"}
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: "76%", maxWidth: 300,
            background: INK, padding: "100px 30px",
            display: "flex", flexDirection: "column", gap: 24,
            boxShadow: "-10px 0 40px rgba(0,0,0,0.4)",
            borderLeft: `2px solid ${RED}`,
          }}
        >
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); onNav(item.toLowerCase()); setOpen(false); }}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 18, color: "#fff", textDecoration: "none" }}
            >
              {item}
            </a>
          ))}
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
              color: "#fff", background: RED, padding: "12px 20px",
              borderRadius: 999, textDecoration: "none", textAlign: "center", marginTop: 8,
            }}
          >
            View Resume
          </a>
        </div>
      )}
    </header>
  );
}
