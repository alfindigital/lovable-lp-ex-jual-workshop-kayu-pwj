import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const STYLES = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;scroll-padding-top:70px}
body{font-family:'Source Sans 3',system-ui,-apple-system,sans-serif;background:#0f0a08;color:#F5F0EB;line-height:1.65;font-weight:400;overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:'Playfair Display',Georgia,serif;font-weight:700;line-height:1.2;color:#F5F0EB;letter-spacing:-.5px}
h2{font-size:clamp(1.75rem,3.6vw,2.6rem);margin-bottom:.5rem;text-align:center}
a{color:#C8860A;text-decoration:none;transition:color .2s}
a:hover{color:#e0a030}
:focus-visible{outline:2px solid #C8860A;outline-offset:3px;border-radius:3px}
img{max-width:100%;height:auto;display:block}
.container{max-width:1100px;margin:0 auto;padding:0 1.25rem}
.lead{text-align:center;color:#A09080;max-width:680px;margin:.5rem auto 2.8rem;font-size:1.05rem}

/* NAV */
.topnav{position:fixed;top:0;left:0;right:0;z-index:80;background:transparent;transition:background .3s,border-color .3s,backdrop-filter .3s;border-bottom:1px solid transparent}
.topnav.scrolled{background:rgba(15,10,8,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom-color:#3a2a20}
.topnav .inner{max-width:1100px;margin:0 auto;padding:.85rem 1.25rem;display:flex;justify-content:space-between;align-items:center;gap:1rem}
.brand{font-family:'Playfair Display',serif;font-weight:700;font-size:1.05rem;color:#F5F0EB}
.brand span{color:#C8860A}
.navlinks{list-style:none;display:flex;gap:1.6rem;align-items:center}
.navlinks a{color:#E5DBC8;font-size:.92rem;font-weight:600}
.navlinks a:hover{color:#C8860A}
.nav-cta{background:#C8860A;color:#0f0a08!important;padding:.6rem 1.1rem;border-radius:4px;font-weight:700;font-size:.88rem;min-height:44px;display:inline-flex;align-items:center;transition:background .2s,transform .2s}
.nav-cta:hover{background:#e0a030;color:#0f0a08!important;transform:translateY(-1px)}
.hamburger{display:none;background:none;border:none;color:#F5F0EB;cursor:pointer;padding:.5rem;min-width:44px;min-height:44px}
.hamburger svg{width:26px;height:26px}
@media(max-width:768px){
  .navlinks{position:fixed;top:64px;left:0;right:0;background:rgba(15,10,8,.98);backdrop-filter:blur(14px);flex-direction:column;gap:0;padding:1rem 0;border-bottom:1px solid #3a2a20;transform:translateY(-120%);transition:transform .3s ease;align-items:stretch}
  .navlinks.open{transform:translateY(0)}
  .navlinks li{border-top:1px solid #221814}
  .navlinks a{display:block;padding:1rem 1.5rem;font-size:1rem}
  .navlinks .nav-cta{margin:.6rem 1.5rem;justify-content:center}
  .hamburger{display:inline-flex;align-items:center;justify-content:center}
  .topnav{background:rgba(15,10,8,.92);backdrop-filter:blur(14px);border-bottom-color:#3a2a20}
}

/* HERO */
.hero{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;padding:7rem 1.25rem 4rem;overflow:hidden;background:radial-gradient(ellipse at 30% 25%,#3a1f12 0%,transparent 55%),radial-gradient(ellipse at 75% 80%,rgba(139,69,19,.35),transparent 60%),linear-gradient(160deg,#2C1810 0%,#1a0f0a 55%,#0f0a06 100%)}
.hero::before{content:"";position:absolute;inset:-50%;background-image:repeating-linear-gradient(45deg,rgba(200,134,10,.04) 0,rgba(200,134,10,.04) 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,rgba(245,240,235,.02) 0,rgba(245,240,235,.02) 1px,transparent 1px,transparent 18px);animation:grain 18s linear infinite;pointer-events:none}
@keyframes grain{0%{transform:translate(0,0)}100%{transform:translate(8%,8%)}}
.hero::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 30%,rgba(15,10,8,.6) 100%);pointer-events:none}
.hero-inner{position:relative;z-index:2;max-width:880px;text-align:center}
.eyebrow{display:inline-block;font-size:.74rem;letter-spacing:3px;text-transform:uppercase;color:#C8860A;font-weight:700;margin-bottom:1.4rem;padding:.45rem 1.1rem;border:1px solid #C8860A;border-radius:2px}
.hero h1{font-size:clamp(2.2rem,5.8vw,4.2rem);margin-bottom:1.2rem;font-weight:900}
.hero .sub{font-size:clamp(1rem,1.9vw,1.18rem);color:#C8B8A8;margin-bottom:2rem;font-weight:300;max-width:720px;margin-left:auto;margin-right:auto}
.price-pill{display:inline-block;background:linear-gradient(135deg,#C8860A,#8B4513);color:#0f0a08;font-weight:800;font-size:1.1rem;padding:.85rem 1.8rem;border-radius:50px;margin-bottom:2.2rem;box-shadow:0 12px 38px -10px rgba(200,134,10,.55);letter-spacing:.5px}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;padding:1rem 1.8rem;font-weight:700;font-size:1rem;border-radius:4px;border:2px solid transparent;cursor:pointer;text-decoration:none;min-height:48px;transition:transform .2s,box-shadow .2s,background .2s,color .2s,border-color .2s;font-family:inherit}
.btn-primary{background:#C8860A;color:#0f0a08;box-shadow:0 8px 24px -8px rgba(200,134,10,.55)}
.btn-primary:hover{background:#e0a030;color:#0f0a08;transform:translateY(-2px) scale(1.02);box-shadow:0 14px 32px -8px rgba(200,134,10,.7)}
.btn-secondary{background:transparent;color:#F5F0EB;border-color:#5a4030}
.btn-secondary:hover{border-color:#C8860A;color:#C8860A;transform:translateY(-2px)}
.btn svg{width:18px;height:18px;flex-shrink:0}
.scroll-arrow{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);color:#C8860A;animation:bounce 2.2s ease infinite;z-index:2}
.scroll-arrow svg{width:28px;height:28px}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(10px)}}

/* TRUST BAR */
.trust-bar{background:#13100d;border-top:1px solid #3a2a20;border-bottom:1px solid #3a2a20;padding:1.2rem 1.25rem}
.trust-bar .grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center}
.trust-item{display:flex;align-items:center;justify-content:center;gap:.55rem;color:#E5DBC8;font-weight:600;font-size:.92rem}
.trust-item svg{width:18px;height:18px;color:#C8860A;flex-shrink:0}
@media(max-width:768px){.trust-bar .grid{grid-template-columns:repeat(2,1fr);gap:.85rem}.trust-item{font-size:.85rem}}

/* BREADCRUMB */
.breadcrumb{padding:1.5rem 1.25rem .5rem;font-size:.85rem;color:#8e7d6c}
.breadcrumb ol{max-width:1100px;margin:0 auto;list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;align-items:center}
.breadcrumb li{display:flex;align-items:center;gap:.4rem}
.breadcrumb li::after{content:"›";color:#5a4030}
.breadcrumb li:last-child::after{content:""}
.breadcrumb a{color:#A09080}
.breadcrumb a:hover{color:#C8860A}
.breadcrumb [aria-current]{color:#C8860A;font-weight:600}

/* SECTIONS */
section{padding:4.5rem 0;border-top:1px solid #1a1210}
section:first-of-type{border-top:none}

/* USP CARDS */
.cards-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
.card{background:linear-gradient(180deg,rgba(26,18,16,.85),rgba(19,16,13,.85));backdrop-filter:blur(8px);border:1px solid #3a2a20;border-radius:8px;padding:2rem 1.6rem;position:relative;overflow:hidden;transition:transform .25s,border-color .25s,box-shadow .25s}
.card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#C8860A,transparent);opacity:.6}
.card:hover{transform:translateY(-4px);border-color:#C8860A;box-shadow:0 20px 40px -20px rgba(200,134,10,.35)}
.card .icon{width:56px;height:56px;border-radius:50%;background:rgba(200,134,10,.12);border:1px solid #C8860A;display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem}
.card .icon svg{width:26px;height:26px;color:#C8860A}
.card h3{font-size:1.35rem;margin-bottom:.6rem}
.card p{color:#A09080;font-size:.97rem}
.card .save{display:block;margin-top:.85rem;font-size:.82rem;color:#C8860A;font-weight:700;letter-spacing:.5px;text-transform:uppercase}

/* SPECS */
.specs{background:#13100d;border:1px solid #3a2a20;border-radius:8px;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;max-width:820px;margin:0 auto}
.specs > div{padding:1.05rem 1.4rem;border-bottom:1px solid #221814;font-size:.97rem}
.specs .label{color:#A09080;font-weight:600;background:#1a1210}
.specs .val{color:#F5F0EB;font-weight:600}
.specs > div:nth-last-child(-n+2){border-bottom:none}
@media(max-width:560px){.specs{grid-template-columns:1fr 1.3fr}.specs > div{padding:.85rem 1rem;font-size:.9rem}}

/* PERSONA */
.cards-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;max-width:1000px;margin:0 auto}
.persona{background:#13100d;border:1px solid #3a2a20;border-left:3px solid #C8860A;border-radius:6px;padding:1.5rem 1.4rem;transition:transform .25s,border-color .25s}
.persona:hover{transform:translateY(-3px);border-color:#C8860A}
.persona .picon{width:42px;height:42px;color:#C8860A;margin-bottom:.85rem}
.persona h3{font-size:1.08rem;font-family:'Source Sans 3',sans-serif;font-weight:700;margin-bottom:.4rem;color:#F5F0EB;letter-spacing:0}
.persona p{color:#A09080;font-size:.92rem;line-height:1.55}

/* FAQ */
.faq-wrap{max-width:820px;margin:0 auto}
details{background:#13100d;border:1px solid #3a2a20;border-radius:6px;margin-bottom:.85rem;padding:1.1rem 1.4rem;transition:border-color .2s}
details[open]{border-color:#C8860A}
summary{font-weight:700;color:#F5F0EB;font-size:1.02rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:1rem;cursor:pointer;min-height:32px}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";color:#C8860A;font-size:1.6rem;font-weight:300;transition:transform .25s;line-height:1}
details[open] summary::after{transform:rotate(45deg)}
details p{margin-top:.9rem;color:#A09080;font-size:.97rem;line-height:1.7}

/* LOKASI */
.map-wrap{position:relative;border-radius:8px;overflow:hidden;border:1px solid #3a2a20;height:400px;background:#1a1210;max-width:1000px;margin:0 auto}
.map-wrap iframe{width:100%;height:100%;border:0;filter:grayscale(.15) contrast(1.05)}
.address-box{margin:1.5rem auto 0;max-width:1000px;padding:1.4rem 1.6rem;background:#13100d;border:1px solid #3a2a20;border-radius:6px;text-align:center}
.address-box p{margin:.25rem 0;color:#F5F0EB}
.address-box .small{color:#A09080;font-size:.92rem;font-style:italic;margin-top:.7rem}
.coords{font-family:ui-monospace,monospace;font-size:.85rem;color:#8e7d6c;margin-top:.4rem!important}

/* FINAL CTA */
.final-cta{background:linear-gradient(135deg,#C8860A 0%,#8B4513 100%);padding:4.5rem 1.5rem;text-align:center;color:#0f0a08;border-radius:0;margin:0 -100vw;padding-left:calc(100vw + 1.5rem);padding-right:calc(100vw + 1.5rem)}
.final-cta-inner{max-width:720px;margin:0 auto}
.final-cta h2{color:#0f0a08;margin-bottom:.7rem;font-size:clamp(1.8rem,3.8vw,2.6rem)}
.final-cta .body{color:rgba(15,10,8,.85);font-size:1.05rem;margin-bottom:1.8rem;font-weight:500}
.final-cta .btn-dark{background:#0f0a08;color:#C8860A;font-size:1.1rem;padding:1.15rem 2.2rem;border:2px solid #0f0a08;box-shadow:0 12px 32px -8px rgba(15,10,8,.5)}
.final-cta .btn-dark:hover{background:#1a1210;color:#e0a030;transform:translateY(-2px) scale(1.02)}
.final-cta .phone{display:block;margin-top:1.4rem;color:#0f0a08;font-size:1.2rem;font-weight:800;letter-spacing:1.5px;font-family:ui-monospace,monospace}
.final-cta .sub{margin-top:.8rem;color:rgba(15,10,8,.75);font-size:.92rem;font-weight:600}

/* FOOTER */
footer{padding:2.5rem 1.25rem 5.5rem;text-align:center;color:#6e5d4f;font-size:.88rem;border-top:1px solid #1a1210}
footer .links{margin-top:.85rem;display:flex;justify-content:center;gap:1.2rem;flex-wrap:wrap}
footer .links a{color:#8e7d6c;font-size:.85rem}
footer .links a:hover{color:#C8860A}

/* STICKY MOBILE BAR */
.mobile-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:70;background:rgba(15,10,8,.97);backdrop-filter:blur(12px);border-top:1px solid #3a2a20;padding:.7rem 1rem;align-items:center;justify-content:space-between;gap:.8rem}
.mobile-bar .info{flex:1;min-width:0}
.mobile-bar .info strong{display:block;color:#F5F0EB;font-size:.88rem;font-weight:700;line-height:1.2}
.mobile-bar .info span{display:block;color:#C8860A;font-size:.78rem;font-weight:600}
.mobile-bar .btn{padding:.7rem 1.1rem;font-size:.88rem;min-height:44px;flex-shrink:0}
@media(max-width:768px){.mobile-bar{display:flex}footer{padding-bottom:6rem}}

/* WA FLOAT (desktop only) */
.wa-float{position:fixed;bottom:1.5rem;right:1.5rem;z-index:60;width:60px;height:60px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -5px rgba(37,211,102,.5);animation:pulse 2.4s infinite}
.wa-float svg{width:32px;height:32px;color:#fff}
@keyframes pulse{0%,100%{box-shadow:0 10px 30px -5px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.5)}50%{box-shadow:0 10px 30px -5px rgba(37,211,102,.5),0 0 0 14px rgba(37,211,102,0)}}
@media(max-width:768px){.wa-float{display:none}}

/* ANIMATIONS */
.fade-in{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease}
.fade-in.visible{opacity:1;transform:translateY(0)}
.hero-inner > *{opacity:0;animation:heroFade .8s ease forwards}
.hero-inner > *:nth-child(1){animation-delay:.05s}
.hero-inner > *:nth-child(2){animation-delay:.2s}
.hero-inner > *:nth-child(3){animation-delay:.35s}
.hero-inner > *:nth-child(4){animation-delay:.5s}
.hero-inner > *:nth-child(5){animation-delay:.65s}
@keyframes heroFade{to{opacity:1;transform:translateY(0)}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.fade-in{opacity:1;transform:none}}

@media(max-width:560px){
  section{padding:3.5rem 0}
  .hero{padding:6rem 1rem 4rem}
  .container{padding:0 1rem}
  .btn{padding:.95rem 1.4rem;font-size:.95rem}
}
`;
const BODY_HTML = `<header class="topnav" id="topnav">
  <div class="inner">
    <a href="#top" class="brand" aria-label="Workshop Purworejo - Beranda">Workshop <span>Purworejo</span></a>
    <button class="hamburger" id="hamburger" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="navlinks">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
    <ul class="navlinks" id="navlinks">
      <li><a href="#spesifikasi">Spesifikasi</a></li>
      <li><a href="#lokasi">Lokasi</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Halo,%20saya%20tertarik%20dengan%20workshop%20kayu%20di%20Purworejo.%20Boleh%20info%20lebih%20lanjut?" class="nav-cta" target="_blank" rel="noopener" aria-label="Hubungi via WhatsApp">Hubungi WA</a></li>
    </ul>
  </div>
</header>

<a id="top"></a>

<section class="hero" aria-label="Hero">
  <div class="hero-inner">
    <span class="eyebrow">Aset Industri Premium · Eks Kriya Works</span>
    <h1>Workshop Kayu Dijual di Purworejo</h1>
    <p class="sub">Pinggir Jalan Nasional · SHM Tangan Pertama · 3 Oven Kiln Dry · Listrik 35 kVA</p>
    <div class="price-pill" aria-label="Harga: 6 Miliar Rupiah Negotiable">Rp 6 Miliar · Nego</div>
    <div class="cta-row">
      <a class="btn btn-primary" href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Halo,%20saya%20tertarik%20dengan%20workshop%20kayu%20di%20Purworejo.%20Boleh%20info%20lebih%20lanjut?" target="_blank" rel="noopener" aria-label="Tanya properti via WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0zm5.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>
        Tanya via WhatsApp
      </a>
      <a class="btn btn-secondary" href="https://maps.app.goo.gl/UoxXgQaUYQFShvFi6" target="_blank" rel="noopener" aria-label="Lihat lokasi properti di Google Maps">Lihat di Google Maps</a>
    </div>
  </div>
  <a href="#trust" class="scroll-arrow" aria-label="Scroll ke bawah">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
  </a>
</section>

<div class="trust-bar" id="trust" aria-label="Poin kepercayaan">
  <div class="grid">
    <div class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>SHM Tangan Pertama</div>
    <div class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12l2-2 4 4 8-8 4 4"/></svg>Non Lahan Hijau</div>
    <div class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 9h4l3 4v4h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>Jalan Nasional</div>
    <div class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>Langsung Owner</div>
  </div>
</div>

<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#top">Beranda</a></li>
    <li><a href="#spesifikasi">Properti Industri</a></li>
    <li><a href="#lokasi">Purworejo</a></li>
    <li><span aria-current="page">Workshop Kayu</span></li>
  </ol>
</nav>

<main>

<section id="usp" class="fade-in">
  <div class="container">
    <h2>Kenapa Aset Ini Bernilai Lebih</h2>
    <p class="lead">Tiga komponen yang sulit dan mahal untuk dibangun dari nol — di sini sudah tersedia.</p>
    <div class="cards-3">
      <article class="card">
        <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 1-5 1 2 4 1 4-4z"/></svg></div>
        <h3>3 Oven Kiln Dry</h3>
        <p>Wajib standar ekspor furniture (ISPM-15). Bangun baru: Rp 150-300jt + 3-6 bulan instalasi & sertifikasi. Di sini sudah tersedia, tinggal operasional.</p>
        <span class="save">Hemat ratusan juta + 6 bulan</span>
      </article>
      <article class="card">
        <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
        <h3>Listrik 35 kVA</h3>
        <p>Kapasitas industri penuh. Inden PLN lokasi baru bisa 6-18 bulan dengan biaya puluhan juta. Di sini tinggal balik nama, langsung pakai.</p>
        <span class="save">Hemat 6-18 bulan inden</span>
      </article>
      <article class="card">
        <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 9h4l3 4v4h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg></div>
        <h3>Jalan Nasional Langsung</h3>
        <p>Truk kontainer 40ft masuk tanpa manuver. Tidak ada bottleneck logistik, tidak ada biaya pindah-muat di gang sempit.</p>
        <span class="save">Zero bottleneck logistik</span>
      </article>
    </div>
  </div>
</section>

<section id="spesifikasi" class="fade-in">
  <div class="container">
    <h2>Spesifikasi Lengkap Properti</h2>
    <p class="lead">Data teknis aset, sertifikat, dan fasilitas yang sudah terpasang.</p>
    <div class="specs">
      <div class="label">Luas Tanah</div><div class="val">±2.893 m²</div>
      <div class="label">Luas Bangunan</div><div class="val">±1.000 m²</div>
      <div class="label">Sertifikat</div><div class="val">SHM (Tangan Pertama)</div>
      <div class="label">Listrik</div><div class="val">35 kVA (Industri)</div>
      <div class="label">Fasilitas</div><div class="val">3 Oven Kayu, Kantor, 2 KM</div>
      <div class="label">Akses Jalan</div><div class="val">Jalan Nasional (40ft Container)</div>
      <div class="label">Zonasi</div><div class="val">Non Lahan Hijau</div>
      <div class="label">Mesin</div><div class="val">Tidak Termasuk</div>
      <div class="label">Kondisi</div><div class="val">Bangunan Kokoh, Siap Serah Terima</div>
      <div class="label">Harga</div><div class="val">Rp 6.000.000.000 (Nego)</div>
    </div>
  </div>
</section>

<section id="persona" class="fade-in">
  <div class="container">
    <h2>Aset Ini Cocok Untuk</h2>
    <p class="lead">Profil pembeli yang akan memaksimalkan nilai workshop ini.</p>
    <div class="cards-4">
      <article class="persona">
        <svg class="picon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/></svg>
        <h3>Pengusaha Furniture Jepara/Solo</h3>
        <p>Ekspansi atau satelit produksi tanpa antri infrastruktur PLN dan kiln dry baru.</p>
      </article>
      <article class="persona">
        <svg class="picon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 7l10-5 10 5-10 5L2 7z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <h3>Eksportir Kayu</h3>
        <p>Butuh fasilitas kiln dry standar internasional ISPM-15 untuk ekspor furniture & komponen kayu.</p>
      </article>
      <article class="persona">
        <svg class="picon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>
        <h3>Investor Properti</h3>
        <p>Lahan industri produktif di koridor Jawa Tengah dengan potensi yield rental & capital gain.</p>
      </article>
      <article class="persona">
        <svg class="picon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 9l9-6 9 6v11H3z"/><path d="M9 20v-7h6v7"/></svg>
        <h3>Developer Gudang</h3>
        <p>Lahan 2.893m² cukup untuk fasilitas 3PL atau cold chain regional skala menengah.</p>
      </article>
    </div>
  </div>
</section>

<section id="faq" class="fade-in">
  <div class="container">
    <h2>Pertanyaan yang Sering Ditanyakan</h2>
    <p class="lead">Jawaban cepat untuk pertanyaan paling umum dari calon pembeli.</p>
    <div class="faq-wrap">
      <details>
        <summary>Apakah workshop ini masih beroperasi?</summary>
        <p>Tidak. Workshop dijual dalam kondisi kosong tanpa mesin. Bangunan, oven, dan infrastruktur listrik tersedia untuk pembeli.</p>
      </details>
      <details>
        <summary>Apakah bisa KPR atau KPA bank?</summary>
        <p>Status SHM memungkinkan pemrosesan KPA (Kredit Pemilikan Aset) komersial. Skema pembayaran didiskusikan langsung saat negosiasi serius.</p>
      </details>
      <details>
        <summary>Apakah oven kayu masih bisa digunakan?</summary>
        <p>Kondisi oven dapat dicek saat survey lokasi. Hubungi kami untuk jadwal inspeksi.</p>
      </details>
      <details>
        <summary>Bagaimana cara survey dan penawaran?</summary>
        <p>Lokasi dapat dicek mandiri dari eksterior via titik Maps. Untuk cek interior dan negosiasi, hubungi WA 089619093961.</p>
      </details>
    </div>
  </div>
</section>

<section id="lokasi" class="fade-in">
  <div class="container">
    <h2>Lokasi Properti</h2>
    <p class="lead">Persis di pinggir Jalan Nasional Banyuurip, Purworejo — mudah ditemukan dan diakses.</p>
    <div class="map-wrap">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.5935019214503!2d109.96137607574936!3d-7.726686976571286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aeb4ba64fbb7b%3A0x21de15f422a04dae!2skriya%20works%20wood%20%26%20metal!5e0!3m2!1sen!2sid!4v1778401494498!5m2!1sen!2sid" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="Lokasi Workshop Kriya Works Purworejo di Google Maps"></iframe>
    </div>
    <div class="address-box">
      <p><strong>Pitaran Lor, Candisari</strong></p>
      <p>Kec. Banyuurip, Kab. Purworejo, Jawa Tengah 54171</p>
      <p class="coords">Koordinat: -7.7266923, 109.963951</p>
      <p class="small">Persis di pinggir Jalan Nasional — dapat dicek dari eksterior tanpa perjanjian.</p>
      <p style="margin-top:1rem"><a href="https://maps.app.goo.gl/UoxXgQaUYQFShvFi6" target="_blank" rel="noopener">Buka di Google Maps →</a></p>
    </div>
  </div>
</section>

<section id="kontak" class="fade-in" style="padding-bottom:0;border-top:none">
  <div class="final-cta">
    <div class="final-cta-inner">
      <h2>Tertarik? Hubungi Langsung Owner</h2>
      <p class="body">Penawaran serius dilayani langsung. Sebutkan dari website ini.</p>
      <a class="btn btn-dark" href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Halo,%20saya%20tertarik%20dengan%20workshop%20kayu%20di%20Purworejo.%20Boleh%20info%20lebih%20lanjut?" target="_blank" rel="noopener" aria-label="Buka WhatsApp untuk hubungi owner">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0zm5.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>
        Buka WhatsApp Sekarang
      </a>
      <span class="phone">0896-1909-3961</span>
      <p class="sub">Respon cepat · Langsung owner · Nego terbuka</p>
    </div>
  </div>
</section>

</main>

<footer>
  <div>Workshop Industri Purworejo © 2026 · Informasi langsung dari pemilik</div>
  <div class="links">
    <a href="#spesifikasi">Spesifikasi</a>
    <a href="#lokasi">Lokasi</a>
    <a href="#faq">FAQ</a>
    <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener">Hubungi Kami</a>
  </div>
</footer>

<div class="mobile-bar" role="region" aria-label="Kontak cepat">
  <div class="info">
    <strong>Workshop Purworejo</strong>
    <span>Rp 6 Miliar · Nego</span>
  </div>
  <a class="btn btn-primary" href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Halo,%20saya%20tertarik%20dengan%20workshop%20kayu%20di%20Purworejo.%20Boleh%20info%20lebih%20lanjut?" target="_blank" rel="noopener" aria-label="WhatsApp Sekarang">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:16px;height:16px"><path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
    WA Sekarang
  </a>
</div>

<a class="wa-float" href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Halo,%20saya%20tertarik%20dengan%20workshop%20kayu%20di%20Purworejo." target="_blank" rel="noopener" aria-label="Hubungi via WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0zm5.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>
</a>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=4498289267084727&ev=PageView&noscript=1" alt=""/></noscript>`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
            title: "Dijual Workshop Industri Kayu Purworejo | SHM, 35kVA, 3 Oven Kiln Dry | Jalan Nasional"
      },
      {
            "charSet": "UTF-8"
      },
      {
            "name": "viewport",
            "content": "width=device-width, initial-scale=1.0"
      },
      {
            "name": "robots",
            "content": "index, follow"
      },
      {
            "name": "author",
            "content": "Owner Workshop Purworejo"
      },
      {
            "name": "theme-color",
            "content": "#0f0a08"
      },
      {
            "name": "description",
            "content": "Workshop eks Kriya Works Purworejo dijual. LT 2.893m², SHM tangan pertama, listrik 35kVA, 3 oven kiln dry, pinggir jalan nasional. Harga 6M nego. WA 089619093961."
      },
      {
            "name": "keywords",
            "content": "workshop kayu dijual purworejo, pabrik furniture purworejo dijual, gudang industri purworejo, properti industri jawa tengah, workshop kiln dry dijual jateng, lahan industri shm purworejo, beli pabrik kayu jawa tengah, workshop listrik 35kva dijual"
      },
      {
            "name": "geo.region",
            "content": "ID-JT"
      },
      {
            "name": "geo.placename",
            "content": "Purworejo"
      },
      {
            "name": "geo.position",
            "content": "-7.7266923;109.963951"
      },
      {
            "name": "ICBM",
            "content": "-7.7266923, 109.963951"
      },
      {
            "property": "og:type",
            "content": "website"
      },
      {
            "property": "og:locale",
            "content": "id_ID"
      },
      {
            "property": "og:url",
            "content": "https://workshop-purworejo.netlify.app"
      },
      {
            "property": "og:site_name",
            "content": "Workshop Industri Purworejo"
      },
      {
            "property": "og:title",
            "content": "Dijual Workshop Industri Kayu Purworejo - SHM, 35kVA, 3 Oven Kiln Dry"
      },
      {
            "property": "og:description",
            "content": "Workshop eks Kriya Works Purworejo. LT 2.893m², SHM tangan pertama, 35kVA, 3 oven kiln dry, pinggir jalan nasional. Rp 6 Miliar nego."
      },
      {
            "property": "og:image",
            "content": "https://workshop-purworejo.netlify.app/og-image.jpg"
      },
      {
            "property": "og:image:width",
            "content": "1200"
      },
      {
            "property": "og:image:height",
            "content": "630"
      },
      {
            "name": "twitter:card",
            "content": "summary_large_image"
      },
      {
            "name": "twitter:title",
            "content": "Dijual Workshop Industri Kayu Purworejo - SHM, 35kVA, 3 Oven Kiln Dry"
      },
      {
            "name": "twitter:description",
            "content": "Workshop eks Kriya Works Purworejo. LT 2.893m², SHM, 35kVA, 3 oven kiln dry, pinggir jalan nasional. Rp 6M nego."
      },
      {
            "name": "twitter:image",
            "content": "https://workshop-purworejo.netlify.app/og-image.jpg"
      }
],
    links: [
      {
            "rel": "canonical",
            "href": "https://workshop-purworejo.netlify.app"
      },
      {
            "rel": "sitemap",
            "type": "application/xml",
            "href": "/sitemap.xml"
      },
      {
            "rel": "preconnect",
            "href": "https://fonts.googleapis.com"
      },
      {
            "rel": "preconnect",
            "href": "https://fonts.gstatic.com"
      },
      {
            "rel": "preload",
            "as": "style",
            "href": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap"
      },
      {
            "rel": "stylesheet",
            "href": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap",
            "media": "print",
            "onload": "this.media='all'"
      },
      {
            "rel": "stylesheet",
            "href": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap"
      },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "preconnect", href: "https://connect.facebook.net" }
],
    scripts: [
      {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-FWP8WBGP18"
      },
      {
            children: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-FWP8WBGP18');"
      },
      {
            children: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','4498289267084727');var _eid='pv-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);fbq('track','PageView',{},{eventID:_eid});try{var _gc=function(n){var m=document.cookie.match(new RegExp('(^| )'+n+'=([^;]+)'));return m?m[2]:undefined};fetch('/api/public/capi',{method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,body:JSON.stringify({event_name:'PageView',event_id:_eid,event_source_url:location.href,fbp:_gc('_fbp'),fbc:_gc('_fbc')})}).catch(function(){})}catch(e){}"
      },
      {
            "type": "application/ld+json",
            "children": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"RealEstateListing\",\n  \"name\": \"Workshop Industri Kayu Purworejo - SHM Tangan Pertama\",\n  \"description\": \"Workshop kayu dan furniture di Purworejo dijual. LT 2893m², SHM, listrik 35kVA, 3 oven kiln dry, pinggir jalan nasional.\",\n  \"url\": \"https://workshop-purworejo.netlify.app\",\n  \"image\": \"https://workshop-purworejo.netlify.app/og-image.jpg\",\n  \"datePosted\": \"2026-05-10\",\n  \"price\": \"6000000000\",\n  \"priceCurrency\": \"IDR\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"Pitaran Lor, Candisari\",\n    \"addressLocality\": \"Purworejo\",\n    \"addressRegion\": \"Jawa Tengah\",\n    \"postalCode\": \"54171\",\n    \"addressCountry\": \"ID\"\n  },\n  \"floorSize\": { \"@type\": \"QuantitativeValue\", \"value\": 1000, \"unitCode\": \"MTK\" },\n  \"numberOfRooms\": 5,\n  \"geo\": { \"@type\": \"GeoCoordinates\", \"latitude\": -7.7266923, \"longitude\": 109.963951 }\n}"
      },
      {
            "type": "application/ld+json",
            "children": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"LocalBusiness\",\n  \"name\": \"Workshop Industri Purworejo\",\n  \"image\": \"https://workshop-purworejo.netlify.app/og-image.jpg\",\n  \"telephone\": \"+6289619093961\",\n  \"priceRange\": \"Rp 6.000.000.000\",\n  \"url\": \"https://workshop-purworejo.netlify.app\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"Pitaran Lor, Candisari, Kec. Banyuurip\",\n    \"addressLocality\": \"Purworejo\",\n    \"addressRegion\": \"Jawa Tengah\",\n    \"postalCode\": \"54171\",\n    \"addressCountry\": \"ID\"\n  },\n  \"geo\": { \"@type\": \"GeoCoordinates\", \"latitude\": -7.7266923, \"longitude\": 109.963951 }\n}"
      },
      {
            "type": "application/ld+json",
            "children": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"BreadcrumbList\",\n  \"itemListElement\": [\n    {\"@type\":\"ListItem\",\"position\":1,\"name\":\"Beranda\",\"item\":\"https://workshop-purworejo.netlify.app/\"},\n    {\"@type\":\"ListItem\",\"position\":2,\"name\":\"Properti Industri\",\"item\":\"https://workshop-purworejo.netlify.app/#spesifikasi\"},\n    {\"@type\":\"ListItem\",\"position\":3,\"name\":\"Purworejo\",\"item\":\"https://workshop-purworejo.netlify.app/#lokasi\"},\n    {\"@type\":\"ListItem\",\"position\":4,\"name\":\"Workshop Kayu\",\"item\":\"https://workshop-purworejo.netlify.app/\"}\n  ]\n}"
      },
      {
            "type": "application/ld+json",
            "children": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"mainEntity\": [\n    {\"@type\":\"Question\",\"name\":\"Apakah workshop ini masih beroperasi?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Tidak. Workshop dijual dalam kondisi kosong tanpa mesin. Bangunan, oven, dan infrastruktur listrik tersedia untuk pembeli.\"}},\n    {\"@type\":\"Question\",\"name\":\"Apakah bisa KPR atau KPA bank?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Status SHM memungkinkan pemrosesan KPA (Kredit Pemilikan Aset) komersial. Skema pembayaran didiskusikan langsung saat negosiasi serius.\"}},\n    {\"@type\":\"Question\",\"name\":\"Apakah oven kayu masih bisa digunakan?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Kondisi oven dapat dicek saat survey lokasi. Hubungi kami untuk jadwal inspeksi.\"}},\n    {\"@type\":\"Question\",\"name\":\"Bagaimana cara survey dan penawaran?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Lokasi dapat dicek mandiri dari eksterior via titik Maps. Untuk cek interior dan negosiasi, hubungi WA 089619093961.\"}}\n  ]\n}"
      }
],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const nav = document.getElementById('topnav');
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = document.getElementById('hamburger');
    const links = document.getElementById('navlinks');
    const onBurger = () => {
      if (!links || !burger) return;
      const open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger?.addEventListener('click', onBurger);
    const linkEls = links ? Array.from(links.querySelectorAll('a')) : [];
    const closeMenu = () => {
      links?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
    };
    linkEls.forEach(a => a.addEventListener('click', closeMenu));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      burger?.removeEventListener('click', onBurger);
      linkEls.forEach(a => a.removeEventListener('click', closeMenu));
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}


