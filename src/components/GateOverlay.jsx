import { useState, useEffect, useRef } from "react";
import { storeVisitor } from "../utils/supabase";

const BRAND       = "#c0392b";
const SESSION_KEY = "dg_gate_passed";

export default function GateOverlay({ onEnter }) {
  const [email,      setEmail]      = useState("");
  const [error,      setError]      = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fading,     setFading]     = useState(false);
  const [visible,    setVisible]    = useState(true);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid work email.");
      inputRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await storeVisitor(email);
      sessionStorage.setItem(SESSION_KEY, "1");
      setFading(true);
      setTimeout(() => { setVisible(false); onEnter(); }, 400);
    } catch (err) {
      console.error("[Gate] Supabase error:", err);
      // Still let them in — don't block the portfolio on a DB error
      sessionStorage.setItem(SESSION_KEY, "1");
      setFading(true);
      setTimeout(() => { setVisible(false); onEnter(); }, 400);
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        opacity: fading ? 0 : 1, transition: "opacity 0.4s ease",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: 420,
          background: "#fff", borderRadius: 16,
          padding: "44px 40px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          animation: "dgGateFadeIn 0.3s ease forwards",
          boxSizing: "border-box",
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: BRAND, display: "flex",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.95)" />
            <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
              stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22,
          color: "#16140F", textAlign: "center", margin: "0 0 10px",
        }}>
          Welcome to my portfolio
        </h1>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6b7280",
          textAlign: "center", margin: "0 0 28px", lineHeight: 1.6,
        }}>
          Enter your work email to continue. I'd love to know who's stopping by.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="gate-email" style={{
            display: "block", fontFamily: "'Inter', sans-serif",
            fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6,
          }}>
            Work email
          </label>
          <input
            ref={inputRef}
            id="gate-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="you@company.com"
            autoComplete="email"
            style={{
              display: "block", width: "100%", padding: "11px 14px",
              fontSize: 14, fontFamily: "'Inter', sans-serif",
              border: error ? "1.5px solid #ef4444" : "1.5px solid #d1d5db",
              borderRadius: 8, outline: "none", boxSizing: "border-box",
              marginBottom: 6, transition: "border-color 0.2s ease",
              color: "#16140F", background: "#fff",
            }}
            onFocus={(e) => { if (!error) e.target.style.borderColor = BRAND; }}
            onBlur={(e)  => { if (!error) e.target.style.borderColor = "#d1d5db"; }}
          />

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: "#ef4444", margin: "0 0 16px", minHeight: 18,
          }}>
            {error}
          </p>

          <button
            type="submit"
            disabled={submitting}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, width: "100%", padding: "13px",
              background: submitting ? "#e88078" : BRAND,
              color: "#fff", fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: 15, border: "none",
              borderRadius: 8, cursor: submitting ? "default" : "pointer",
              transition: "background 0.2s ease", marginBottom: 16,
            }}
            onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = "#a93226"; }}
            onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = BRAND; }}
          >
            {submitting ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ animation: "dgSpin 0.8s linear infinite" }} aria-hidden="true">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Saving…
              </>
            ) : "Continue →"}
          </button>
        </form>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 12,
          color: "#9ca3af", textAlign: "center", margin: 0,
        }}>
          Your info is never stored or shared.
        </p>
      </div>

      <style>{`
        @keyframes dgGateFadeIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dgSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
