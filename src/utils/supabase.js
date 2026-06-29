const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY      = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SECRET_KEY    = import.meta.env.VITE_SUPABASE_SECRET_KEY;

const TABLE = `${SUPABASE_URL}/rest/v1/Visitors`;

/* ─── helpers ─────────────────────────────────────────── */

// darshangowdang2000@gmail.com → Gmail   priya@adobe.com → Adobe
export function extractCompany(email) {
  const domain = (email.split("@")[1] || "unknown").split(".")[0];
  return domain.charAt(0).toUpperCase() + domain.slice(1);
}

// visit_count → status label
export function getStatus(visitCount) {
  if (visitCount === 1) return "New";
  if (visitCount === 2) return "Returning";
  return "Recurring";
}

// ISO timestamp → "2 min ago" / "13h ago" / "3d ago"
export function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)  return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

/* ─── STORE visitor (called from gate) ──────────────────
   - Check if email exists using SECRET_KEY (SELECT allowed)
   - If yes  → PATCH visit_count / status / last_seen
   - If no   → INSERT new row with ANON_KEY               */
export async function storeVisitor(email) {
  const normalised = email.trim().toLowerCase();
  const company    = extractCompany(normalised);

  // Check existence
  const checkRes = await fetch(
    `${TABLE}?email=eq.${encodeURIComponent(normalised)}&select=id,visit_count`,
    {
      headers: {
        apikey:        SECRET_KEY,
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    }
  );

  if (!checkRes.ok) throw new Error("Failed to check visitor existence");
  const existing = await checkRes.json();

  if (existing.length > 0) {
    // Update existing visitor
    const newCount = existing[0].visit_count + 1;
    const patchRes = await fetch(
      `${TABLE}?email=eq.${encodeURIComponent(normalised)}`,
      {
        method:  "PATCH",
        headers: {
          apikey:          SECRET_KEY,
          Authorization:   `Bearer ${SECRET_KEY}`,
          "Content-Type":  "application/json",
          Prefer:          "return=minimal",
        },
        body: JSON.stringify({
          visit_count: newCount,
          status:      getStatus(newCount),
          last_seen:   new Date().toISOString(),
        }),
      }
    );
    if (!patchRes.ok) throw new Error("Failed to update visitor");
  } else {
    // Insert new visitor
    const insertRes = await fetch(TABLE, {
      method:  "POST",
      headers: {
        apikey:          ANON_KEY,
        Authorization:   `Bearer ${ANON_KEY}`,
        "Content-Type":  "application/json",
        Prefer:          "return=minimal",
      },
      body: JSON.stringify({
        email:       normalised,
        company,
        status:      "New",
        visit_count: 1,
        first_seen:  new Date().toISOString(),
        last_seen:   new Date().toISOString(),
      }),
    });
    if (!insertRes.ok) throw new Error("Failed to insert visitor");
  }
}

/* ─── FETCH visitors (admin dashboard, secret key) ────── */
export async function fetchVisitors(searchQuery = "") {
  let url = `${TABLE}?order=last_seen.desc`;
  if (searchQuery.trim()) {
    const q = encodeURIComponent(searchQuery.trim());
    url += `&or=(email.ilike.*${q}*,company.ilike.*${q}*)`;
  }
  const res = await fetch(url, {
    headers: {
      "apikey":        SECRET_KEY,
      "Authorization": `Bearer ${SECRET_KEY}`,
      "Content-Type":  "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${body}`);
  }
  return res.json();
}

/* ─── EXPORT CSV ─────────────────────────────────────── */
export function exportCSV(visitors) {
  const headers = ["Email", "Company", "Status", "Visit Count", "First Seen", "Last Seen"];
  const rows = visitors.map((v) => [
    v.email,
    v.company,
    v.status,
    v.visit_count,
    new Date(v.first_seen).toLocaleString(),
    new Date(v.last_seen).toLocaleString(),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "visitors.csv";
  a.click();
  URL.revokeObjectURL(url);
}
