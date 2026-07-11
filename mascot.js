/* mascot.js – reusable SVG cat mascot generator */
/* Call: Mascot.render(container, variant, size) */

const Mascot = {
  // variant: 'grad' | 'laptop' | 'doctor' | 'vip' | 'glasses' | 'headset'
  // size: number (viewBox scale)
  svgs: {
    grad: (w,h) => `<svg width="${w}" height="${h}" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Gown body -->
      <ellipse cx="100" cy="200" rx="72" ry="50" fill="#1A2B6D"/>
      <!-- Body fur -->
      <ellipse cx="100" cy="165" rx="50" ry="52" fill="#F5F5F5"/>
      <!-- Head -->
      <ellipse cx="100" cy="108" rx="52" ry="50" fill="#F5F5F5"/>
      <!-- Ears -->
      <polygon points="64,70 48,40 82,60" fill="#F5F5F5"/>
      <polygon points="136,70 152,40 118,60" fill="#F5F5F5"/>
      <polygon points="66,68 52,44 80,61" fill="#FFADB9"/>
      <polygon points="134,68 148,44 120,61" fill="#FFADB9"/>
      <!-- Eyes -->
      <ellipse cx="83" cy="109" rx="12" ry="13" fill="#1A90FF"/>
      <ellipse cx="117" cy="109" rx="12" ry="13" fill="#1A90FF"/>
      <ellipse cx="83" cy="110" rx="7.5" ry="8.5" fill="#0A2060"/>
      <ellipse cx="117" cy="110" rx="7.5" ry="8.5" fill="#0A2060"/>
      <ellipse cx="80" cy="106" rx="3" ry="3" fill="white"/>
      <ellipse cx="114" cy="106" rx="3" ry="3" fill="white"/>
      <!-- Nose -->
      <ellipse cx="100" cy="122" rx="5" ry="3.5" fill="#FFADB9"/>
      <!-- Mouth -->
      <path d="M91 128 Q100 135 109 128" stroke="#AAAAAA" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Cheeks -->
      <ellipse cx="70" cy="124" rx="12" ry="8" fill="#FFADB9" opacity="0.45"/>
      <ellipse cx="130" cy="124" rx="12" ry="8" fill="#FFADB9" opacity="0.45"/>
      <!-- Whiskers -->
      <line x1="40" y1="122" x2="86" y2="124" stroke="#CCCCCC" stroke-width="1.2"/>
      <line x1="40" y1="128" x2="86" y2="128" stroke="#CCCCCC" stroke-width="1.2"/>
      <line x1="114" y1="124" x2="160" y2="122" stroke="#CCCCCC" stroke-width="1.2"/>
      <line x1="114" y1="128" x2="160" y2="128" stroke="#CCCCCC" stroke-width="1.2"/>
      <!-- Graduation cap board -->
      <rect x="55" y="66" width="90" height="13" rx="5" fill="#1A2B6D"/>
      <!-- Cap top -->
      <polygon points="100,38 56,66 144,66" fill="#1A2B6D"/>
      <!-- Tassel -->
      <line x1="144" y1="66" x2="154" y2="84" stroke="#F5A623" stroke-width="2.5"/>
      <rect x="150" y="84" width="9" height="13" rx="3.5" fill="#F5A623"/>
      <!-- Badge -->
      <circle cx="100" cy="188" r="18" fill="#3B5BFF"/>
      <text x="100" y="194" text-anchor="middle" fill="white" font-family="'Plus Jakarta Sans',sans-serif" font-size="15" font-weight="800">a</text>
      <!-- Left paw (waving) -->
      <ellipse cx="48" cy="178" rx="26" ry="21" fill="#F5F5F5" transform="rotate(-35 48 178)"/>
      <ellipse cx="36" cy="160" rx="10" ry="8" fill="#F5F5F5" transform="rotate(-20 36 160)"/>
      <!-- Right paw -->
      <ellipse cx="152" cy="196" rx="24" ry="18" fill="#F5F5F5"/>
      <!-- Sparkles -->
      <path d="M34 96 L36 90 L38 96 L44 98 L38 100 L36 106 L34 100 L28 98 Z" fill="#93C5FD" opacity="0.8"/>
      <path d="M160 82 L161.5 77 L163 82 L168 83.5 L163 85 L161.5 90 L160 85 L155 83.5 Z" fill="#93C5FD" opacity="0.6"/>
      <!-- Books floating left -->
      <rect x="10" y="130" width="38" height="28" rx="5" fill="#A5B4FC" opacity="0.85"/>
      <rect x="13" y="133" width="32" height="22" rx="3" fill="#EEF2FF"/>
      <line x1="29" y1="133" x2="29" y2="155" stroke="#818CF8" stroke-width="1.5"/>
      <!-- Doc floating right -->
      <rect x="152" y="114" width="32" height="38" rx="4" fill="#A5B4FC" opacity="0.75"/>
      <rect x="155" y="117" width="26" height="32" rx="3" fill="#EEF2FF"/>
      <line x1="160" y1="124" x2="176" y2="124" stroke="#818CF8" stroke-width="1.2"/>
      <line x1="160" y1="130" x2="176" y2="130" stroke="#818CF8" stroke-width="1.2"/>
      <line x1="160" y1="136" x2="170" y2="136" stroke="#818CF8" stroke-width="1.2"/>
    </svg>`,

    laptop: (w,h) => `<svg width="${w}" height="${h}" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Desk setup -->
      <rect x="20" y="145" width="160" height="8" rx="4" fill="#D1D5DB"/>
      <!-- Laptop -->
      <rect x="42" y="110" width="96" height="60" rx="7" fill="#374151"/>
      <rect x="46" y="114" width="88" height="50" rx="4" fill="#10B981" opacity="0.85"/>
      <!-- Screen glow effect -->
      <rect x="50" y="118" width="44" height="8" rx="3" fill="rgba(255,255,255,0.25)"/>
      <rect x="50" y="130" width="36" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <rect x="50" y="138" width="40" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <!-- Laptop base -->
      <rect x="30" y="170" width="140" height="8" rx="4" fill="#374151"/>
      <!-- Cat body (gown) -->
      <ellipse cx="100" cy="140" rx="42" ry="38" fill="#1A2B6D"/>
      <!-- Cat head -->
      <ellipse cx="100" cy="96" rx="46" ry="44" fill="#F5F5F5"/>
      <!-- Ears -->
      <polygon points="67,64 52,36 78,56" fill="#F5F5F5"/>
      <polygon points="133,64 148,36 122,56" fill="#F5F5F5"/>
      <polygon points="69,62 56,40 78,57" fill="#FFADB9"/>
      <polygon points="131,62 144,40 122,57" fill="#FFADB9"/>
      <!-- Eyes -->
      <ellipse cx="85" cy="97" rx="11" ry="12" fill="#1A90FF"/>
      <ellipse cx="115" cy="97" rx="11" ry="12" fill="#1A90FF"/>
      <ellipse cx="85" cy="98" rx="6.5" ry="7.5" fill="#0A2060"/>
      <ellipse cx="115" cy="98" rx="6.5" ry="7.5" fill="#0A2060"/>
      <ellipse cx="82.5" cy="94.5" rx="2.5" ry="2.5" fill="white"/>
      <ellipse cx="112.5" cy="94.5" rx="2.5" ry="2.5" fill="white"/>
      <!-- Nose -->
      <ellipse cx="100" cy="110" rx="4.5" ry="3" fill="#FFADB9"/>
      <!-- Mouth -->
      <path d="M92 115 Q100 122 108 115" stroke="#AAAAAA" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Cheeks -->
      <ellipse cx="72" cy="112" rx="11" ry="7" fill="#FFADB9" opacity="0.45"/>
      <ellipse cx="128" cy="112" rx="11" ry="7" fill="#FFADB9" opacity="0.45"/>
      <!-- Whiskers -->
      <line x1="42" y1="110" x2="86" y2="112" stroke="#CCCCCC" stroke-width="1.2"/>
      <line x1="42" y1="116" x2="86" y2="116" stroke="#CCCCCC" stroke-width="1.2"/>
      <line x1="114" y1="112" x2="158" y2="110" stroke="#CCCCCC" stroke-width="1.2"/>
      <line x1="114" y1="116" x2="158" y2="116" stroke="#CCCCCC" stroke-width="1.2"/>
      <!-- Badge -->
      <circle cx="100" cy="130" r="14" fill="#3B5BFF"/>
      <text x="100" y="135" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12" font-weight="800">a</text>
      <!-- Briefcase right -->
      <rect x="148" y="148" width="40" height="30" rx="6" fill="#92400E"/>
      <rect x="157" y="141" width="22" height="12" rx="4" fill="#B45309"/>
      <circle cx="168" cy="163" r="5" fill="#D97706"/>
      <!-- Sparkle -->
      <path d="M24 118 L26 112 L28 118 L34 120 L28 122 L26 128 L24 122 L18 120 Z" fill="#6EE7B7" opacity="0.7"/>
    </svg>`,

    doctor: (w,h) => `<svg width="${w}" height="${h}" viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- White coat -->
      <ellipse cx="100" cy="195" rx="65" ry="46" fill="white" stroke="#E5E7EB" stroke-width="1.5"/>
      <path d="M70 160 L58 200 L100 192 L142 200 L130 160" fill="white" stroke="#E5E7EB" stroke-width="1.5"/>
      <path d="M80 160 L100 178 L120 160" fill="none" stroke="#E5E7EB" stroke-width="1.5"/>
      <!-- AI badge on coat -->
      <circle cx="100" cy="188" r="14" fill="#7C3AED"/>
      <text x="100" y="193" text-anchor="middle" fill="white" font-family="sans-serif" font-size="10" font-weight="800">AI</text>
      <!-- Cat head -->
      <ellipse cx="100" cy="104" rx="50" ry="48" fill="#F5F5F5"/>
      <!-- Ears -->
      <polygon points="66,68 50,40 80,60" fill="#F5F5F5"/>
      <polygon points="134,68 150,40 120,60" fill="#F5F5F5"/>
      <polygon points="68,66 54,44 80,61" fill="#FFADB9"/>
      <polygon points="132,66 146,44 120,61" fill="#FFADB9"/>
      <!-- Eyes -->
      <ellipse cx="84" cy="105" rx="11" ry="12" fill="#1A90FF"/>
      <ellipse cx="116" cy="105" rx="11" ry="12" fill="#1A90FF"/>
      <ellipse cx="84" cy="106" rx="7" ry="8" fill="#0A2060"/>
      <ellipse cx="116" cy="106" rx="7" ry="8" fill="#0A2060"/>
      <ellipse cx="81.5" cy="102.5" rx="2.5" ry="2.5" fill="white"/>
      <ellipse cx="113.5" cy="102.5" rx="2.5" ry="2.5" fill="white"/>
      <!-- Nose + mouth -->
      <ellipse cx="100" cy="118" rx="4.5" ry="3" fill="#FFADB9"/>
      <path d="M92 124 Q100 130 108 124" stroke="#AAA" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Cheeks -->
      <ellipse cx="72" cy="120" rx="11" ry="7.5" fill="#FFADB9" opacity="0.45"/>
      <ellipse cx="128" cy="120" rx="11" ry="7.5" fill="#FFADB9" opacity="0.45"/>
      <!-- Whiskers -->
      <line x1="42" y1="118" x2="87" y2="120" stroke="#CCC" stroke-width="1.2"/>
      <line x1="42" y1="124" x2="87" y2="124" stroke="#CCC" stroke-width="1.2"/>
      <line x1="113" y1="120" x2="158" y2="118" stroke="#CCC" stroke-width="1.2"/>
      <line x1="113" y1="124" x2="158" y2="124" stroke="#CCC" stroke-width="1.2"/>
      <!-- Stethoscope -->
      <path d="M118 72 Q134 58 144 72" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="144" cy="76" r="6" fill="#7C3AED"/>
      <path d="M144 82 Q144 110 122 110" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="122" cy="112" r="5" fill="#7C3AED"/>
      <!-- Headset earphones -->
      <rect x="44" y="145" width="12" height="20" rx="4" fill="#7C3AED"/>
      <rect x="144" y="145" width="12" height="20" rx="4" fill="#7C3AED"/>
      <!-- Headset band -->
      <path d="M44 148 Q100 120 156 148" stroke="#7C3AED" stroke-width="2.5" fill="none"/>
      <!-- Speech bubble -->
      <rect x="28" y="132" width="52" height="26" rx="9" fill="#7C3AED" opacity="0.12"/>
      <circle cx="44" cy="145" r="3.5" fill="#7C3AED" opacity="0.6"/>
      <circle cx="54" cy="145" r="3.5" fill="#7C3AED" opacity="0.6"/>
      <circle cx="64" cy="145" r="3.5" fill="#7C3AED" opacity="0.6"/>
    </svg>`,

    glasses: (w,h) => `<svg width="${w}" height="${h}" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Gown -->
      <ellipse cx="90" cy="185" rx="60" ry="42" fill="#1A2B6D"/>
      <ellipse cx="90" cy="150" rx="40" ry="44" fill="#F5F5F5"/>
      <!-- Head -->
      <ellipse cx="90" cy="100" rx="44" ry="42" fill="#F5F5F5"/>
      <!-- Ears -->
      <polygon points="58,68 44,42 72,58" fill="#F5F5F5"/>
      <polygon points="122,68 136,42 108,58" fill="#F5F5F5"/>
      <polygon points="60,66 48,46 72,59" fill="#FFADB9"/>
      <polygon points="120,66 132,46 108,59" fill="#FFADB9"/>
      <!-- Glasses frames -->
      <ellipse cx="75" cy="100" rx="15" ry="16" fill="none" stroke="#1A2B6D" stroke-width="2.5"/>
      <ellipse cx="105" cy="100" rx="15" ry="16" fill="none" stroke="#1A2B6D" stroke-width="2.5"/>
      <line x1="90" y1="100" x2="90" y2="100" stroke="#1A2B6D" stroke-width="2"/>
      <line x1="90" y1="100" x2="90" y2="100" stroke="#1A2B6D" stroke-width="2.5"/>
      <path d="M60 100 Q55 96 50 99" stroke="#1A2B6D" stroke-width="2.5" fill="none"/>
      <path d="M120 100 Q125 96 130 99" stroke="#1A2B6D" stroke-width="2.5" fill="none"/>
      <!-- Bridge -->
      <line x1="90" y1="100" x2="90" y2="100"/>
      <path d="M90 100 Q90 100 90 100" stroke="#1A2B6D" stroke-width="2"/>
      <!-- Eyes inside glasses -->
      <ellipse cx="75" cy="100" rx="8" ry="9" fill="#1A90FF"/>
      <ellipse cx="105" cy="100" rx="8" ry="9" fill="#1A90FF"/>
      <ellipse cx="75" cy="101" rx="5" ry="6" fill="#0A2060"/>
      <ellipse cx="105" cy="101" rx="5" ry="6" fill="#0A2060"/>
      <ellipse cx="73" cy="98" rx="2" ry="2" fill="white"/>
      <ellipse cx="103" cy="98" rx="2" ry="2" fill="white"/>
      <!-- Nose -->
      <ellipse cx="90" cy="113" rx="4" ry="2.8" fill="#FFADB9"/>
      <!-- Mouth -->
      <path d="M82 118 Q90 125 98 118" stroke="#AAA" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Cheeks -->
      <ellipse cx="63" cy="115" rx="10" ry="6.5" fill="#FFADB9" opacity="0.45"/>
      <ellipse cx="117" cy="115" rx="10" ry="6.5" fill="#FFADB9" opacity="0.45"/>
      <!-- Whiskers -->
      <line x1="36" y1="113" x2="78" y2="115" stroke="#CCC" stroke-width="1.1"/>
      <line x1="36" y1="119" x2="78" y2="119" stroke="#CCC" stroke-width="1.1"/>
      <line x1="102" y1="115" x2="144" y2="113" stroke="#CCC" stroke-width="1.1"/>
      <line x1="102" y1="119" x2="144" y2="119" stroke="#CCC" stroke-width="1.1"/>
      <!-- Cap -->
      <rect x="52" y="62" width="76" height="11" rx="5" fill="#1A2B6D"/>
      <polygon points="90,38 54,62 126,62" fill="#1A2B6D"/>
      <line x1="126" y1="62" x2="135" y2="78" stroke="#F5A623" stroke-width="2.5"/>
      <rect x="131" y="78" width="9" height="12" rx="3" fill="#F5A623"/>
      <!-- Pencil -->
      <rect x="130" y="56" width="7" height="32" rx="2.5" fill="#F5A623" transform="rotate(18 134 72)"/>
      <polygon points="130,88 137,88 133.5,96" fill="#FCA5A5" transform="rotate(18 134 72)"/>
      <!-- Badge -->
      <circle cx="90" cy="172" r="14" fill="#3B5BFF"/>
      <text x="90" y="177" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12" font-weight="800">a</text>
      <!-- Books -->
      <rect x="14" y="130" width="36" height="10" rx="3" fill="#3B5BFF"/>
      <rect x="14" y="120" width="36" height="10" rx="3" fill="#6366F1"/>
      <rect x="14" y="110" width="36" height="10" rx="3" fill="#A5B4FC"/>
    </svg>`
  },

  render(container, variant = 'grad', w = 200, h = 240) {
    const fn = this.svgs[variant];
    if (fn && container) container.innerHTML = fn(w, h);
  },

  html(variant = 'grad', w = 200, h = 240) {
    const fn = this.svgs[variant];
    return fn ? fn(w, h) : '';
  }
};

// Make globally available
window.Mascot = Mascot;
