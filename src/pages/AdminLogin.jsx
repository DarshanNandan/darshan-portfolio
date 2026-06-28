import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const ADMIN_USER = "darshan_admin";
const ADMIN_PASS = "Darshan@712!";
const AUTH_KEY = "admin_auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const userRef = useRef(null);

  // Clear any stale session and reset fields on every mount
  // Small delay ensures browser autofill is overridden after it fires
  useEffect(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setUsername("");
    setPassword("");
    setError("");
    const t = setTimeout(() => {
      setUsername("");
      setPassword("");
    }, 50);
    userRef.current?.focus();
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem(AUTH_KEY, "true");
        navigate("/admin/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError("Invalid credentials");
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
      }
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(192,57,43,0.15)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-140px",
          left: "-140px",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "rgba(192,57,43,0.15)",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: 16,
          padding: "40px 36px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
          animation: shaking ? "dgAdminShake 0.5s ease" : "none",
        }}
      >
        {/* Home button */}
        <Link
          to="/"
          title="Back to portfolio"
          aria-label="Back to home"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #2a2a2a",
            color: "#666",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(192,57,43,0.15)";
            e.currentTarget.style.borderColor = "#c0392b";
            e.currentTarget.style.color = "#c0392b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "#2a2a2a";
            e.currentTarget.style.color = "#666";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </Link>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(192,57,43,0.15)",
              border: "1px solid rgba(192,57,43,0.35)",
              borderRadius: 999,
              padding: "5px 14px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#e8705e",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#c0392b",
                animation: "dgAdminPulse 1.5s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            ADMIN ACCESS
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 24,
            color: "#fff",
            textAlign: "center",
            margin: "0 0 8px",
          }}
        >
          Sign in to dashboard
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#666",
            textAlign: "center",
            margin: "0 0 28px",
          }}
        >
          Restricted to portfolio owner only.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="admin-user"
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#888",
                marginBottom: 6,
                letterSpacing: "0.04em",
              }}
            >
              USERNAME
            </label>
            <input
              ref={userRef}
              id="admin-user"
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              placeholder="User Name"
              autoComplete="username"
              style={{
                display: "block",
                width: "100%",
                padding: "12px 14px",
                background: "#111",
                border: "1px solid #2a2a2a",
                borderRadius: 8,
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c0392b")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="admin-pw"
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#888",
                marginBottom: 6,
                letterSpacing: "0.04em",
              }}
            >
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-pw"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 44px 12px 14px",
                  background: "#111",
                  border: "1px solid #2a2a2a",
                  borderRadius: 8,
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#c0392b")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#555",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPw ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#e74c3c",
                marginBottom: 14,
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "13px",
              background: loading ? "#8e2419" : "#c0392b",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              border: "none",
              borderRadius: 8,
              cursor: loading ? "default" : "pointer",
              transition: "background 0.2s",
              marginBottom: 24,
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#a93226"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#c0392b"; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            {loading ? "Verifying…" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "#444",
            textAlign: "center",
            margin: 0,
          }}
        >
          Portfolio by Darshan Gowda N G · Private access only
        </p>
      </div>

      <style>{`
        @keyframes dgAdminPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes dgAdminShake {
          0%   { transform: translateX(0); }
          15%  { transform: translateX(-8px); }
          30%  { transform: translateX(8px); }
          45%  { transform: translateX(-6px); }
          60%  { transform: translateX(6px); }
          75%  { transform: translateX(-4px); }
          90%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
