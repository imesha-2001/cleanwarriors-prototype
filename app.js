/* CleanWarriors prototype — interaction logic (no build step, no dependencies) */
'use strict';

window.addEventListener('error', (e) => {
  document.documentElement.setAttribute('data-error', e.message + ' @' + e.lineno);
});

// ---------------------------------------------------------------------------
// Data (from the project documents)
// ---------------------------------------------------------------------------
const FACTIONS = {
  flora: {
    key: 'flora', name: 'Faction Flora', short: 'FLORA', icon: '🌿', color: '#39FF14', rgb: '57, 255, 20',
    focus: 'Environmental Sustainability',
    desc: 'Protect the environment — waste management, recycling, biodiversity and water protection.',
    starter: 'ECO-RANGER',
    kits: ['Neon Strap Trim Suit', 'Neon Leaf Jacket + Arm Guards', 'Forest Guardian Supreme Armor'],
  },
  unity: {
    key: 'unity', name: 'Faction Unity', short: 'UNITY', icon: '🤝', color: '#00BFFF', rgb: '0, 191, 255',
    focus: 'Social Sustainability',
    desc: 'Empower people — community wellbeing, education, health and social inclusion.',
    starter: 'CIVIC SCOUT',
    kits: ['Smart Band Uniform', 'Blue Tactical Neon Jacket', 'Unity Vanguard Supreme Armor'],
  },
  nova: {
    key: 'nova', name: 'Faction Nova', short: 'NOVA', icon: '⚖️', color: '#FFD700', rgb: '255, 215, 0',
    focus: 'Governance & Ethics',
    desc: 'Defend integrity — transparency, anti-corruption, ethics and accountability.',
    starter: 'INTEGRITY SENTINEL',
    kits: ['Metallic Gold-Trim Jacket', 'Royal Tactical Gold Armor', 'Royal Guard Supreme Power Costume'],
  },
};
const NEUTRAL = '#d6d6e0';
const LEVELS = ['', 'Newcomer', 'Trainee', 'Inspector', 'Guardian', 'Organizer', 'Field Leader', 'Commander', 'Strategist', 'Champion', 'Clean Warrior'];
const PORTAL_TYPES = {
  env: { icon: '🌍', name: 'Environmental Portal' },
  soc: { icon: '🤝', name: 'Social Portal' },
  gov: { icon: '⚖️', name: 'Governance Portal' },
};

// Map is a stylised Colombo (sea on the west). Coordinates are in a 800x1100 map space.
const MAP_W = 800, MAP_H = 1100, PLAYER = { x: 400, y: 600 };
const PORTALS = [
  { id: 'gf', name: 'Galle Face Beach', type: 'env', owner: 'flora', x: 130, y: 560, lvl: 5, decay: 9 },
  { id: 'bl', name: 'Beira Lake', type: 'env', owner: 'flora', x: 330, y: 450, lvl: 4, decay: 6 },
  { id: 'vp', name: 'Viharamahadevi Park', type: 'env', owner: 'flora', x: 290, y: 720, lvl: 6, decay: 12 },
  { id: 'rcy', name: 'Kirulapone Recycling Centre', type: 'env', owner: 'flora', x: 650, y: 360, lvl: 3, decay: 4 },
  { id: 'nh', name: 'National Hospital', type: 'soc', owner: 'unity', x: 560, y: 560, lvl: 3, decay: 8 },
  { id: 'rc', name: 'Royal College', type: 'soc', owner: 'unity', x: 520, y: 820, lvl: 5, decay: 11 },
  { id: 'cc', name: 'Borella Community Centre', type: 'soc', owner: 'unity', x: 700, y: 640, lvl: 2, decay: 3 },
  { id: 'gn', name: 'Wellawatte GN Office', type: 'soc', owner: 'unity', x: 640, y: 960, lvl: 2, decay: 5 },
  { id: 'kp', name: 'Kollupitiya Police Station', type: 'gov', owner: 'nova', x: 190, y: 900, lvl: 3, decay: 7 },
  { id: 'ds', name: 'Thimbirigasyaya Divisional Secretariat', type: 'gov', owner: 'nova', x: 430, y: 960, lvl: 4, decay: 10 },
  { id: 'bm', name: 'Bambalapitiya Market', type: 'gov', owner: 'nova', x: 250, y: 1040, lvl: 2, decay: 2 },
  { id: 'gt', name: 'Gangaramaya Temple', type: 'gov', owner: 'nova', x: 400, y: 520, lvl: 3, decay: 6 },
  { id: 'fs', name: 'Colombo Fort Railway Station', type: 'env', owner: null, x: 250, y: 250, lvl: 1, decay: 0 },
  { id: 'pb', name: 'Pettah Bus Stand', type: 'env', owner: null, x: 450, y: 220, lvl: 1, decay: 0 },
  { id: 'th', name: 'Colombo Town Hall', type: 'gov', owner: null, x: 470, y: 670, lvl: 1, decay: 0 },
];
const ZONES = [['gf', 'bl', 'vp', 'flora'], ['nh', 'rc', 'cc', 'unity'], ['kp', 'ds', 'bm', 'nova']];

// Host reward table from the "points calculation" section (crowd size x hours).
const REWARDS = [[500, 1500], [1000, 5000], [5000, 17500], [50000, 100000]];
const REWARD_LABELS = [['500', '1,500'], ['1,000', '5,000'], ['5,000', '15,000–20,000'], ['50,000', '100,000+']];
const CROWD_GOAL = [10, 20, 50, 100];

const GIFTS = [
  { id: 'glow', name: 'Glow', icon: '✨', price: 50, minLvl: 7 },
  { id: 'flower', name: 'Flower bouquet', icon: '💐', price: 50, minLvl: 7 },
  { id: 'cap', name: 'Cap', icon: '🧢', price: 100, minLvl: 7 },
  { id: 'bike', name: 'Motor bike', icon: '🏍️', price: 480, minLvl: 8 },
  { id: 'car', name: 'Car', icon: '🚗', price: 998, minLvl: 8 },
];

const PLAYERS = [
  { tag: 'Commander_Kavee', f: 'flora', lvl: 7, pts: 412300 },
  { tag: 'NovaShield', f: 'nova', lvl: 9, pts: 388900 },
  { tag: 'BlueTide_Amaya', f: 'unity', lvl: 8, pts: 301450 },
  { tag: 'Ruwan.exe', f: 'flora', lvl: 6, pts: 254000 },
  { tag: 'Thilini_Unity', f: 'unity', lvl: 5, pts: 198700 },
  { tag: 'GoldenRay', f: 'nova', lvl: 3, pts: 30120 },
  { tag: 'SeaSaver_99', f: 'flora', lvl: 2, pts: 12400 },
];

const HOUR = 3600e3;
const state = {
  faction: 'flora',
  tag: 'EcoNinja_LK',
  level: 4,
  points: 48250,
  energy: 72,
  streak: 6,
  equipped: 'l2',
  portal: 'gf',
  pan: null,
  shared: false,
  lastMission: null,
  missions: [
    { id: 1, title: 'Sunrise Beach Clean-up', portal: 'gf', faction: 'flora', type: 'Cleaning', startsAt: Date.now() + 14 * HOUR + 20 * 60e3, joined: 18, goal: 50, reward: 15000 },
    { id: 2, title: 'School Book Donation Drive', portal: 'rc', faction: 'unity', type: 'Charity', startsAt: Date.now() + 2 * 24 * HOUR, joined: 9, goal: 20, reward: 5000 },
    { id: 3, title: 'Service Quality Check', portal: 'ds', faction: 'nova', type: 'Awareness', startsAt: Date.now() + 4 * 24 * HOUR, joined: 6, goal: 10, reward: 1500 },
    { id: 4, title: 'Beira Lake Plastic Sweep', portal: 'bl', faction: 'flora', type: 'Cleaning', startsAt: Date.now() + 3 * 24 * HOUR, joined: 41, goal: 100, reward: 100000 },
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const fmt = (n) => n.toLocaleString('en-US');
const F = () => FACTIONS[state.faction];
const portalById = (id) => PORTALS.find((p) => p.id === id);
const colorOf = (owner) => (owner ? FACTIONS[owner].color : NEUTRAL);
const viewport = $('#viewport');
let uid = 0;

function toast(icon, title, msg = '') {
  $('#toastIco').textContent = icon;
  $('#toastTitle').textContent = title;
  $('#toastMsg').textContent = msg;
  const t = $('#toast');
  t.classList.add('on');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('on'), 3200);
}

function floatNum(text, x, y) {
  const el = document.createElement('div');
  el.className = 'float-num';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  viewport.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function confetti(color) {
  const r = viewport.getBoundingClientRect();
  for (let i = 0; i < 36; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.background = i % 3 ? color : '#fff';
    c.style.boxShadow = `0 0 8px ${color}`;
    c.style.left = r.width / 2 + 'px';
    c.style.top = r.height * 0.55 + 'px';
    viewport.appendChild(c);
    const a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 140;
    c.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 60}px) scale(.3)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => c.remove();
  }
}

function addPoints(n, why) {
  state.points += n;
  bind();
  if (why) toast('⚡', `+${fmt(n)} Eco-Points`, why);
}

function spendEnergy(n) {
  if (state.energy < n) {
    toast('🔋', 'Not enough Eco-Energy', `Needs ${n}. Walk around and tap glowing particles on the map.`);
    return false;
  }
  state.energy -= n;
  bind();
  return true;
}

// ---------------------------------------------------------------------------
// Theme + data binding
// ---------------------------------------------------------------------------
function setFaction(key) {
  state.faction = key;
  const f = FACTIONS[key];
  document.documentElement.style.setProperty('--accent', f.color);
  document.documentElement.style.setProperty('--accent-rgb', f.rgb);
  $$('#themeSwatches button').forEach((b) => b.classList.toggle('on', b.dataset.f === key));
  bind();
  if (mapBuilt) buildMap();
}

function bind() {
  const f = F();
  const values = {
    icon: f.icon,
    fname: f.short,
    lvl: `LV ${state.level} · ${LEVELS[state.level]}`,
    lvlFull: `LV ${state.level} · ${LEVELS[state.level].toUpperCase()}`,
    energy: state.energy,
    streak: state.streak,
    points: fmt(state.points),
    tag: state.tag,
  };
  $$('[data-bind]').forEach((el) => {
    const k = el.dataset.bind;
    if (k === 'energyBar') el.style.width = state.energy + '%';
    else if (k in values) el.textContent = values[k];
  });
  const sel = $('#levelSelect');
  if (sel) sel.value = state.level;
}

// ---------------------------------------------------------------------------
// Avatar (stylised SVG character; costume changes with kit level)
// ---------------------------------------------------------------------------
function avatarSVG(fKey, kit = 'base', cls = 'avatar') {
  const c = FACTIONS[fKey].color;
  const id = 'g' + (++uid);
  const armor = kit === 'l10', mid = kit === 'l6', trim = kit !== 'base';
  const suit = armor ? '#141414' : mid ? '#1c1c1c' : trim ? '#2b313d' : '#3b4252';
  const skin = '#b07850', hair = '#161616';
  const glow = `filter="url(#${id})"`;
  return `<svg class="${cls}" viewBox="0 0 120 170" aria-hidden="true">
    <defs><filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="44" y="110" width="13" height="46" rx="5" fill="${armor ? '#1b1b1b' : '#252a33'}"/>
    <rect x="63" y="110" width="13" height="46" rx="5" fill="${armor ? '#1b1b1b' : '#252a33'}"/>
    ${trim ? `<rect x="49" y="114" width="3" height="38" rx="1.5" fill="${c}" ${glow}/><rect x="68" y="114" width="3" height="38" rx="1.5" fill="${c}" ${glow}/>` : ''}
    <rect x="41" y="150" width="18" height="10" rx="4" fill="#0e0e0e"/><rect x="61" y="150" width="18" height="10" rx="4" fill="#0e0e0e"/>
    ${armor ? `<rect x="41" y="157" width="18" height="2" fill="${c}" ${glow}/><rect x="61" y="157" width="18" height="2" fill="${c}" ${glow}/>` : ''}
    <path d="M38 64 Q27 82 30 106" stroke="${suit}" stroke-width="11" stroke-linecap="round" fill="none"/>
    <path d="M82 64 Q93 82 90 106" stroke="${suit}" stroke-width="11" stroke-linecap="round" fill="none"/>
    ${mid || armor ? `<path d="M29.5 90 L30 102" stroke="${c}" stroke-width="12" stroke-linecap="round" opacity=".85" ${glow}/><path d="M90.5 90 L90 102" stroke="${c}" stroke-width="12" stroke-linecap="round" opacity=".85" ${glow}/>` : ''}
    ${kit === 'l2' ? `<rect x="25" y="96" width="10" height="5" rx="2" fill="${c}" ${glow}/>` : ''}
    <circle cx="30" cy="109" r="5" fill="${skin}"/><circle cx="90" cy="109" r="5" fill="${skin}"/>
    <path d="M38 62 Q60 54 82 62 L86 112 Q60 118 34 112 Z" fill="${suit}" stroke="${trim ? c : '#4a5263'}" stroke-width="2" ${trim ? glow : ''}/>
    ${kit === 'l2' ? `<path d="M42 62 L76 110" stroke="${c}" stroke-width="3" ${glow}/>` : ''}
    ${mid ? `<path d="M60 60 V114" stroke="${c}" stroke-width="2" ${glow}/><path d="M50 60 L60 70 L70 60" fill="none" stroke="${c}" stroke-width="2"/>` : ''}
    ${armor ? `<path d="M46 70 L74 70 L70 98 L50 98 Z" fill="none" stroke="${c}" stroke-width="2.5" ${glow}/><circle cx="60" cy="83" r="6" fill="${c}" ${glow}/><path d="M36 104 H84" stroke="${c}" stroke-width="2" ${glow}/>` : ''}
    ${mid || armor ? `<ellipse cx="38" cy="64" rx="10" ry="6.5" fill="#202020" stroke="${c}" stroke-width="2" ${glow}/><ellipse cx="82" cy="64" rx="10" ry="6.5" fill="#202020" stroke="${c}" stroke-width="2" ${glow}/>` : ''}
    ${!armor ? `<circle cx="71" cy="74" r="4" fill="${trim ? c : '#6b7385'}" ${trim ? glow : ''}/>` : ''}
    <rect x="55" y="50" width="10" height="9" fill="${skin}"/>
    <circle cx="60" cy="40" r="16" fill="${skin}"/>
    ${armor
      ? `<path d="M42 44 Q42 20 60 20 Q78 20 78 44 L78 50 L42 50 Z" fill="#121212" stroke="${c}" stroke-width="2" ${glow}/><rect x="46" y="35" width="28" height="7" rx="3.5" fill="${c}" ${glow}/>`
      : `<path d="M43 40 Q44 20 61 21 Q79 22 77 40 Q74 31 66 29 Q58 34 47 32 Q44 35 43 40 Z" fill="${hair}"/>
         <circle cx="54" cy="42" r="1.7" fill="#111"/><circle cx="66" cy="42" r="1.7" fill="#111"/>
         <path d="M56 49 Q60 51 64 49" stroke="#5a3a28" stroke-width="1.5" fill="none" stroke-linecap="round"/>`}
  </svg>`;
}

function kitList(fKey) {
  const f = FACTIONS[fKey];
  return [
    { id: 'base', name: `${f.starter} (starter)`, lvl: 1 },
    { id: 'l2', name: f.kits[0], lvl: 2 },
    { id: 'l6', name: f.kits[1], lvl: 6 },
    { id: 'l10', name: f.kits[2], lvl: 10, legendary: true },
  ];
}

function bestKitFor(level) {
  return level >= 10 ? 'l10' : level >= 6 ? 'l6' : level >= 2 ? 'l2' : 'base';
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------
let current = null, splashTimer = null, tickTimer = null;
const onEnter = {
  splash() {
    const bar = $('.loader i');
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = '';
    splashTimer = setTimeout(() => current === 'splash' && go('auth'), 2500);
  },
  faction: renderFactionCards,
  hub() { if (!mapBuilt) buildMap(); },
  report: resetReport,
  organize: renderOrganize,
  participate: renderMissions,
  profile: () => renderProfile('kits'),
  ar: renderAR,
  summary: renderSummary,
  battle: renderBattle,
};

function go(id) {
  if (!document.getElementById(id)) return;
  closeSheet();
  clearTimeout(splashTimer);
  clearInterval(tickTimer);
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
  $$('.flow-nav [data-go]').forEach((b) => b.classList.toggle('on', b.dataset.go === id));
  current = id;
  if (onEnter[id]) onEnter[id]();
}

// ---------------------------------------------------------------------------
// Bottom sheet
// ---------------------------------------------------------------------------
function openSheet(html) {
  $('#sheetBody').innerHTML = html;
  $('#sheetBody').scrollTop = 0;
  $('#sheetBack').classList.add('on');
  $('#sheet').classList.add('on');
}
function closeSheet() {
  $('#sheetBack').classList.remove('on');
  $('#sheet').classList.remove('on');
}

const SHEETS = {
  portal: () => sheetPortal(state.portal),
  leaderboard: () => sheetLeaderboard('district'),
  chat: sheetChat,
  gift: () => sheetGift(PLAYERS[0]),
  otp: sheetOtp,
};
function openNamedSheet(name) {
  if (['splash', 'auth', 'faction', null].includes(current)) go('hub');
  SHEETS[name] && SHEETS[name]();
}

// ---------------------------------------------------------------------------
// 2. Auth
// ---------------------------------------------------------------------------
function startSignup() {
  const tag = $('#gamerTag').value.trim();
  state.tag = tag || 'EcoNinja_LK';
  // A brand-new account starts at Level 1 (Newcomer) with a full energy bar.
  state.level = 1;
  state.points = 0;
  state.energy = 100;
  state.streak = 1;
  state.equipped = 'base';
  bind();
  go('faction');
}

function sheetOtp() {
  openSheet(`
    <h3 style="font-size:16px;margin-bottom:6px">Verify your number</h3>
    <p class="muted" style="font-size:13px;margin-bottom:16px">We sent a 6-digit code to +94 77 ••• ••21</p>
    <div class="otp">${'<input class="field" inputmode="numeric" maxlength="1">'.repeat(6)}</div>
    <div style="height:18px"></div>
    <button class="btn" id="otpVerify">VERIFY</button>
    <p class="muted" style="font-size:12px;text-align:center;margin-top:12px">Demo: any code works</p>`);
  const inputs = $$('.otp input');
  inputs.forEach((inp, i) => inp.addEventListener('input', () => {
    if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
  }));
  setTimeout(() => inputs[0].focus(), 350);
  $('#otpVerify').onclick = () => { closeSheet(); startSignup(); };
}

// ---------------------------------------------------------------------------
// 3. Faction selection
// ---------------------------------------------------------------------------
let pickedFaction = null;
function renderFactionCards() {
  pickedFaction = null;
  const btn = $('#confirmFaction');
  btn.disabled = true;
  btn.textContent = 'SELECT A FACTION';
  $('#factionTrack').innerHTML = Object.values(FACTIONS).map((f) => `
    <button class="faction-card" data-f="${f.key}" style="--fc:${f.color}">
      <div class="avatar-wrap" style="color:${f.color}">${avatarSVG(f.key, 'base')}<div class="pedestal"></div></div>
      <h3>${f.icon} ${f.name}</h3>
      <div class="focus">${f.focus}</div>
      <p>${f.desc}</p>
      <div class="starter">Starter avatar · <b>${f.starter}</b></div>
      <div class="burst"></div>
    </button>`).join('');
  $('#factionTrack').scrollLeft = 0;
  updateDots();
}

function updateDots() {
  const track = $('#factionTrack');
  const idx = Math.round(track.scrollLeft / 296);
  $$('#factionDots i').forEach((d, i) => d.classList.toggle('on', i === Math.min(idx, 2)));
}

function pickFaction(card) {
  const key = card.dataset.f;
  pickedFaction = key;
  $$('.faction-card').forEach((c) => c.classList.toggle('on', c === card));
  const burst = $('.burst', card);
  burst.classList.remove('go');
  void burst.offsetWidth;
  burst.classList.add('go');
  if (navigator.vibrate) navigator.vibrate(30);
  card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  setFaction(key);
  const btn = $('#confirmFaction');
  btn.disabled = false;
  btn.textContent = `JOIN ${FACTIONS[key].short}`;
}

// ---------------------------------------------------------------------------
// 4. Map hub
// ---------------------------------------------------------------------------
let mapBuilt = false;
const particles = Array.from({ length: 22 }, (_, i) => ({
  x: 60 + ((i * 397) % 700),
  y: 80 + ((i * 271) % 960),
  got: false,
}));

function hexPoints(x, y, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 6 + (i * Math.PI) / 3;
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

function buildMap() {
  mapBuilt = true;
  const roads = [
    'M150 0 L160 300 L150 560 L200 800 L220 1100',
    'M260 380 L300 700 L330 1100',
    'M650 0 L640 500 L620 1100',
    'M120 300 Q400 280 800 320',
    'M150 520 Q450 540 800 500',
    'M160 650 Q480 660 800 700',
    'M200 880 Q500 870 800 900',
    'M420 0 L430 400 L470 1100',
  ];
  const zones = ZONES.map(([a, b, c, f]) => {
    const [p1, p2, p3] = [a, b, c].map(portalById);
    const col = FACTIONS[f].color;
    return `<polygon class="zone" points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}" fill="${col}" fill-opacity=".14" stroke="${col}" stroke-opacity=".8" stroke-width="2" filter="url(#glow)"/>`;
  }).join('');

  const flagged = new Set(state.missions.map((m) => m.portal));
  const portals = PORTALS.map((p) => {
    const col = colorOf(p.owner);
    const label = p.name.length > 22 ? p.name.slice(0, 20) + '…' : p.name;
    return `<g class="portal" data-portal="${p.id}">
      <circle cx="${p.x}" cy="${p.y}" r="26" fill="${col}" opacity=".07"/>
      <circle class="ring" cx="${p.x}" cy="${p.y}" r="14" fill="none" stroke="${col}" stroke-width="2"/>
      <polygon class="core" points="${hexPoints(p.x, p.y, 11)}" fill="#0a0d0c" stroke="${col}" stroke-width="2.5" filter="url(#glow)"/>
      <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="${col}"/>
      ${flagged.has(p.id) ? `<text x="${p.x + 10}" y="${p.y - 12}" font-size="14">🚩</text>` : ''}
      <text x="${p.x}" y="${p.y + 32}" text-anchor="middle" font-size="10" fill="#8fa39b" font-family="Inter, sans-serif">${label}</text>
    </g>`;
  }).join('');

  const parts = particles.map((pt, i) => pt.got ? '' :
    `<circle class="particle" data-particle="${i}" cx="${pt.x}" cy="${pt.y}" r="4.5" fill="#b8ffe0" filter="url(#glow)" style="animation-delay:${(i % 6) * 0.4}s"/>`).join('');

  $('#map').innerHTML = `
  <svg id="mapSvg" width="${MAP_W}" height="${MAP_H}" viewBox="0 0 ${MAP_W} ${MAP_H}">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 H0 V40" fill="none" stroke="#14201b" stroke-width="1"/></pattern>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="sweepGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${PLAYER.x} ${PLAYER.y}) scale(200)">
        <stop offset="0" style="stop-color:var(--accent);stop-opacity:.35"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/>
      </radialGradient>
    </defs>
    <rect width="${MAP_W}" height="${MAP_H}" fill="#0a0d0c"/>
    <rect width="${MAP_W}" height="${MAP_H}" fill="url(#grid)"/>
    <path d="M0 0 L110 0 L122 200 L100 400 L112 560 L150 800 L168 1100 L0 1100 Z" fill="#061219" stroke="#0e2a36" stroke-width="2"/>
    <text x="50" y="760" fill="#14394a" font-size="14" font-family="Orbitron, sans-serif" letter-spacing="6" transform="rotate(-90 50 760)">INDIAN OCEAN</text>
    <path d="M300 410 Q350 400 370 440 Q380 480 340 490 Q300 500 296 470 Q290 440 300 410 Z" fill="#0a1f27" stroke="#123744" stroke-width="2"/>
    ${roads.map((d) => `<path d="${d}" fill="none" stroke="#1a2420" stroke-width="12" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#24423a" stroke-width="1.5" stroke-dasharray="8 10"/>`).join('')}
    ${zones}
    ${parts}
    ${portals}
    <g pointer-events="none">
      <path d="M${PLAYER.x} ${PLAYER.y} L${PLAYER.x + 200} ${PLAYER.y} A200 200 0 0 1 ${PLAYER.x + 141} ${PLAYER.y + 141} Z" fill="url(#sweepGrad)">
        <animateTransform attributeName="transform" type="rotate" from="0 ${PLAYER.x} ${PLAYER.y}" to="360 ${PLAYER.x} ${PLAYER.y}" dur="4s" repeatCount="indefinite"/>
      </path>
      <circle cx="${PLAYER.x}" cy="${PLAYER.y}" r="200" fill="none" style="stroke:var(--accent)" stroke-opacity=".12" stroke-dasharray="4 8"/>
      <circle cx="${PLAYER.x}" cy="${PLAYER.y}" r="34" fill="none" style="stroke:var(--accent)" stroke-opacity=".4"/>
      <circle cx="${PLAYER.x}" cy="${PLAYER.y}" r="10" style="fill:var(--accent)" filter="url(#glow)"/>
      <circle cx="${PLAYER.x}" cy="${PLAYER.y}" r="4" fill="#0a0d0c"/>
    </g>
  </svg>`;
  if (!state.pan) recenter(false);
  else applyPan();
}

function clampPan() {
  const m = $('#map');
  const w = m.clientWidth || 366, h = m.clientHeight || 820;
  state.pan.x = Math.min(0, Math.max(w - MAP_W, state.pan.x));
  state.pan.y = Math.min(0, Math.max(h - MAP_H, state.pan.y));
}
function applyPan(animate = false) {
  const svg = $('#mapSvg');
  if (!svg) return;
  clampPan();
  svg.style.transition = animate ? 'transform .5s ease' : 'none';
  svg.style.transform = `translate(${state.pan.x}px, ${state.pan.y}px)`;
}
function recenter(animate = true) {
  const m = $('#map');
  const w = m.clientWidth || 366, h = m.clientHeight || 820;
  state.pan = { x: w / 2 - PLAYER.x, y: h / 2 - PLAYER.y + 20 };
  applyPan(animate);
}

// Drag-to-pan. Uses window listeners (not pointer capture) so taps still reach portals.
const drag = { down: false, moved: false, sx: 0, sy: 0, px: 0, py: 0 };
function initMapDrag() {
  const map = $('#map');
  map.addEventListener('pointerdown', (e) => {
    drag.down = true; drag.moved = false;
    drag.sx = e.clientX; drag.sy = e.clientY;
    drag.px = state.pan.x; drag.py = state.pan.y;
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag.down) return;
    const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (Math.abs(dx) + Math.abs(dy) > 6) { drag.moved = true; map.classList.add('dragging'); }
    if (drag.moved) { state.pan.x = drag.px + dx; state.pan.y = drag.py + dy; applyPan(); }
  });
  window.addEventListener('pointerup', () => { drag.down = false; map.classList.remove('dragging'); });
  map.addEventListener('click', (e) => {
    if (drag.moved) return;
    const p = e.target.closest('[data-portal]');
    const pt = e.target.closest('[data-particle]');
    if (p) { state.portal = p.dataset.portal; sheetPortal(state.portal); }
    else if (pt) collectParticle(pt, e);
  });
}

function collectParticle(el, e) {
  const i = +el.dataset.particle;
  if (particles[i].got) return;
  particles[i].got = true;
  el.classList.add('got');
  setTimeout(() => el.remove(), 500);
  state.energy = Math.min(100, state.energy + 5);
  bind();
  const r = viewport.getBoundingClientRect();
  floatNum('+5 ⚡', e.clientX - r.left - 16, e.clientY - r.top - 20);
}

function sheetPortal(id) {
  const p = portalById(id);
  const t = PORTAL_TYPES[p.type];
  const col = colorOf(p.owner);
  const owner = p.owner ? FACTIONS[p.owner].name : 'Neutral — nobody holds it';
  const mine = p.owner === state.faction;
  const zone = ZONES.find((z) => z.slice(0, 3).includes(p.id));
  const dist = Math.round(Math.hypot(p.x - PLAYER.x, p.y - PLAYER.y) * 2.4);
  const missions = state.missions.filter((m) => m.portal === p.id);

  let status;
  if (mine) status = `Your faction holds this portal. Complete a mission here before it decays to Neutral.`;
  else if (!p.owner) status = `Neutral portal. Go there and complete a mission to capture it for ${F().name}.`;
  else status = `Held by ${FACTIONS[p.owner].name}. Capture it by completing a mission here${zone ? ' — this also breaks their Clean Zone' : ''}.`;

  openSheet(`
    <div class="portal-head">
      <div class="gem" style="border-color:${col};color:${col};box-shadow:0 0 18px ${col}55">${t.icon}</div>
      <div><div class="label" style="margin:0">${t.name}</div><h3>${p.name}</h3>
      <small class="muted">${owner} · ${dist} m away</small></div>
    </div>
    <div class="stat-grid">
      <div class="stat"><b style="color:${col}">P-LV ${p.lvl}</b><small>Portal level</small></div>
      <div class="stat"><b>${p.owner ? p.decay + 'd' : '—'}</b><small>Until decay</small></div>
      <div class="stat"><b>${zone ? 'Active' : 'None'}</b><small>Clean Zone</small></div>
    </div>
    <div class="note">ℹ️ <span>${status}</span></div>
    ${missions.length ? `<div style="height:12px"></div><div class="label">Missions here</div>${missions.map((m) => `<div class="card row" style="padding:12px;margin-bottom:8px"><span>🚩</span><span style="font-size:13px;flex:1">${m.title}</span><span class="pill">${m.joined}/${m.goal}</span></div>`).join('')}` : ''}
    <div class="action-row">
      <button class="btn ghost" data-go="report">📋 Report here</button>
      <button class="btn ghost" data-go="organize">🎯 Organize here</button>
    </div>
    <div style="height:10px"></div>
    ${mine ? '' : `<button class="btn ghost" id="captureBtn" style="margin-bottom:10px">⚡ Capture for ${F().short}</button>`}
    <button class="btn" data-go="ar">VIEW IN AR</button>`);
  const cap = $('#captureBtn');
  if (cap) cap.onclick = () => {
    if (state.level < 2) return toast('🔒', 'Capturing unlocks at Level 2', 'Report and participate to reach Trainee.');
    toast('📍', 'Capture started', 'Organize or join a mission at this portal to claim it.');
    go('organize');
  };
}

// ---------------------------------------------------------------------------
// 5.1 Report
// ---------------------------------------------------------------------------
function sceneSVG(clean = false) {
  const litter = clean ? '' : `
    <g opacity=".95">
      <rect x="70" y="600" width="26" height="12" rx="4" fill="#d9e6f2" transform="rotate(-20 83 606)"/>
      <rect x="250" y="640" width="30" height="13" rx="5" fill="#9fd3ff" transform="rotate(15 265 646)"/>
      <path d="M150 680 q20 -30 45 -5 q10 25 -20 30 q-30 0 -25 -25z" fill="#f2f2f2" opacity=".85"/>
      <rect x="300" y="580" width="18" height="24" rx="3" fill="#e34b4b"/>
      <path d="M40 700 q30 -20 60 0 q-10 20 -60 0z" fill="#3d7bd9"/>
      <circle cx="210" cy="590" r="7" fill="#f2c94c"/>
      <rect x="120" y="560" width="20" height="9" rx="3" fill="#c8f7c5" transform="rotate(35 130 564)"/>
    </g>`;
  return `<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky${clean ? 'c' : 'd'}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${clean ? '#3c8fd6' : '#5a6b78'}"/><stop offset="1" stop-color="${clean ? '#f6c98b' : '#a89a86'}"/></linearGradient>
    </defs>
    <rect width="390" height="460" fill="url(#sky${clean ? 'c' : 'd'})"/>
    <circle cx="300" cy="200" r="40" fill="${clean ? '#ffe8a3' : '#d8d2c4'}" opacity=".8"/>
    <rect y="420" width="390" height="90" fill="${clean ? '#1f6fa8' : '#3e5a6b'}"/>
    <path d="M0 470 Q100 455 200 470 T390 470 V510 H0Z" fill="${clean ? '#5fb3e0' : '#6b8794'}" opacity=".7"/>
    <rect y="505" width="390" height="340" fill="${clean ? '#e9cf9b' : '#b8a37e'}"/>
    <path d="M0 520 Q195 500 390 520" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>
    <g fill="#2f5b2a"><path d="M20 505 l6 -90 l6 90z"/><path d="M8 430 q20 -15 40 0 q-20 -5 -40 0z"/></g>
    ${litter}
  </svg>`;
}

function resetReport() {
  const p = portalById(state.portal);
  $('#reportPlace').textContent = p ? p.name : 'Current location';
  $('#camera').innerHTML = sceneSVG(false);
  $('#camera').classList.remove('dim');
  $('#viewfinder').style.display = '';
  $('#camControls').style.display = '';
  $('#reportForm').classList.remove('on');
  $('#reportNote').value = '';
}

function captureReport() {
  const f = $('#flash');
  f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
  if (navigator.vibrate) navigator.vibrate(20);
  const cat = $('#reportCats .chip.on');
  $('#reportCatPill').textContent = cat.textContent.trim().replace('Environment', 'Environmental');
  $('#viewfinder').style.display = 'none';
  $('#camControls').style.display = 'none';
  $('#camera').classList.add('dim');
  $('#reportForm').classList.add('on');
}

function submitReport() {
  if (!spendEnergy(10)) return;
  state.points += 500;
  bind();
  go('hub');
  toast('📋', 'Report submitted · +500', 'Pending verification by a Level 3+ Inspector (+1,000 bonus).');
}

// ---------------------------------------------------------------------------
// 5.2 Organize
// ---------------------------------------------------------------------------
const org = { type: 'Cleaning', time: '7:00 AM', crowd: 0, hours: 0, date: null, month: null };

function renderOrganize() {
  const p = portalById(state.portal) || PORTALS[0];
  const col = colorOf(p.owner);
  $('#orgPortal').innerHTML = `
    <div class="gem" style="width:44px;height:44px;border-radius:14px;display:grid;place-items:center;border:2px solid ${col};color:${col}">${PORTAL_TYPES[p.type].icon}</div>
    <div style="flex:1"><b style="font-size:14px">${p.name}</b><br><small class="muted">${PORTAL_TYPES[p.type].name} · P-LV ${p.lvl}</small></div>
    <button class="pill" id="orgChange">Change</button>`;
  $('#orgChange').onclick = () => {
    const i = PORTALS.findIndex((x) => x.id === p.id);
    state.portal = PORTALS[(i + 1) % PORTALS.length].id;
    renderOrganize();
  };
  if (!org.date) {
    const t = new Date();
    org.date = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1);
    org.month = new Date(t.getFullYear(), t.getMonth(), 1);
  }
  renderCalendar();
  updateReward();

  const note = $('#orgNote'), btn = $('#createMission');
  if (state.level < 4) {
    note.textContent = `Hosting events unlocks at Level 4 (Guardian). You are Level ${state.level} (${LEVELS[state.level]}). Report and participate to level up.`;
    btn.disabled = true;
    btn.textContent = 'UNLOCKS AT LEVEL 4';
  } else {
    note.textContent = state.level === 4
      ? 'As a Level 4 Guardian, your mission needs approval from a Level 5+ player before it goes live.'
      : `Level ${state.level} ${LEVELS[state.level]}s host without approval — it goes live on the map instantly.${state.level >= 7 ? ' You can also attach a Funding / Material Request.' : ''}`;
    btn.disabled = false;
    btn.textContent = 'CREATE MISSION';
  }
}

function renderCalendar() {
  const m = org.month;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  $('#calTitle').textContent = m.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const first = m.getDay();
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  let html = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => `<div class="dow">${d}</div>`).join('');
  html += '<div></div>'.repeat(first);
  for (let d = 1; d <= days; d++) {
    const date = new Date(m.getFullYear(), m.getMonth(), d);
    const cls = [date.getTime() === today.getTime() ? 'today' : '', org.date && date.getTime() === org.date.getTime() ? 'on' : ''].join(' ');
    html += `<button class="${cls}" data-day="${d}" ${date < today ? 'disabled' : ''}>${d}</button>`;
  }
  $('#calendar').innerHTML = html;
}

function updateReward() {
  $('#orgReward').textContent = REWARD_LABELS[org.crowd][org.hours];
}

function createMission() {
  if (!spendEnergy(20)) return;
  const p = portalById(state.portal);
  const needsApproval = state.level === 4;
  state.missions.unshift({
    id: Date.now(), title: `${p.name.split(' ')[0]} ${org.type} Mission`, portal: p.id, faction: state.faction, type: org.type,
    startsAt: new Date(org.date.getFullYear(), org.date.getMonth(), org.date.getDate(), ...to24(org.time)).getTime(),
    joined: 1, goal: CROWD_GOAL[org.crowd], reward: REWARDS[org.crowd][org.hours], pending: needsApproval,
  });
  buildMap();
  go('hub');
  toast('🎯', needsApproval ? 'Mission sent for approval' : 'Mission published!',
    `${org.type} · ${org.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${org.time} at ${p.name}`);
}

function to24(t) {
  const [hm, ap] = t.split(' ');
  let [h, m] = hm.split(':').map(Number);
  if (ap === 'PM' && h < 12) h += 12;
  return [h, m];
}

// ---------------------------------------------------------------------------
// 5.3 Participate
// ---------------------------------------------------------------------------
function timeLeft(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return d ? `${d}d ${h}h ${m}m` : `${h}h ${String(m).padStart(2, '0')}m ${String(sec).padStart(2, '0')}s`;
}

function renderMissions() {
  $('#missionCount').textContent = `${state.missions.length} nearby`;
  $('#missionList').innerHTML = state.missions.map((m) => {
    const f = FACTIONS[m.faction], p = portalById(m.portal);
    const cross = m.faction !== state.faction;
    const pts = cross ? Math.round(m.reward / 2) : m.reward;
    return `<div class="card mission" style="--mc:${f.color}">
      <div class="row"><span class="pill" style="color:${f.color}">${f.icon} ${f.short}</span>
        <span class="pill">${m.type}</span>
        ${m.pending ? '<span class="pill" style="color:#ffb020">Awaiting approval</span>' : ''}
        ${cross ? '<span class="pill muted">Cross-faction</span>' : ''}</div>
      <h3>${m.title}</h3>
      <small class="muted">📍 ${p.name}</small>
      <div class="meta"><span>👥 ${m.joined}/${m.goal}</span><span>⏱ <span data-countdown="${m.startsAt}">${timeLeft(m.startsAt - Date.now())}</span></span><span style="color:${f.color}">⚡ ${fmt(pts)}${cross ? ' (reduced)' : ''}</span></div>
      <div class="progress"><i style="width:${Math.min(100, (m.joined / m.goal) * 100)}%"></i></div>
      <button class="btn" data-join="${m.id}" ${m.pending ? 'disabled' : ''}>JOIN MISSION</button>
    </div>`;
  }).join('');
  tickTimer = setInterval(() => {
    $$('[data-countdown]').forEach((el) => { el.textContent = timeLeft(+el.dataset.countdown - Date.now()); });
  }, 1000);
}

function qrArt() {
  let cells = '';
  const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#000"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#000"/>`;
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    if (!inFinder && ((x * 7 + y * 13 + x * y) % 3 === 0)) cells += `<rect x="${x}" y="${y}" width="1" height="1" fill="#000"/>`;
  }
  return `<rect width="21" height="21" fill="#fff"/>${cells}${finder(0, 0)}${finder(14, 0)}${finder(0, 14)}`;
}

let joining = null, qrTimer = null;
function joinMission(id) {
  joining = state.missions.find((m) => m.id === id);
  if (!spendEnergy(5)) return;
  $('#qrArt').innerHTML = qrArt();
  $('#qrStep1').style.display = '';
  $('#qrStep2').style.display = 'none';
  $('#qrScan').classList.add('on');
  clearTimeout(qrTimer);
  qrTimer = setTimeout(() => {
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
    joining.joined++;
    $('#qrMissionName').textContent = joining.title;
    $('#qrStep1').style.display = 'none';
    $('#qrStep2').style.display = '';
  }, 2200);
}

// ---------------------------------------------------------------------------
// 6. Profile, wallet, gifting
// ---------------------------------------------------------------------------
function renderProfile(tab) {
  $('#profileAvatar').innerHTML = avatarSVG(state.faction, state.equipped, 'avatar big') + '<div class="pedestal"></div>';
  $$('#profileTabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
  const el = $('#profileTab');
  const f = F();

  if (tab === 'kits') {
    el.innerHTML = `<div class="grid2">${kitList(state.faction).map((k) => {
      const locked = state.level < k.lvl;
      return `<button class="item ${locked ? 'locked' : ''} ${state.equipped === k.id ? 'equipped' : ''}" data-kit="${k.id}" data-lvl="${k.lvl}">
        ${k.legendary ? '<span class="tag">LEGENDARY</span>' : ''}
        ${locked ? `<span class="lock">🔒 LV ${k.lvl}</span>` : ''}
        <div class="thumb">${avatarSVG(state.faction, k.id, 'thumb-av')}</div>
        <h4>${k.name}</h4><small>${state.equipped === k.id ? 'Equipped' : locked ? `Unlocks at ${LEVELS[k.lvl]}` : 'Tap to equip'}</small>
      </button>`;
    }).join('')}</div>`;
  }

  if (tab === 'badges') {
    const badges = [
      { lvl: 3, name: `${f.short} Badge`, note: 'Basic profile badge' },
      { lvl: 8, name: 'Strategist Badge', note: 'Upgraded profile badge' },
      { lvl: 10, name: 'Clean Warrior', note: 'National title · legendary' },
    ];
    el.innerHTML = `<div class="grid2">${badges.map((b) => {
      const locked = state.level < b.lvl;
      return `<div class="item ${locked ? 'locked' : ''}">
        ${locked ? `<span class="lock">🔒 LV ${b.lvl}</span>` : ''}
        <div class="thumb" style="height:96px"><svg class="badge-art" viewBox="0 0 84 84">
          <polygon points="${hexPoints(42, 42, 36)}" fill="#111" stroke="${f.color}" stroke-width="3"/>
          <polygon points="${hexPoints(42, 42, 26)}" fill="none" stroke="${f.color}" stroke-opacity=".5" stroke-width="2"/>
          <text x="42" y="50" text-anchor="middle" font-size="${b.lvl === 10 ? 22 : 24}" font-family="Orbitron, sans-serif" font-weight="900" fill="${f.color}">${b.lvl === 10 ? '🏆' : b.lvl}</text>
        </svg></div>
        <h4>${b.name}</h4><small>${locked ? `Unlocks at Level ${b.lvl}` : b.note}</small>
      </div>`;
    }).join('')}
      <div class="item"><div class="thumb" style="height:96px;font-size:54px">${f.icon}</div><h4>${f.name} Emblem</h4><small>Faction member</small></div>
    </div>`;
  }

  if (tab === 'wallet') {
    const qr = `<svg viewBox="0 0 21 21">${qrArt()}</svg>`;
    el.innerHTML = `
      <div class="card row" style="margin-bottom:14px">
        <div style="flex:1"><div class="label" style="margin-bottom:4px">Balance</div><b class="head neon-text" style="font-size:22px">${fmt(state.points)}</b><small class="muted"> Eco-Points</small></div>
        <span class="pill">🔥 ${state.streak}-day streak</span>
      </div>
      <div class="label">Reward vouchers</div>
      <div class="voucher"><div class="qr">${qr}</div><div><h4>Keells · 10% off groceries</h4><small>Zone Battle reward · Sep 2026</small><small>Show this QR at checkout · expires 31 Oct</small></div></div>
      <div class="voucher"><div class="qr">${qr}</div><div><h4>Thilakawardhana · Rs. 1,000</h4><small>Top 100 player reward</small><small>Expires 15 Nov</small></div></div>
      <div class="label" style="margin-top:18px">Invite friends</div>
      <div class="card">
        <div class="row"><div class="voucher qr" style="width:64px;height:64px;padding:5px;background:#fff;border-radius:10px">${qr}</div>
        <div style="flex:1"><b style="font-size:13px">cleanwarriors.lk/i/${state.tag.toUpperCase().replace(/[^A-Z0-9]/g, '')}</b><br>
        <small class="muted">Earn a 10,000 Recruiter Bonus when they finish their first mission.</small></div></div>
      </div>`;
  }
}

function sheetGift(player) {
  const f = FACTIONS[player.f];
  let pick = GIFTS.find((g) => player.lvl >= g.minLvl) || null;
  const draw = () => {
    openSheet(`
      <div class="lb-row" style="padding:0 0 10px">
        <div class="av" style="border-color:${f.color};color:${f.color}">${f.icon}</div>
        <div class="who"><b>${player.tag}</b><small>${f.name} · LV ${player.lvl} ${LEVELS[player.lvl]}</small></div>
        <span class="pts" style="color:${f.color}">${fmt(player.pts)}</span>
      </div>
      <h3 style="font-size:15px;margin-top:6px">Send a virtual Eco-Gift</h3>
      <p class="muted" style="font-size:12px;margin-top:4px">Can't join in person? Gifts fund the missions this warrior hosts.</p>
      ${player.lvl < 7 ? `<div class="note" style="margin-top:14px">🔒 <span>Eco-Gifts can be sent to Level 7+ mission hosts. ${player.tag} is Level ${player.lvl}.</span></div>` : `
      <div class="gift-grid">${GIFTS.map((g) => {
        const ok = player.lvl >= g.minLvl;
        return `<button class="gift ${pick && pick.id === g.id ? 'on' : ''}" data-gift="${g.id}" ${ok ? '' : 'disabled style="opacity:.35"'}>
          <div class="g">${g.icon}</div><h4>${g.name}</h4><small>${ok ? 'Rs. ' + g.price : 'LV ' + g.minLvl + '+'}</small></button>`;
      }).join('')}</div>
      <button class="btn" id="sendGift">SEND ${pick.name.toUpperCase()} · Rs. ${pick.price}</button>`}
    `);
    $$('[data-gift]').forEach((b) => b.onclick = () => { pick = GIFTS.find((g) => g.id === b.dataset.gift); draw(); });
    const send = $('#sendGift');
    if (send) send.onclick = () => {
      closeSheet();
      confetti(f.color);
      if (navigator.vibrate) navigator.vibrate(40);
      toast(pick.icon, `${pick.name} sent to ${player.tag}`, `Rs. ${pick.price} goes to the Clean Sri Lanka Fund (shown in the public ledger).`);
    };
  };
  draw();
}

// ---------------------------------------------------------------------------
// Leaderboard + squad chat
// ---------------------------------------------------------------------------
function sheetLeaderboard(scope) {
  const me = { tag: state.tag, f: state.faction, lvl: state.level, pts: state.points, me: true };
  let list = [...PLAYERS, me];
  if (scope === 'national') list = list.map((p) => (p.me ? p : { ...p, pts: Math.round(p.pts * 3.1) }));
  list.sort((a, b) => b.pts - a.pts);
  openSheet(`
    <div class="row" style="margin-bottom:10px"><h3 style="font-size:16px;flex:1">Leaderboard</h3></div>
    <div class="tabs" style="margin:0 0 12px">
      <button class="${scope === 'district' ? 'on' : ''}" data-lb="district">Colombo District</button>
      <button class="${scope === 'national' ? 'on' : ''}" data-lb="national">National</button>
    </div>
    ${list.map((p, i) => {
      const f = FACTIONS[p.f];
      return `<button class="lb-row ${p.me ? 'me' : ''}" style="width:100%;text-align:left" data-player="${p.me ? '' : p.tag}">
        <span class="rank">${i + 1}</span>
        <div class="av" style="border-color:${f.color};color:${f.color}">${f.icon}</div>
        <div class="who"><b>${p.tag}${p.me ? ' (you)' : ''}</b><small>LV ${p.lvl} · ${LEVELS[p.lvl]}</small></div>
        <span class="pts" style="color:${f.color}">${fmt(p.pts)}</span>
      </button>`;
    }).join('')}
    <p class="muted" style="font-size:12px;text-align:center;margin-top:10px">Tap a player to send an Eco-Gift</p>`);
  $$('[data-lb]').forEach((b) => b.onclick = () => sheetLeaderboard(b.dataset.lb));
  $$('[data-player]').forEach((b) => b.onclick = () => {
    const p = PLAYERS.find((x) => x.tag === b.dataset.player);
    if (p) sheetGift(p);
  });
}

const chatLog = [
  { who: 'Commander_Kavee', text: 'Sunrise clean-up at Galle Face tomorrow 7AM. Bring gloves 🧤' },
  { who: 'SeaSaver_99', text: "In! Unity is trying to take Beira Lake — we need to defend it this week." },
  { who: 'Ruwan.exe', text: 'I reported the plastic pile near the north end, waiting for verify ✅' },
];
function sheetChat() {
  const render = () => {
    openSheet(`
      <div class="row" style="margin-bottom:12px"><div style="flex:1"><h3 style="font-size:16px">Beach Cleaners Squad</h3><small class="muted">${F().name} · 12 online</small></div><span class="pill">💬</span></div>
      <div id="chatMsgs">${chatLog.map((m) => `<div class="msg ${m.me ? 'me' : ''}">${m.me ? '' : `<small>${m.who}</small>`}${m.text}</div>`).join('')}</div>
      <div class="chat-input"><input class="field" id="chatText" placeholder="Message your squad…" autocomplete="off"><button class="btn" style="width:auto;padding:0 18px" id="chatSend">➤</button></div>`);
    const send = () => {
      const v = $('#chatText').value.trim();
      if (!v) return;
      chatLog.push({ who: state.tag, text: v, me: true });
      render();
      $('#sheetBody').scrollTop = 1e6;
    };
    $('#chatSend').onclick = send;
    $('#chatText').addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  };
  render();
}

// ---------------------------------------------------------------------------
// 7. AR
// ---------------------------------------------------------------------------
function renderAR() {
  const p = portalById(state.portal);
  const owner = p.owner ? FACTIONS[p.owner] : null;
  const ar = $('#ar');
  ar.style.setProperty('--accent', owner ? owner.color : NEUTRAL);
  ar.style.setProperty('--accent-rgb', owner ? owner.rgb : '214, 214, 224');
  $('#arFlag').textContent = owner ? owner.icon : '⚪';
  $('#arName').textContent = p.name;
  $('#arType').textContent = `${PORTAL_TYPES[p.type].icon} ${PORTAL_TYPES[p.type].name}`;
  $('#arLevel').textContent = `P-LV ${p.lvl}`;
  const zone = ZONES.find((z) => z.slice(0, 3).includes(p.id));
  $('#arOwner').textContent = owner
    ? `Controlled by ${owner.name}${zone ? ' · inside an active Clean Zone' : ''}`
    : 'Neutral — no faction holds this place yet';
}

// ---------------------------------------------------------------------------
// 8. Summary + Zone battle
// ---------------------------------------------------------------------------
function renderSummary() {
  const m = state.lastMission || state.missions.find((x) => x.faction === state.faction) || state.missions[0];
  const pts = m.faction === state.faction ? m.reward : Math.round(m.reward / 2);
  $('#sumPill').textContent = '+' + fmt(pts);
  $('#sumPts').textContent = '+' + fmt(pts);
  $('#sumTitle').textContent = m.title;
  $('#collage').innerHTML = `
    <div class="ph">${sceneSVG(false)}<span>BEFORE</span></div>
    <div class="ph">${sceneSVG(true)}<span>AFTER</span></div>
    <div class="watermark">CLEANWARRIORS · ${F().short}</div>`;
}

function shareTo(where) {
  if (!state.shared) {
    state.shared = true;
    state.points += 10000;
    bind();
  }
  toast('🚀', `Exported to ${where}`, 'Post with #CleanWarriorsLK — +10,000 bonus once detected.');
}

function renderBattle() {
  const split = [['flora', 41], ['unity', 34], ['nova', 25]];
  $('#battleBar').innerHTML = split.map(([k, v]) => `<div style="flex:${v};background:${FACTIONS[k].color}">${v}%</div>`).join('');
  $('#battleLegend').innerHTML = split.map(([k]) => `<span>${FACTIONS[k].icon} ${FACTIONS[k].short}${k === state.faction ? ' (you)' : ''}</span>`).join('');
  const tick = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    let s = Math.floor((end - now) / 1000);
    const parts = [['Days', 86400], ['Hours', 3600], ['Min', 60], ['Sec', 1]].map(([l, n]) => {
      const v = Math.floor(s / n); s -= v * n;
      return `<div><b>${String(v).padStart(2, '0')}</b><small>${l}</small></div>`;
    });
    $('#countdown').innerHTML = parts.join('');
  };
  tick();
  tickTimer = setInterval(tick, 1000);
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
document.addEventListener('click', (e) => {
  const goBtn = e.target.closest('[data-go]');
  if (goBtn) { go(goBtn.dataset.go); return; }
  const sh = e.target.closest('[data-sheet]');
  if (sh) { openNamedSheet(sh.dataset.sheet); return; }

  const auth = e.target.closest('[data-auth]');
  if (auth) { auth.dataset.auth === 'phone' ? sheetOtp() : startSignup(); return; }

  const fc = e.target.closest('.faction-card');
  if (fc) { pickFaction(fc); return; }

  const cat = e.target.closest('#reportCats .chip');
  if (cat) { $$('#reportCats .chip').forEach((c) => c.classList.toggle('on', c === cat)); return; }

  const chip = e.target.closest('#orgType .chip, #orgTime .chip, #orgCrowd .chip, #orgHours .chip');
  if (chip) {
    const group = chip.parentElement;
    $$('.chip', group).forEach((c) => c.classList.toggle('on', c === chip));
    const v = chip.dataset.v;
    if (group.id === 'orgType') org.type = v;
    if (group.id === 'orgTime') org.time = v;
    if (group.id === 'orgCrowd') org.crowd = +v;
    if (group.id === 'orgHours') org.hours = +v;
    updateReward();
    return;
  }

  const day = e.target.closest('[data-day]');
  if (day) { org.date = new Date(org.month.getFullYear(), org.month.getMonth(), +day.dataset.day); renderCalendar(); return; }

  const join = e.target.closest('[data-join]');
  if (join) { joinMission(+join.dataset.join); return; }

  const tab = e.target.closest('#profileTabs [data-tab]');
  if (tab) { renderProfile(tab.dataset.tab); return; }

  const kit = e.target.closest('[data-kit]');
  if (kit) {
    const lvl = +kit.dataset.lvl;
    if (state.level < lvl) toast('🔒', `Unlocks at Level ${lvl}`, `Reach ${LEVELS[lvl]} to wear this.`);
    else { state.equipped = kit.dataset.kit; renderProfile('kits'); }
    return;
  }

  const share = e.target.closest('[data-share]');
  if (share) { shareTo(share.dataset.share); }
});

$('#sheetBack').addEventListener('click', closeSheet);
$('#factionTrack').addEventListener('scroll', updateDots, { passive: true });
$('#confirmFaction').addEventListener('click', () => {
  if (!pickedFaction) return;
  setFaction(pickedFaction);
  state.equipped = bestKitFor(state.level);
  go('hub');
  toast(F().icon, `Welcome to ${F().name}!`, `Starter avatar ${F().starter} unlocked. Tap glowing particles to collect Eco-Energy.`);
});
$('#recenter').addEventListener('click', () => recenter(true));
$('#shutter').addEventListener('click', captureReport);
$('#retake').addEventListener('click', resetReport);
$('#submitReport').addEventListener('click', submitReport);
$('#calPrev').addEventListener('click', () => {
  const now = new Date();
  const prev = new Date(org.month.getFullYear(), org.month.getMonth() - 1, 1);
  if (prev >= new Date(now.getFullYear(), now.getMonth(), 1)) { org.month = prev; renderCalendar(); }
});
$('#calNext').addEventListener('click', () => { org.month = new Date(org.month.getFullYear(), org.month.getMonth() + 1, 1); renderCalendar(); });
$('#createMission').addEventListener('click', createMission);
$('#qrCancel').addEventListener('click', () => { clearTimeout(qrTimer); $('#qrScan').classList.remove('on'); });
$('#qrDone').addEventListener('click', () => { $('#qrScan').classList.remove('on'); renderMissions(); });
$('#finishMission').addEventListener('click', () => {
  $('#qrScan').classList.remove('on');
  state.lastMission = joining;
  const pts = joining.faction === state.faction ? joining.reward : Math.round(joining.reward / 2);
  state.points += pts;
  bind();
  go('summary');
});
$('#shareAll').addEventListener('click', () => shareTo('TikTok, Reels & Facebook'));
$('#arPhoto').addEventListener('click', () => {
  const f = $('#flash');
  f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
  toast('📸', 'AR snapshot saved', 'Share it to prove your faction holds this place.');
});
$('#inviteBtn').addEventListener('click', () => {
  const link = `https://cleanwarriors.lk/i/${state.tag.toUpperCase().replace(/[^A-Z0-9]/g, '')}`;
  if (navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
  toast('🔗', 'Invite link copied', 'Friends who join and finish a mission earn you 10,000 points.');
});
$$('#themeSwatches button').forEach((b) => b.addEventListener('click', () => {
  setFaction(b.dataset.f);
  if (onEnter[current] && !['splash', 'hub'].includes(current)) onEnter[current]();
}));
$('#levelSelect').addEventListener('change', (e) => {
  state.level = +e.target.value;
  state.equipped = bestKitFor(state.level);
  bind();
  if (onEnter[current] && !['splash', 'hub'].includes(current)) onEnter[current]();
  toast('🎚️', `Demo player set to Level ${state.level}`, LEVELS[state.level]);
});

function tickClock() {
  const d = new Date();
  $('#clock').textContent = `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// Deep links for review, e.g. index.html#profile&f=unity&lvl=10&sheet=gift
function boot() {
  $('#levelSelect').innerHTML = LEVELS.slice(1).map((n, i) => `<option value="${i + 1}">LV ${i + 1} · ${n}</option>`).join('');
  const params = new URLSearchParams(location.hash.slice(1).replace(/^([a-z]+)/, 'screen=$1'));
  const f = params.get('f');
  const lvl = +params.get('lvl');
  if (lvl >= 1 && lvl <= 10) { state.level = lvl; state.equipped = bestKitFor(lvl); }
  setFaction(FACTIONS[f] ? f : 'flora');
  initMapDrag();
  tickClock();
  setInterval(tickClock, 15000);
  const screen = params.get('screen');
  go(screen && document.getElementById(screen) ? screen : 'splash');
  const sheet = params.get('sheet');
  if (sheet && SHEETS[sheet]) {
    if (sheet === 'portal' && params.get('p')) state.portal = params.get('p');
    SHEETS[sheet]();
  }
  document.documentElement.setAttribute('data-ready', current);
}
boot();
