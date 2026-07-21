// /api/generate.js
// Satu endpoint backend yang dipakai semua fitur (parafrase, PPT, jurnal, DoktrAI, skripsi, dll)
// API key disimpan aman di Environment Variables Vercel, TIDAK pernah terlihat di browser.
//
// PENTING (keamanan): endpoint ini WAJIB dipanggil dengan header
// Authorization: Bearer <token_login_supabase>. Tanpa token yang valid,
// permintaan ditolak (401) SEBELUM sampai ke Anthropic API sama sekali —
// supaya endpoint ini tidak bisa dipanggil orang luar/bot tanpa akun,
// yang bisa menghabiskan saldo API tanpa terlacak siapa pelakunya.
// Butuh SUPABASE_SERVICE_ROLE_KEY di Environment Variables Vercel.

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dkpztybbcvvzatgwhano.supabase.co";

const GAYA_PENULISAN =
  "Tulis jawabanmu dalam gaya percakapan biasa yang rapi dan enak dibaca, seperti orang menjelaskan langsung. ATURAN PENTING: JANGAN gunakan tanda pagar (#, ##, ###) untuk judul/heading apapun. JANGAN membuat daftar bernomor atau bullet point kecuali benar-benar dibutuhkan (misal langkah-langkah teknis yang wajib berurutan). JANGAN gunakan format markdown yang berlebihan. Tulis dalam bentuk paragraf mengalir dengan bahasa Indonesia yang natural, hangat, dan mudah dipahami, seperti sedang berbicara langsung ke orangnya.";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // --- 1) Wajib login: cek header Authorization ---
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Wajib login untuk menggunakan fitur AI." });
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

    // --- 2) Verifikasi token benar-benar valid & ambil identitas usernya ---
    const { data: userData, error: userErr } = await sbAdmin.auth.getUser(
      token
    );
    if (userErr || !userData || !userData.user) {
      return res
        .status(401)
        .json({
          error:
            "Sesi login tidak valid atau sudah kedaluwarsa. Silakan login ulang.",
        });
    }
    const userId = userData.user.id;

    // --- 3) Tolak akun yang sedang diblokir admin ---
    const { data: profile } = await sbAdmin
      .from("profiles")
      .select("blocked")
      .eq("id", userId)
      .maybeSingle();
    if (profile && profile.blocked) {
      return res
        .status(403)
        .json({
          error:
            "Akun Anda sedang diblokir. Hubungi admin untuk informasi lebih lanjut.",
        });
    }

    const { prompt, task, messages, system } = req.body || {};

    if (!prompt && !messages) {
      return res
        .status(400)
        .json({ error: "Prompt atau messages wajib diisi" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "API key belum dikonfigurasi di server" });
    }

    const finalSystem = system
      ? `${system}\n\n${GAYA_PENULISAN}`
      : GAYA_PENULISAN;

    const body = {
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      system: finalSystem,
      messages:
        messages && messages.length
          ? messages
          : [{ role: "user", content: prompt }],
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({
          error:
            (data.error && data.error.message) ||
            "Terjadi kesalahan dari Anthropic API",
        });
    }

    const resultText =
      (data.content && data.content[0] && data.content[0].text) || "";
    return res.status(200).json({ text: resultText, task, raw: data });
  } catch (err) {
    console.error("Generate API error:", err);
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan server: " + err.message });
  }
};
