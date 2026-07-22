/* quota-popup.js — Popup "Kuota Habis" yang tampil di TENGAH layar di semua
   halaman generator (skripsi, jurnal, makalah, presentasi, abstrak, parafrase,
   tugas, DoktrAI, tanya jawab) begitu kuota harian pengguna habis.

   Beda dengan notif.js (panel notifikasi lonceng), file ini menampilkan
   modal pop-up yang tidak bisa dilewatkan: animasi maskot kucing yang
   memegang pistol uang (cat-vip.png), lalu tombol besar di tengah untuk
   langsung menuju halaman upgrade.

   Cara pakai di halaman manapun (setelah account.js & sync-plan.js):
     <script src="quota-popup.js"></script>
   Lalu panggil:
     AkQuotaPopup.show(cek.pesan);
   Menggantikan showToast(cek.pesan) saat AkAccount.cekKuotaHalaman()/
   cekKuotaPesan() mengembalikan { ok:false }.
*/
const AkQuotaPopup = (function () {
  let injected = false;

  function injectOnce() {
    if (injected) return;
    injected = true;

    const style = document.createElement('style');
    style.textContent = `
      #akQuotaOverlay{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;
        background:rgba(17,24,39,.55);backdrop-filter:blur(3px);padding:20px;}
      #akQuotaOverlay.open{display:flex;animation:akQuotaFadeBg .25s ease;}
      @keyframes akQuotaFadeBg{from{opacity:0}to{opacity:1}}
      .ak-quota-card{position:relative;width:100%;max-width:360px;background:var(--white,#fff);
        border-radius:24px;padding:28px 24px 24px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.35);
        animation:akQuotaPop .35s cubic-bezier(.34,1.56,.64,1);overflow:hidden;}
      @keyframes akQuotaPop{from{transform:scale(.8) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
      .ak-quota-close{position:absolute;top:12px;right:12px;width:30px;height:30px;border-radius:50%;
        border:none;background:var(--gray-100,#F3F4F6);color:var(--gray-500,#6B7280);font-size:16px;
        cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;z-index:2;}
      .ak-quota-money-rain{position:absolute;top:0;left:0;right:0;height:100%;pointer-events:none;overflow:hidden;z-index:0;}
      .ak-quota-money-rain span{position:absolute;top:-10%;font-size:20px;opacity:0;
        animation:akMoneyFall 2.4s linear infinite;}
      @keyframes akMoneyFall{
        0%{transform:translateY(0) rotate(0deg);opacity:0;}
        8%{opacity:1;}
        100%{transform:translateY(320px) rotate(140deg);opacity:0;}
      }
      .ak-quota-mascot-wrap{position:relative;z-index:1;width:132px;height:132px;margin:4px auto 10px;
        border-radius:50%;background:linear-gradient(135deg,var(--brand-50,#EEF2FF),var(--gold,#F59E0B) 140%);
        display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(245,158,11,.35);}
      .ak-quota-mascot-wrap img{width:104%;height:auto;animation:akQuotaBounce 1.6s ease-in-out infinite;
        filter:drop-shadow(0 8px 14px rgba(0,0,0,.25));}
      @keyframes akQuotaBounce{
        0%,100%{transform:translateY(0) rotate(-2deg);}
        50%{transform:translateY(-10px) rotate(2deg);}
      }
      .ak-quota-title{position:relative;z-index:1;font-size:19px;font-weight:800;color:var(--gray-900,#111827);margin-bottom:6px;}
      .ak-quota-desc{position:relative;z-index:1;font-size:13.5px;line-height:1.55;color:var(--gray-600,#4B5563);margin-bottom:20px;}
      .ak-quota-btn-upgrade{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:8px;
        width:100%;padding:14px 18px;border:none;border-radius:14px;cursor:pointer;
        background:linear-gradient(135deg,var(--gold,#F59E0B),var(--orange,#EA580C));
        color:#fff;font-size:15px;font-weight:800;box-shadow:0 10px 20px rgba(234,88,12,.35);
        animation:akQuotaBtnPulse 1.8s ease-in-out infinite;}
      @keyframes akQuotaBtnPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
      .ak-quota-btn-later{position:relative;z-index:1;display:block;width:100%;text-align:center;margin-top:10px;
        background:none;border:none;font-size:13px;color:var(--gray-400,#9CA3AF);cursor:pointer;padding:6px;}
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.id = 'akQuotaOverlay';
    const moneyEmojis = ['💵','💰','💸','💵','💰'];
    const rain = moneyEmojis.map((e, i) =>
      `<span style="left:${8 + i * 20}%;animation-delay:${i * 0.35}s;">${e}</span>`
    ).join('');
    wrap.innerHTML = `
      <div class="ak-quota-card">
        <button type="button" class="ak-quota-close" onclick="AkQuotaPopup.close()">✕</button>
        <div class="ak-quota-money-rain">${rain}</div>
        <div class="ak-quota-mascot-wrap">
          <img src="cat-vip.png" alt="Maskot upgrade">
        </div>
        <div class="ak-quota-title">Kuota Kamu Sudah Habis!</div>
        <div class="ak-quota-desc" id="akQuotaDesc">Kuota harian kamu sudah terpakai semua.</div>
        <button type="button" class="ak-quota-btn-upgrade" onclick="AkQuotaPopup.goUpgrade()">
          ⚡ Upgrade Sekarang
        </button>
        <button type="button" class="ak-quota-btn-later" onclick="AkQuotaPopup.close()">Nanti dulu</button>
      </div>
    `;
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
  }

  function show(message) {
    injectOnce();
    const desc = document.getElementById('akQuotaDesc');
    if (desc && message) desc.textContent = message;
    document.getElementById('akQuotaOverlay').classList.add('open');
  }

  function close() {
    const el = document.getElementById('akQuotaOverlay');
    if (el) el.classList.remove('open');
  }

  function goUpgrade() {
    window.location.href = 'upgrade.html';
  }

  return { show, close, goUpgrade };
})();
