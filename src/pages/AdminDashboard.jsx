import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVisitors, exportCSV, timeAgo } from "../utils/supabase";

const AUTH_KEY  = "admin_auth";
const PAGE_SIZE = 10;

/* ─── helpers ─────────────────────────────────────────── */
function getInitials(email) {
  const local = (email || "").split("@")[0];
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return local.slice(0, 2).toUpperCase();
}

function statusColor(status) {
  if (status === "New")       return "#22c55e";
  if (status === "Returning") return "#3b82f6";
  return "#f59e0b";
}

function statusBg(status) {
  if (status === "New")       return "rgba(34,197,94,0.12)";
  if (status === "Returning") return "rgba(59,130,246,0.12)";
  return "rgba(245,158,11,0.12)";
}

function fmtDate(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/* ─── stat card ──────────────────────────────────────── */
function StatCard({ label, value, iconBg, icon }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e8e8e8", borderRadius: 10,
      padding: "20px 22px", display: "flex", alignItems: "center",
      gap: 16, flex: 1, minWidth: 160,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 700,
          fontSize: 24, color: "#111", lineHeight: 1,
        }}>
          {value}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#888", marginTop: 4 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [visitors,  setVisitors]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search,    setSearch]    = useState("");
  const [query,     setQuery]     = useState("");   // debounced search
  const [page,      setPage]      = useState(1);

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) !== "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  // Fetch data
  const loadData = useCallback(async (q = "") => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await fetchVisitors(q);
      setVisitors(Array.isArray(data) ? data : []);
    } catch (err) {
      setLoadError("⚠ Failed to connect to Supabase. Check your API keys.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + auto-refresh every 60s
  useEffect(() => {
    loadData(query);
    const interval = setInterval(() => loadData(query), 60000);
    return () => clearInterval(interval);
  }, [loadData, query]);

  // Debounce search input → query
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    navigate("/admin", { replace: true });
  };

  // Stats
  const totalVisitors  = visitors.length;
  const emailsCaptured = visitors.length;
  const companies      = useMemo(() => new Set(visitors.map((v) => v.company)).size, [visitors]);
  const captureRate    = totalVisitors > 0 ? "100%" : "0%";

  // Pagination
  const totalPages  = Math.max(1, Math.ceil(visitors.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows    = visitors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top bar ── */}
      <header style={{
        background: "#c0392b", padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff" }}>
            Darshan
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            background: "rgba(255,255,255,0.15)", color: "#fff",
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
            padding: "4px 12px", borderRadius: 999,
          }}>Admin</span>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 12, color: "#c0392b",
          }}>DG</div>
          <button
            onClick={handleLogout} title="Logout" aria-label="Logout"
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6,
              width: 32, height: 32, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>

        {/* Page title */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: "#111", margin: 0 }}>
            Visitor Overview
          </h2>
          <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
            All visitors who have accessed the portfolio gate.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <StatCard label="Total Visitors" value={loading ? "…" : totalVisitors} iconBg="#fde8e6"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>}
          />
          <StatCard label="Emails Captured" value={loading ? "…" : emailsCaptured} iconBg="rgba(34,197,94,0.12)"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>}
          />
          <StatCard label="Companies" value={loading ? "…" : companies} iconBg="rgba(59,130,246,0.12)"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>}
          />
          <StatCard label="Capture Rate" value={loading ? "…" : captureRate} iconBg="rgba(245,158,11,0.12)"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>}
          />
        </div>

        {/* Table card */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden" }}>

          {/* Toolbar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 20px", borderBottom: "1px solid #f0f0f0", gap: 12, flexWrap: "wrap",
          }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: "#111", margin: 0 }}>
              Visitor Emails
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
                  aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search email or company…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                    border: "1px solid #e0e0e0", borderRadius: 7, fontSize: 13,
                    fontFamily: "'Inter', sans-serif", outline: "none",
                    color: "#333", width: 220, background: "#fafafa",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c0392b")}
                  onBlur={(e)  => (e.target.style.borderColor = "#e0e0e0")}
                />
              </div>
              {/* Refresh */}
              <button
                onClick={() => loadData(query)}
                title="Refresh"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 34, height: 34, border: "1px solid #e0e0e0", borderRadius: 7,
                  background: "transparent", cursor: "pointer", color: "#555", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c0392b"; e.currentTarget.style.color = "#c0392b"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#555"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                </svg>
              </button>
              {/* Export CSV */}
              <button
                onClick={() => exportCSV(visitors)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", background: "#c0392b", color: "#fff",
                  border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600,
                  fontFamily: "'Inter', sans-serif", cursor: "pointer",
                  transition: "background 0.2s", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#a93226")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#c0392b")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Error banner */}
          {loadError && (
            <div style={{ padding: "14px 20px", background: "#fff5f5", color: "#c0392b", fontSize: 13, borderBottom: "1px solid #fde8e6" }}>
              ⚠ {loadError}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "#aaa", fontSize: 14 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0392b"
                strokeWidth="2.5" strokeLinecap="round"
                style={{ animation: "dgSpin 0.8s linear infinite", marginBottom: 8 }} aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              <div>Loading visitors…</div>
            </div>
          )}

          {/* Empty state */}
          {!loading && visitors.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#aaa", fontSize: 14 }}>
              No visitors yet. Share your portfolio to get started!
            </div>
          )}

          {/* Table */}
          {!loading && visitors.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
                    {["Email", "Company", "Status", "Visited", "Action"].map((h) => (
                      <th key={h} style={{
                        padding: "11px 16px", textAlign: "left",
                        fontFamily: "'Inter', sans-serif", fontWeight: 600,
                        fontSize: 12, color: "#888", letterSpacing: "0.04em", whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((v, i) => {
                    const initials = getInitials(v.email);
                    const dot      = statusColor(v.status);
                    const sBg      = statusBg(v.status);
                    return (
                      <tr key={v.id || v.email}
                        style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f5f5f5" }}>

                        {/* Email */}
                        <td style={{ padding: "13px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: "#fde8e6", color: "#c0392b",
                              fontWeight: 700, fontSize: 11, flexShrink: 0,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: "'Poppins', sans-serif",
                            }}>{initials}</div>
                            <span style={{ color: "#222", fontWeight: 500 }}>{v.email}</span>
                          </div>
                        </td>

                        {/* Company */}
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{
                            background: "#f0f0f0", color: "#555",
                            borderRadius: 999, padding: "3px 10px",
                            fontSize: 12, fontWeight: 500,
                          }}>{v.company}</span>
                        </td>

                        {/* Status */}
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: sBg, color: dot,
                            borderRadius: 999, padding: "3px 10px",
                            fontSize: 12, fontWeight: 600,
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, display: "inline-block" }} />
                            {v.status}
                          </span>
                        </td>

                        {/* Visited */}
                        <td style={{ padding: "13px 16px", color: "#777", whiteSpace: "nowrap" }}>
                          {timeAgo(v.last_seen)}
                        </td>

                        {/* Action */}
                        <td style={{ padding: "13px 16px" }}>
                          <button
                            onClick={() => alert(
                              `Email: ${v.email}\nCompany: ${v.company}\nStatus: ${v.status}\nVisit count: ${v.visit_count}\nFirst seen: ${fmtDate(v.first_seen)}\nLast seen: ${fmtDate(v.last_seen)}`
                            )}
                            style={{
                              padding: "5px 14px", background: "transparent",
                              border: "1px solid #e0e0e0", borderRadius: 6,
                              fontSize: 12, fontWeight: 600, color: "#555",
                              cursor: "pointer", transition: "all 0.15s",
                              fontFamily: "'Inter', sans-serif",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c0392b"; e.currentTarget.style.color = "#c0392b"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#555"; }}
                          >View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px", borderTop: "1px solid #f0f0f0", flexWrap: "wrap", gap: 10,
            }}>
              <span style={{ fontSize: 12, color: "#888" }}>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, visitors.length)} of {visitors.length}
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                  style={{ padding: "5px 12px", border: "1px solid #e0e0e0", borderRadius: 6, background: "transparent", cursor: currentPage === 1 ? "default" : "pointer", color: currentPage === 1 ? "#ccc" : "#555", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button key={pg} onClick={() => setPage(pg)} style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: pg === currentPage ? "none" : "1px solid #e0e0e0",
                    background: pg === currentPage ? "#c0392b" : "transparent",
                    color: pg === currentPage ? "#fff" : "#555",
                    fontSize: 12, fontWeight: pg === currentPage ? 700 : 400,
                    cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  }}>{pg}</button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  style={{ padding: "5px 12px", border: "1px solid #e0e0e0", borderRadius: 6, background: "transparent", cursor: currentPage === totalPages ? "default" : "pointer", color: currentPage === totalPages ? "#ccc" : "#555", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes dgSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
