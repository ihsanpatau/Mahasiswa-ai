// /api/sync-plan.js
// Endpoint server untuk membaca plan/plan_expiry TERKINI milik user yang login,
// sekaligus menegakkan masa aktif (turunkan ke 'gratis' kalau sudah lewat expiry).
//
// PENTING (keamanan): semua tulis ke kolom plan/plan_expiry di tabel 'profiles'
// HARUS lewat sini (pakai SUPABASE_SERVICE_ROLE_KEY), BUKAN langsung dari browser
// pakai anon key. Kalau ditulis langsung dari browser, RLS yang mengizinkan user
// update baris profilnya sendiri bisa disalahgunakan user untuk menaikkan
// plan-nya sendiri ke paket berbayar tanpa bayar. Endpoint ini hanya PERNAH
// menurunkan ke 'gratis' (kalau expired) — tidak pernah menaikkan plan apapun.
//
// Butuh SUPABASE_SERVICE_ROLE_KEY di Environment Variables Vercel (sudah ada,
// dipakai juga oleh midtrans-create-transaction.js & midtrans-notification.js).

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dkpztybbcvvzatgwhano.supabase.co";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: "Wajib login." });
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      return res
        .status(500)
        .json({
          error:
            "SUPABASE_SERVICE_ROLE_KEY belum diset di Environment Variables Vercel",
        });
    }
    const sbAdmin = createClient(SUPABASE_URL, serviceRoleKey);

    const { data: userData, error: userErr } = await sbAdmin.auth.getUser(
      token
    );
    if (userErr || !userData || !userData.user) {
      return res
        .status(401)
        .json({ error: "Sesi login tidak valid atau sudah kedaluwarsa." });
    }
    const userId = userData.user.id;

    const { data: profile, error: profErr } = await sbAdmin
      .from("profiles")
      .select("plan, plan_expiry, blocked")
      .eq("id", userId)
      .maybeSingle();

    if (profErr || !profile) {
      return res.status(404).json({ error: "Profil tidak ditemukan." });
    }

    let plan = (profile.plan || "gratis").toLowerCase();
    let planExpiry = profile.plan_expiry || null;

    // --- Tegakkan masa aktif (SATU-SATUNYA aksi tulis yang diizinkan di sini,
    // dan cuma boleh menurunkan ke 'gratis', tidak pernah menaikkan plan) ---
    if (plan !== "gratis" && planExpiry) {
      const expTime = new Date(planExpiry).getTime();
      if (!isNaN(expTime) && Date.now() > expTime) {
        plan = "gratis";
        planExpiry = null;
        await sbAdmin
          .from("profiles")
          .update({ plan: "gratis", plan_expiry: null })
          .eq("id", userId);
      }
    }

    return res.status(200).json({
      plan,
      plan_expiry: planExpiry,
      blocked: !!profile.blocked,
    });
  } catch (err) {
    console.error("sync-plan API error:", err);
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan server: " + err.message });
  }
};
