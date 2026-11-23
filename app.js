// Clean Sri Lanka හරිත මාවත - Interactive Prototype Logic

const I18N = {
  si: {
    langLabel: 'සිංහල',
    welcomeSub: 'ශ්‍රී ලංකාවේ හරිත අනාගතය සුරකින ඩිජිටල් මාවතට සාදරයෙන් පිළිගනිමු.',
    selectLangPrompt: 'ඔබගේ භාෂාව තෝරන්න',
    nextBtn: 'ඉදිරියට යන්න',
    profileHelperTitle: 'ඔබගේ තොරතුරු ඇතුළත් කර හරිත ආරක්ෂකයෙකු ලෙස ලියාපදිංචි වන්න.',
    nameHelp: 'ඔබගේ සම්පූර්ණ නම ඇතුළත් කරන්න',
    addressHelp: 'ඔබගේ පදිංචි ලිපිනය ඇතුළත් කරන්න',
    districtHelp: 'ඔබගේ දිස්ත්‍රික්කය තෝරන්න',
    dsHelp: 'ප්‍රාදේශීය ලේකම් කොට්ඨාසය තෝරන්න',
    emailHelp: 'විද්‍යුත් තැපැල් ලිපිනය (උදා: name@mail.com)',
    phoneHelp: 'ජංගම දුරකථන අංකය (07X XXX XXXX)',
    gpsTitle: 'ඉස්සරහට යන්න GPS සක්‍රීය කරන්න',
    gpsVerified: 'GPS ස්ථානය තහවුරු කරන ලදී! (6.9061° N, 79.9196° E)',
    moveCloserToast: 'ගස සක්‍රීය කිරීමට ළඟට යන්න! (Move closer: within 5-10m)',
    proximityActiveMsg: 'ඔබ ගස අසල සිටී! නඩත්තු කිරීමට ගස මත ටැප් කරන්න.',
    proximityInactiveMsg: 'ගසෙන් දුරින් සිටී — සක්‍රීය කිරීමට මීටර් 10ක් ඇතුළතට යන්න.',
    waterSub: 'වතුර දැමීම',
    fertSub: 'පොහොර දැමීම',
    fenceSub: 'වැටක් ගැසීම',
  },
  ta: {
    langLabel: 'தமிழ்',
    welcomeSub: 'இலங்கையின் பசுமை எதிர்காலத்தை பாதுகாக்கும் டிஜிட்டல் பாதைக்கு வரவேற்கிறோம்.',
    selectLangPrompt: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    nextBtn: 'அடுத்தது',
    profileHelperTitle: 'பசுமைப் பாதுகாவலராகப் பதிவு செய்ய உங்கள் விவரங்களை உள்ளிடவும்.',
    nameHelp: 'உங்கள் முழுப் பெயரை உள்ளிடவும்',
    addressHelp: 'உங்கள் வீட்டு முகவரியை உள்ளிடவும்',
    districtHelp: 'உங்கள் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    dsHelp: 'பிரதேச செயலகப் பிரிவைத் தேர்ந்தெடுக்கவும்',
    emailHelp: 'மின்னஞ்சல் முகவரியை உள்ளிடவும்',
    phoneHelp: 'கைபேசி எண்ணை உள்ளிடவும் (07X XXX XXXX)',
    gpsTitle: 'தொடர GPS ஐ இயக்கவும்',
    gpsVerified: 'GPS இருப்பிடம் உறுதிப்படுத்தப்பட்டது! (6.9061° N, 79.9196° E)',
    moveCloserToast: 'மரத்தை இயக்க அருகில் செல்லவும்! (Move closer: within 5-10m)',
    proximityActiveMsg: 'நீங்கள் மரத்தின் அருகில் உள்ளீர்கள்! பராமரிக்க தட்டவும்.',
    proximityInactiveMsg: 'மரத்திலிருந்து தூரத்தில் உள்ளீர்கள் — 10மீ அருகில் செல்லவும்.',
    waterSub: 'நீர் ஊற்றுதல்',
    fertSub: 'உரமிடுதல்',
    fenceSub: 'வேலி அமைத்தல்',
  },
  en: {
    langLabel: 'English',
    welcomeSub: 'Welcome to Sri Lanka’s smart citizen-led reforestation & tree care network.',
    selectLangPrompt: 'Choose your preferred language',
    nextBtn: 'Next',
    profileHelperTitle: 'Complete your Green Guardian profile and enable GPS verification.',
    nameHelp: 'Enter your full legal or display name',
    addressHelp: 'Enter your residential street address',
    districtHelp: 'Select your administrative district',
    dsHelp: 'Select your Divisional Secretariat (DS) division',
    emailHelp: 'Enter an active email address for updates',
    phoneHelp: 'Enter your Sri Lankan mobile number (07X XXX XXXX)',
    gpsTitle: 'Enable GPS location access to continue',
    gpsVerified: 'Live GPS Locked! (6.9061° N, 79.9196° E • Accuracy ±4m)',
    moveCloserToast: 'Move closer to the tree to activate! (Within 5–10m required)',
    proximityActiveMsg: 'Proximity Reached (6m)! Tap a glowing tree to maintain it.',
    proximityInactiveMsg: 'Out of range (45m) — Walk within 10m to unlock tree actions.',
    waterSub: 'Hydrate Roots',
    fertSub: 'Add Nutrients',
    fenceSub: 'Guard Shield',
  }
};

const DISTRICTS = {
  'Colombo': ['Sri Jayawardenepura Kotte', 'Colombo', 'Maharagama', 'Kaduwela', 'Dehiwala', 'kesbewa'],
  'Gampaha': ['Gampaha', 'Negombo', 'Kelaniya', 'Kadawatha', 'Ja-Ela', 'Minuwangoda'],
  'Kandy': ['Kandy Four Gravets', 'katugastota', 'Peradeniya', 'Gampola', 'Kundasale'],
  'Galle': ['Galle Four Gravets', 'Hikkaduwa', 'Ambalangoda', 'Karapitiya', 'Baddegama'],
  'Kurunegala': ['Kurunegala', 'Kuliyapitiya', 'Pannala', 'Mawathagama', 'Ibbagamuwa'],
  'Matara': ['Matara', 'Weligama', 'Hakmana', 'Akuressa', 'Devinuwara'],
  'Anuradhapura': ['Nuwaragam Palatha East', 'Mihintale', 'Kekirawa', 'Thambuttegama'],
  'Jaffna': ['Jaffna', 'Nallur', 'Chavakachcheri', 'Point Pedro']
};

const state = {
  currentScreen: 'language', // 'language' | 'profile' | 'map' | 'maintain' | 'reviews' | 'timelapse'
  lang: 'si',
  darkMode: false,
  greenPoints: 120,
  gpsEnabled: false,
  userProfile: {
    name: 'Githara Wijesinghe',
    address: 'No. 42, Parliament Road, Battaramulla',
    district: 'Colombo',
    dsDivision: 'Sri Jayawardenepura Kotte',
    email: 'githara.w@cleansrilanka.lk',
    phone: '077 458 9210'
  },
  distanceMeters: 45, // >10m = Inactive, <=10m = Active
  selectedTreeId: 'T-101',
  assignedTrees: [
    {
      id: 'T-101',
      name: 'කුඹුක් ගස',
      scientific: 'Terminalia arjuna',
      location: 'Diyatha Uyana Bank • Zone A',
      x: 54,
      y: 44,
      ageMonths: 4,
      growthStage: 2, // 1..4
      waterLevel: 65,
      fertilizerLevel: 50,
      fenced: false,
      photoUploaded: false,
      photoDataUrl: null,
      lastCare: '2 days ago'
    },
    {
      id: 'T-102',
      name: 'මී ගස',
      scientific: 'Madhuca longifolia',
      location: 'Parliament Walk • Plot 14',
      x: 28,
      y: 63,
      ageMonths: 7,
      growthStage: 3,
      waterLevel: 80,
      fertilizerLevel: 75,
      fenced: true,
      photoUploaded: false,
      photoDataUrl: null,
      lastCare: 'Yesterday'
    },
    {
      id: 'T-103',
      name: 'නා ගස ',
      scientific: 'Mesua ferrea',
      location: 'Waters Edge Green Belt • Plot 08',
      x: 74,
      y: 29,
      ageMonths: 2,
      growthStage: 1,
      waterLevel: 40,
      fertilizerLevel: 35,
      fenced: false,
      photoUploaded: false,
      photoDataUrl: null,
      lastCare: '5 days ago'
    }
  ],
  publicFilter: 'all', // 'all' | 'healthy' | 'idle'
  selectedPublicTreeId: 'P-201',
  publicTrees: [
    {
      id: 'P-201',
      name: 'කුඹුක් ගස (#201)',
      location: 'Diyatha Uyana • Battaramulla',
      guardian: 'Githara W.',
      badge: 'Green Guardian • Gold',
      status: 'healthy',
      idleDays: 2,
      rating: 4.9,
      takeoverRequested: false,
      reviews: [
        {
          author: 'Kasun Perera',
          role: 'Community Verifier',
          rating: 5,
          time: '2 hours ago',
          comment: 'ගස ඉතා හොඳින් වැඩෙනවා! වටේට ආරක්ෂිත වැටත් පිළිවෙලට හදලා තියෙනවා. 🌿👏',
          hasPhoto: true,
          photoLabel: 'Lush Green Canopy • Verified'
        },
        {
          author: 'Nimali Fernando',
          role: 'Public Visitor',
          rating: 5,
          time: 'Yesterday',
          comment: 'Spotted this healthy Kumbuk sapling during my morning walk. Clean Sri Lanka tag is clearly visible!',
          hasPhoto: false
        }
      ]
    },
    {
      id: 'P-202',
      name: 'කොහොඹ ගස (#108)',
      location: 'Viharamahadevi Park Border • Colombo 07',
      guardian: 'Unattended (Prev: Ruwan D.)',
      badge: 'Needs Guardian',
      status: 'idle',
      idleDays: 68, // > 2 months!
      rating: 3.4,
      takeoverRequested: false,
      reviews: [
        {
          author: 'System Idle Monitor',
          role: 'Automated Alert',
          rating: 3,
          time: '3 days ago',
          comment: '⚠️ මාස 2කට වඩා නඩත්තු කර නැත (68 days without GPS check-in). Ready for Guardian Takeover!',
          hasPhoto: false
        },
        {
          author: 'Tharindu Silva',
          role: 'Citizen',
          rating: 4,
          time: '1 week ago',
          comment: 'Sapling is still alive but soil looks dry and fence needs fixing. Someone nearby please adopt it!',
          hasPhoto: true,
          photoLabel: 'Dry Soil Check • Needs Water'
        }
      ]
    },
    {
      id: 'P-203',
      name: 'ඇහැළ ගස (#312)',
      location: 'Independence Square Avenue',
      guardian: 'ishara K.',
      badge: 'Green Guardian • Silver',
      status: 'healthy',
      idleDays: 5,
      rating: 4.8,
      takeoverRequested: false,
      reviews: [
        {
          author: 'Dilani Jayasinghe',
          role: 'Eco Volunteer',
          rating: 5,
          time: '4 days ago',
          comment: 'New leaves sprouting nicely after last week’s organic fertilizer care!',
          hasPhoto: true,
          photoLabel: 'Fresh Leaf Sprouts'
        }
      ]
    }
  ],
  reviewDraftStars: 5,
  reviewPhotoAttached: false,
  timelapsePlaying: false,
  timelapseProgress: 100, // 0 to 100
  timelapseTimer: null
};

// Utility: Toast Notification
let toastTimeout = null;
function showToast(message, type = 'info') {
  const toast = document.getElementById('app-toast');
  const toastText = document.getElementById('app-toast-text');
  const toastIcon = document.getElementById('app-toast-icon');
  if (!toast || !toastText) return;

  toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-[340px] w-[90%] px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 transition-all duration-300';

  if (type === 'warning') {
    toast.classList.add('bg-amber-50', 'border-amber-300', 'text-amber-900');
    toastIcon.textContent = '⚠️';
  } else if (type === 'success') {
    toast.classList.add('bg-emerald-50', 'border-emerald-300', 'text-emerald-900');
    toastIcon.textContent = '🌿';
  } else {
    toast.classList.add('bg-sky-50', 'border-sky-300', 'text-sky-900');
    toastIcon.textContent = '📍';
  }

  toastText.textContent = message;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }, 3200);
}

// Language Selection
function selectLanguage(langCode) {
  state.lang = langCode;
  renderLanguageScreen();
  updateLocalizedTexts();
}

function updateLocalizedTexts() {
  const t = I18N[state.lang];
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('lang-welcome-sub', t.welcomeSub);
  setTxt('lang-select-prompt', t.selectLangPrompt);
  setTxt('lang-next-btn-text', t.nextBtn);

  // Screen 2 localized helper texts under English labels
  setTxt('prof-helper-banner', t.profileHelperTitle);
  setTxt('help-name', t.nameHelp);
  setTxt('help-address', t.addressHelp);
  setTxt('help-district', t.districtHelp);
  setTxt('help-ds', t.dsHelp);
  setTxt('help-email', t.emailHelp);
  setTxt('help-phone', t.phoneHelp);
  setTxt('gps-helper-text', state.gpsEnabled ? t.gpsVerified : t.gpsTitle);

  // Screen 4 localized button subtitles
  setTxt('sub-water', t.waterSub);
  setTxt('sub-fert', t.fertSub);
  setTxt('sub-fence', t.fenceSub);

  // Header language pill
  setTxt('header-lang-pill', t.langLabel);
}

// Navigation
function navigateTo(screenId) {
  state.currentScreen = screenId;

  const screens = ['language', 'profile', 'map', 'maintain', 'reviews', 'timelapse'];
  screens.forEach((s) => {
    const el = document.getElementById(`screen-${s}`);
    if (el) {
      if (s === screenId) {
        el.classList.remove('hidden');
        el.classList.add('screen-enter');
      } else {
        el.classList.add('hidden');
        el.classList.remove('screen-enter');
      }
    }
  });

  // Toggle Bottom Nav visibility (show after onboarding or always accessible via demo bar)
  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    if (screenId === 'language' || screenId === 'profile') {
      bottomNav.classList.add('hidden');
    } else {
      bottomNav.classList.remove('hidden');
    }
  }

  // Highlight active bottom nav & demo bar buttons
  document.querySelectorAll('[data-nav-target]').forEach((btn) => {
    const target = btn.getAttribute('data-nav-target');
    const isActive = target === screenId;
    if (btn.classList.contains('bottom-tab')) {
      btn.classList.toggle('text-[#34a6cc]', isActive);
      btn.classList.toggle('font-semibold', isActive);
      btn.classList.toggle('text-gray-400', !isActive);
    } else if (btn.classList.contains('demo-pill')) {
      if (isActive) {
        btn.className = 'demo-pill px-3 py-1.5 rounded-full text-xs font-semibold bg-[#34a6cc] text-white shadow-sm transition-all whitespace-nowrap';
      } else {
        btn.className = 'demo-pill px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 hover:border-[#34a6cc] transition-all whitespace-nowrap';
      }
    }
  });

  if (screenId === 'language') renderLanguageScreen();
  if (screenId === 'profile') renderProfileScreen();
  if (screenId === 'map') renderMapScreen();
  if (screenId === 'maintain') renderMaintainScreen();
  if (screenId === 'reviews') renderReviewsScreen();
  if (screenId === 'timelapse') {
    renderTimelapseScreen();
    startTimelapse();
  } else {
    stopTimelapse();
  }
}

// Dark Mode Toggle
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.documentElement.classList.toggle('dark', state.darkMode);
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) icon.textContent = state.darkMode ? '☀️' : '🌙';
}

// Screen 1: Render Language Selection
function renderLanguageScreen() {
  ['si', 'ta', 'en'].forEach((code) => {
    const card = document.getElementById(`lang-card-${code}`);
    const check = document.getElementById(`lang-check-${code}`);
    if (!card || !check) return;

    if (state.lang === code) {
      card.className = 'w-full p-4 rounded-2xl border-2 border-[#8abd3f] bg-[#8abd3f]/10 dark:bg-[#8abd3f]/20 flex items-center justify-between transition-all shadow-sm';
      check.className = 'w-6 h-6 rounded-full bg-[#8abd3f] text-white flex items-center justify-center text-xs font-bold';
      check.innerHTML = '✓';
    } else {
      card.className = 'w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 hover:border-[#34a6cc] flex items-center justify-between transition-all';
      check.className = 'w-6 h-6 rounded-full border-2 border-gray-300 dark:border-zinc-600 flex items-center justify-center text-xs';
      check.innerHTML = '';
    }
  });
}

// Screen 2: Profile & GPS Permission
function populateDistricts() {
  const distSelect = document.getElementById('input-district');
  if (!distSelect) return;
  distSelect.innerHTML = Object.keys(DISTRICTS)
    .map((d) => `<option value="${d}" ${d === state.userProfile.district ? 'selected' : ''}>${d}</option>`)
    .join('');
  populateDSDivisions(distSelect.value);
}

function populateDSDivisions(district) {
  const dsSelect = document.getElementById('input-ds');
  if (!dsSelect) return;
  const list = DISTRICTS[district] || ['Main Division'];
  dsSelect.innerHTML = list
    .map((ds) => `<option value="${ds}" ${ds === state.userProfile.dsDivision ? 'selected' : ''}>${ds}</option>`)
    .join('');
}

function fillDemoProfile() {
  document.getElementById('input-name').value = state.userProfile.name;
  document.getElementById('input-address').value = state.userProfile.address;
  document.getElementById('input-district').value = 'Colombo';
  populateDSDivisions('Colombo');
  document.getElementById('input-ds').value = 'Sri Jayawardenepura Kotte';
  document.getElementById('input-email').value = state.userProfile.email;
  document.getElementById('input-phone').value = state.userProfile.phone;
  showToast('Demo Guardian details filled! Enable GPS below to register.', 'info');
}

function openGpsModal() {
  if (state.gpsEnabled) return;
  const modal = document.getElementById('gps-permission-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeGpsModal() {
  const modal = document.getElementById('gps-permission-modal');
  if (modal) modal.classList.add('hidden');
}

function grantGpsPermission() {
  const btn = document.getElementById('modal-allow-gps-btn');
  if (btn) btn.textContent = 'Locking Satellites...';

  setTimeout(() => {
    state.gpsEnabled = true;
    closeGpsModal();
    renderProfileScreen();
    updateLocalizedTexts();
    showToast(I18N[state.lang].gpsVerified, 'success');
    if (btn) btn.textContent = 'Allow Precise GPS Location';
  }, 550);
}

function renderProfileScreen() {
  updateLocalizedTexts();
  const gpsCard = document.getElementById('gps-status-card');
  const gpsBtn = document.getElementById('enable-gps-btn');
  const regBtn = document.getElementById('register-submit-btn');

  if (state.gpsEnabled) {
    gpsCard.className = 'p-4 rounded-2xl border-2 border-[#8abd3f] bg-[#8abd3f]/10 dark:bg-[#8abd3f]/20 transition-all';
    gpsBtn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold bg-[#8abd3f] text-white flex items-center gap-1.5 cursor-default';
    gpsBtn.innerHTML = '<span>✓</span><span>GPS Active</span>';

    regBtn.disabled = false;
    regBtn.className = 'w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-[#34a6cc] to-[#8abd3f] shadow-lg shadow-[#8abd3f]/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer';
  } else {
    gpsCard.className = 'p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/90 dark:bg-amber-950/30 dark:border-amber-700 transition-all';
    gpsBtn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer';
    gpsBtn.innerHTML = '<span>📍</span><span>Turn On GPS</span>';

    regBtn.disabled = true;
    regBtn.className = 'w-full py-3.5 rounded-2xl font-bold text-gray-400 bg-gray-200 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed flex items-center justify-center gap-2 transition-all';
  }
}

function submitRegistration(e) {
  if (e) e.preventDefault();
  if (!state.gpsEnabled) {
    openGpsModal();
    return;
  }
  const nameInput = document.getElementById('input-name');
  if (nameInput && nameInput.value.trim()) {
    state.userProfile.name = nameInput.value.trim();
  }
  const guardianNameEl = document.getElementById('hud-guardian-name');
  if (guardianNameEl) guardianNameEl.textContent = state.userProfile.name;

  showToast(`Welcome, ${state.userProfile.name}! Assigned 3 trees near you.`, 'success');
  navigateTo('map');
}

// Screen 3: Map View & Proximity Simulator
function setProximityDistance(meters) {
  state.distanceMeters = Number(meters);
  const slider = document.getElementById('proximity-slider');
  if (slider) slider.value = state.distanceMeters;
  renderMapScreen();
}

function toggleQuickProximity() {
  if (state.distanceMeters > 10) {
    setProximityDistance(6);
    showToast('GPS Proximity Reached (6m)! Trees are now ACTIVE & Glowing!', 'success');
  } else {
    setProximityDistance(45);
    showToast('Simulated stepping back to 45m (Inactive Grayscale mode).', 'info');
  }
}

function renderMapScreen() {
  const isNear = state.distanceMeters <= 10;
  const t = I18N[state.lang];

  // Distance badge & status banner
  const distBadge = document.getElementById('map-distance-badge');
  const statusBanner = document.getElementById('map-proximity-banner');
  const quickWalkBtn = document.getElementById('quick-walk-btn');
  const userMarker = document.getElementById('map-user-marker');

  if (distBadge) {
    distBadge.textContent = `${state.distanceMeters}m from nearest tree`;
    distBadge.className = isNear
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm'
      : 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm';
  }

  if (statusBanner) {
    if (isNear) {
      statusBanner.className = 'px-3.5 py-2.5 rounded-2xl bg-emerald-500/95 text-white text-xs font-semibold shadow-lg flex items-center justify-between gap-2 backdrop-blur-sm';
      statusBanner.innerHTML = `<span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-lime-300 animate-ping"></span>${t.proximityActiveMsg}</span>`;
    } else {
      statusBanner.className = 'px-3.5 py-2.5 rounded-2xl bg-amber-500/95 text-white text-xs font-semibold shadow-lg flex items-center justify-between gap-2 backdrop-blur-sm';
      statusBanner.innerHTML = `<span class="flex items-center gap-2"><span>🚶</span>${t.proximityInactiveMsg}</span>`;
    }
  }

  if (quickWalkBtn) {
    if (isNear) {
      quickWalkBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition-all';
      quickWalkBtn.innerHTML = '↩ Step Back (45m)';
    } else {
      quickWalkBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-[#8abd3f] text-white shadow-md shadow-[#8abd3f]/30 hover:opacity-95 transition-all animate-pulse';
      quickWalkBtn.innerHTML = '🏃 Walk Closer (6m)';
    }
  }

  // Move user GPS dot closer/further visually toward selected tree
  if (userMarker) {
    if (isNear) {
      userMarker.style.left = '49%';
      userMarker.style.top = '48%';
    } else {
      userMarker.style.left = '22%';
      userMarker.style.top = '82%';
    }
  }

  // Render Tree Markers on Map
  const markersContainer = document.getElementById('map-tree-markers');
  if (markersContainer) {
    markersContainer.innerHTML = state.assignedTrees
      .map((tree) => {
        const markerStateClass = isNear
          ? 'tree-marker-active bg-gradient-to-br from-[#8abd3f] to-emerald-500 border-2 border-white text-white'
          : 'tree-marker-inactive bg-gray-300 border-2 border-gray-400 text-gray-600';

        return `
          <button
            onclick="handleTreeMarkerClick('${tree.id}')"
            style="left: ${tree.x}%; top: ${tree.y}%;"
            class="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none"
            title="${tree.name}"
          >
            <div class="w-12 h-12 rounded-2xl ${markerStateClass} flex flex-col items-center justify-center shadow-lg transition-all">
              <span class="text-xl leading-none">🌳</span>
              <span class="text-[10px] font-bold leading-tight mt-0.5">${tree.id}</span>
            </div>
            <div class="mt-1 px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap shadow-sm ${
              isNear
                ? 'bg-emerald-950/85 text-lime-300 border border-lime-400/40'
                : 'bg-gray-800/80 text-gray-200'
            }">
              ${isNear ? '✨ Tap to Care' : '🔒 ' + state.distanceMeters + 'm'}
            </div>
          </button>
        `;
      })
      .join('');
  }

  // Render Assigned Tree Cards below map
  const listContainer = document.getElementById('assigned-tree-list');
  if (listContainer) {
    listContainer.innerHTML = state.assignedTrees
      .map((tree) => {
        return `
          <div
            onclick="handleTreeMarkerClick('${tree.id}')"
            class="p-3 rounded-2xl bg-white dark:bg-zinc-800 border ${
              isNear
                ? 'border-[#8abd3f]/60 hover:border-[#8abd3f] shadow-sm'
                : 'border-gray-200 dark:border-zinc-700 opacity-80'
            } flex items-center justify-between gap-3 cursor-pointer transition-all"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                isNear
                  ? 'bg-[#8abd3f]/15 text-[#8abd3f]'
                  : 'bg-gray-100 dark:bg-zinc-700 grayscale'
              }">
                🌳
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <h4 class="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">${tree.name}</h4>
                  ${tree.fenced ? '<span title="Shielded" class="text-xs">🛡️</span>' : ''}
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${tree.location}</p>
              </div>
            </div>
            <div class="shrink-0">
              ${
                isNear
                  ? '<span class="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#8abd3f] text-white shadow-sm">Care →</span>'
                  : '<span class="px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">Too Far</span>'
              }
            </div>
          </div>
        `;
      })
      .join('');
  }
}

function handleTreeMarkerClick(treeId) {
  if (state.distanceMeters > 10) {
    showToast(I18N[state.lang].moveCloserToast, 'warning');
    return;
  }
  state.selectedTreeId = treeId;
  navigateTo('maintain');
}

// Screen 4: Tree Maintenance & Creative Animations
function getSelectedTree() {
  return state.assignedTrees.find((t) => t.id === state.selectedTreeId) || state.assignedTrees[0];
}

function addGreenPoints(pts, label) {
  state.greenPoints += pts;
  const headerPts = document.getElementById('header-points-val');
  if (headerPts) {
    headerPts.textContent = state.greenPoints;
    headerPts.parentElement.classList.add('scale-110');
    setTimeout(() => headerPts.parentElement.classList.remove('scale-110'), 350);
  }

  // Spawn floating +Points badge inside avatar stage
  const fxStage = document.getElementById('tree-fx-overlay');
  if (fxStage) {
    const badge = document.createElement('div');
    badge.className = 'floating-points absolute left-1/2 top-1/3 z-30 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8abd3f] to-emerald-500 text-white font-extrabold text-sm shadow-lg whitespace-nowrap';
    badge.textContent = `+${pts} Green Points! ${label}`;
    fxStage.appendChild(badge);
    setTimeout(() => badge.remove(), 1300);
  }
}

function renderMaintainScreen() {
  const tree = getSelectedTree();
  if (!tree) return;

  document.getElementById('maint-tree-name').textContent = tree.name;
  document.getElementById('maint-tree-meta').textContent = `${tree.id} • ${tree.scientific} • ${tree.location}`;

  // Stats bars
  document.getElementById('bar-water').style.width = `${Math.min(100, tree.waterLevel)}%`;
  document.getElementById('val-water').textContent = `${Math.min(100, tree.waterLevel)}%`;

  document.getElementById('bar-fert').style.width = `${Math.min(100, tree.fertilizerLevel)}%`;
  document.getElementById('val-fert').textContent = `${Math.min(100, tree.fertilizerLevel)}%`;

  const shieldBadge = document.getElementById('val-fence');
  if (shieldBadge) {
    shieldBadge.textContent = tree.fenced ? 'Protected ✓' : 'Unfenced';
    shieldBadge.className = tree.fenced
      ? 'text-xs font-bold text-[#34a6cc]'
      : 'text-xs font-semibold text-amber-600';
  }

  // Scale canopy based on growthStage (1..4)
  const scaleMap = { 1: 0.78, 2: 0.92, 3: 1.05, 4: 1.16 };
  const canopyGroup = document.getElementById('svg-tree-canopy');
  if (canopyGroup) {
    const sc = scaleMap[tree.growthStage] || 1;
    canopyGroup.style.transform = `scale(${sc})`;
    canopyGroup.style.transformOrigin = '120px 145px';
  }

  const stageLabel = document.getElementById('tree-stage-pill');
  const stageNames = {
    1: 'Stage 1 • Young Sapling 🌱',
    2: 'Stage 2 • Growing Shoot 🌿',
    3: 'Stage 3 • Healthy Juvenile 🌳',
    4: 'Stage 4 • Thriving Guardian Tree ✨'
  };
  if (stageLabel) stageLabel.textContent = stageNames[tree.growthStage] || stageNames[2];

  // Fence & Guardian Shield SVG visibility
  const shieldSvg = document.getElementById('svg-guardian-shield');
  const fenceSvg = document.getElementById('svg-wood-fence');
  if (shieldSvg && fenceSvg) {
    if (tree.fenced) {
      shieldSvg.classList.remove('hidden');
      shieldSvg.classList.add('shield-active');
      fenceSvg.classList.remove('hidden');
      fenceSvg.classList.add('fence-active');
    } else {
      shieldSvg.classList.add('hidden');
      shieldSvg.classList.remove('shield-active');
      fenceSvg.classList.add('hidden');
      fenceSvg.classList.remove('fence-active');
    }
  }

  // Photo preview state
  const photoPreviewBox = document.getElementById('maint-photo-preview');
  const photoStatusText = document.getElementById('maint-photo-status');
  if (photoPreviewBox && photoStatusText) {
    if (tree.photoUploaded) {
      photoPreviewBox.classList.remove('hidden');
      photoStatusText.textContent = 'Verified Geo-Tagged Photo Attached ✓';
    } else {
      photoPreviewBox.classList.add('hidden');
      photoStatusText.textContent = 'Snap or upload a live photo for +15 bonus points';
    }
  }
}

// Creative Action 1: Watering Animation
function triggerWatering() {
  const tree = getSelectedTree();
  const fxStage = document.getElementById('tree-fx-overlay');
  const avatarWrap = document.getElementById('tree-avatar-svg');
  if (!fxStage) return;

  // Create 9 animated water droplets + splash ring
  const positions = [28, 36, 44, 50, 56, 63, 70, 40, 60];
  positions.forEach((leftPct, idx) => {
    const drop = document.createElement('div');
    drop.className = 'water-drop text-lg select-none';
    drop.style.left = `${leftPct}%`;
    drop.style.top = '10px';
    drop.style.animationDelay = `${idx * 70}ms`;
    drop.innerHTML = '💧';
    fxStage.appendChild(drop);
    setTimeout(() => drop.remove(), 1300);
  });

  const splash = document.createElement('div');
  splash.className = 'water-splash absolute bottom-6 left-1/2 w-28 h-5 rounded-full border-2 border-[#34a6cc] pointer-events-none';
  fxStage.appendChild(splash);
  setTimeout(() => splash.remove(), 950);

  // Lush green pulse on canopy leaves
  const leaves = document.querySelectorAll('.canopy-leaf');
  leaves.forEach((leaf) => {
    leaf.setAttribute('fill', '#22c55e');
    setTimeout(() => leaf.setAttribute('fill', '#8abd3f'), 900);
  });

  if (avatarWrap) {
    avatarWrap.classList.remove('tree-bounce');
    void avatarWrap.offsetWidth;
    avatarWrap.classList.add('tree-bounce');
  }

  tree.waterLevel = Math.min(100, tree.waterLevel + 20);
  tree.lastCare = 'Just now';
  if (tree.waterLevel >= 85 && tree.growthStage < 4) tree.growthStage += 1;

  addGreenPoints(10, '💧');
  renderMaintainScreen();
}

// Creative Action 2: Fertilizing Animation
function triggerFertilizing() {
  const tree = getSelectedTree();
  const fxStage = document.getElementById('tree-fx-overlay');
  const avatarWrap = document.getElementById('tree-avatar-svg');
  if (!fxStage) return;

  const icons = ['🌱', '✨', '🟢', '🌿', '⭐', '✨', '🌱', '💚'];
  icons.forEach((sym, idx) => {
    const p = document.createElement('div');
    p.className = 'nutrient-particle text-base select-none';
    p.style.left = `${26 + idx * 7}%`;
    p.style.bottom = '18px';
    p.style.animationDelay = `${idx * 80}ms`;
    p.textContent = sym;
    fxStage.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  });

  if (avatarWrap) {
    avatarWrap.classList.remove('tree-bounce');
    void avatarWrap.offsetWidth;
    avatarWrap.classList.add('tree-bounce');
  }

  tree.fertilizerLevel = Math.min(100, tree.fertilizerLevel + 25);
  tree.lastCare = 'Just now';
  if (tree.growthStage < 4) tree.growthStage += 1;

  addGreenPoints(15, '🌱');
  renderMaintainScreen();
}

// Creative Action 3: Fencing & Shield Animation
function triggerFencing() {
  const tree = getSelectedTree();
  tree.fenced = true;
  tree.lastCare = 'Just now';

  renderMaintainScreen();
  addGreenPoints(20, '🛡️');
  showToast('Protective Fence & Guardian Shield Activated!', 'success');
}

// Photo Upload Handler
function handlePhotoUpload(event) {
  const tree = getSelectedTree();
  const file = event?.target?.files?.[0];
  const imgEl = document.getElementById('maint-uploaded-img');

  if (file && imgEl) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
      imgEl.classList.remove('hidden');
      document.getElementById('maint-simulated-snap').classList.add('hidden');
    };
    reader.readAsDataURL(file);
  } else if (imgEl) {
    imgEl.classList.add('hidden');
    document.getElementById('maint-simulated-snap').classList.remove('hidden');
  }

  if (!tree.photoUploaded) {
    tree.photoUploaded = true;
    addGreenPoints(15, '📸');
    showToast('Maintenance Photo Geo-Verified! +15 Bonus Points', 'success');
  }
  renderMaintainScreen();
}

function triggerQuickCameraSnap() {
  const tree = getSelectedTree();
  const imgEl = document.getElementById('maint-uploaded-img');
  if (imgEl) imgEl.classList.add('hidden');
  const simSnap = document.getElementById('maint-simulated-snap');
  if (simSnap) simSnap.classList.remove('hidden');

  if (!tree.photoUploaded) {
    tree.photoUploaded = true;
    addGreenPoints(15, '📸');
  } else {
    addGreenPoints(5, '📸');
  }
  showToast('Live Verification Snapshot Captured!', 'success');
  renderMaintainScreen();
}

// Screen 5: Public Map View & Community Reviews
function setPublicFilter(filter) {
  state.publicFilter = filter;
  renderReviewsScreen();
}

function selectPublicTree(treeId) {
  state.selectedPublicTreeId = treeId;
  renderReviewsScreen();
}

function requestTreeTakeover(treeId) {
  const tree = state.publicTrees.find((t) => t.id === treeId);
  if (!tree) return;
  tree.takeoverRequested = true;
  tree.guardian = `${state.userProfile.name} (Pending Handover)`;
  addGreenPoints(25, '🤝');
  showToast(`Takeover Request Submitted for ${tree.name}! +25 Guardian Points`, 'success');
  renderReviewsScreen();
}

function setReviewStars(count) {
  state.reviewDraftStars = count;
  renderStarPicker();
}

function renderStarPicker() {
  const container = document.getElementById('review-star-picker');
  if (!container) return;
  container.innerHTML = [1, 2, 3, 4, 5]
    .map(
      (n) => `
      <button type="button" onclick="setReviewStars(${n})" class="text-xl transition-transform hover:scale-110 focus:outline-none">
        <span class="${n <= state.reviewDraftStars ? 'text-amber-400' : 'text-gray-300 dark:text-zinc-600'}">★</span>
      </button>
    `
    )
    .join('');
}

function toggleReviewPhotoTag() {
  state.reviewPhotoAttached = !state.reviewPhotoAttached;
  const btn = document.getElementById('review-photo-toggle');
  if (btn) {
    btn.className = state.reviewPhotoAttached
      ? 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#34a6cc]/15 text-[#34a6cc] border border-[#34a6cc] flex items-center gap-1.5'
      : 'px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 flex items-center gap-1.5';
    btn.innerHTML = state.reviewPhotoAttached ? '📷 Photo Attached ✓' : '📷 Attach Photo';
  }
}

function submitPublicReview(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('review-comment-input');
  const text = input ? input.value.trim() : '';
  if (!text) {
    showToast('Please enter a short review comment first.', 'warning');
    return;
  }

  const tree = state.publicTrees.find((t) => t.id === state.selectedPublicTreeId) || state.publicTrees[0];
  tree.reviews.unshift({
    author: state.userProfile.name,
    role: 'Green Guardian',
    rating: state.reviewDraftStars,
    time: 'Just now',
    comment: text,
    hasPhoto: state.reviewPhotoAttached,
    photoLabel: 'Citizen Verification Snapshot'
  });

  if (input) input.value = '';
  state.reviewPhotoAttached = false;
  addGreenPoints(10, '💬');
  showToast('Public Review Posted! Thank you for verifying.', 'success');
  renderReviewsScreen();
}

function renderReviewsScreen() {
  // Filter buttons
  ['all', 'healthy', 'idle'].forEach((f) => {
    const btn = document.getElementById(`pub-filter-${f}`);
    if (!btn) return;
    if (state.publicFilter === f) {
      btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-[#34a6cc] text-white shadow-sm transition-all';
    } else {
      btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 transition-all';
    }
  });

  const filtered = state.publicTrees.filter((t) => {
    if (state.publicFilter === 'all') return true;
    return t.status === state.publicFilter;
  });

  if (!filtered.some((t) => t.id === state.selectedPublicTreeId) && filtered.length > 0) {
    state.selectedPublicTreeId = filtered[0].id;
  }

  // Horizontal public tree selector cards
  const selectorEl = document.getElementById('public-tree-selector');
  if (selectorEl) {
    selectorEl.innerHTML = filtered
      .map((tree) => {
        const isSelected = tree.id === state.selectedPublicTreeId;
        const isIdle = tree.status === 'idle';
        return `
          <button
            onclick="selectPublicTree('${tree.id}')"
            class="min-w-[215px] text-left p-3 rounded-2xl border-2 transition-all shrink-0 ${
              isSelected
                ? isIdle
                  ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 shadow-sm'
                  : 'border-[#8abd3f] bg-[#8abd3f]/10 dark:bg-[#8abd3f]/20 shadow-sm'
                : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800'
            }"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full ${
                isIdle ? 'bg-amber-500 text-white idle-alert-pulse' : 'bg-[#8abd3f]/20 text-[#5d8722] dark:text-lime-300'
              }">
                ${isIdle ? '⚠️ Idle > 2 Mo' : '🌿 Healthy'}
              </span>
              <span class="text-xs font-bold text-amber-500">★ ${tree.rating}</span>
            </div>
            <p class="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">${tree.name}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">🛡️ ${tree.guardian}</p>
          </button>
        `;
      })
      .join('');
  }

  const activeTree = state.publicTrees.find((t) => t.id === state.selectedPublicTreeId) || state.publicTrees[0];
  const detailEl = document.getElementById('public-tree-detail');
  if (detailEl && activeTree) {
    const isIdle = activeTree.status === 'idle';
    detailEl.innerHTML = `
      <div class="p-4 rounded-2xl bg-white dark:bg-zinc-800 border ${
        isIdle ? 'border-amber-400' : 'border-gray-200 dark:border-zinc-700'
      } shadow-sm">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="text-base font-bold text-gray-900 dark:text-white">${activeTree.name}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">📍 ${activeTree.location}</p>
          </div>
          <div class="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-zinc-700 text-amber-600 dark:text-amber-300 text-xs font-bold">
            ★ ${activeTree.rating} (${activeTree.reviews.length})
          </div>
        </div>

        <!-- Protected By Guardian Badge -->
        <div class="mt-3 p-3 rounded-xl bg-[#F9F9F9] dark:bg-zinc-900/80 border border-gray-100 dark:border-zinc-700 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#34a6cc] to-[#8abd3f] text-white font-bold text-xs flex items-center justify-center shadow-sm">
              🛡️
            </div>
            <div>
              <p class="text-xs font-bold text-gray-800 dark:text-gray-100">Protected by ${activeTree.guardian}</p>
              <span class="inline-flex items-center gap-1 text-xs font-semibold text-[#8abd3f]">
                ✦ ${activeTree.badge}
              </span>
            </div>
          </div>
          <span class="text-xs text-gray-400">${activeTree.idleDays}d ago</span>
        </div>

        ${
          isIdle
            ? `
          <div class="mt-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700">
            <div class="flex items-center justify-between gap-2">
              <div>
                <p class="text-xs font-extrabold text-amber-800 dark:text-amber-300">⚠️ Idle Tree Alert (${activeTree.idleDays} Days Unmaintained)</p>
                <p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5">මාස 2කට වඩා නඩත්තු කර නැත. Adopt & restore this tree!</p>
              </div>
            </div>
            <button
              onclick="requestTreeTakeover('${activeTree.id}')"
              ${activeTree.takeoverRequested ? 'disabled' : ''}
              class="mt-2.5 w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTree.takeoverRequested
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm cursor-pointer'
              }"
            >
              ${activeTree.takeoverRequested ? '✓ Takeover Request Sent (Pending Approval)' : '🤝 Request Tree Takeover (ගස භාර ගන්න)'}
            </button>
          </div>
        `
            : ''
        }
      </div>
    `;

    // Render Reviews List
    const reviewsListEl = document.getElementById('public-reviews-list');
    if (reviewsListEl) {
      reviewsListEl.innerHTML = activeTree.reviews
        .map(
          (r) => `
          <div class="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-[#34a6cc]/15 text-[#34a6cc] font-bold text-xs flex items-center justify-center">
                  ${r.author.charAt(0)}
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-800 dark:text-gray-100">${r.author}</p>
                  <p class="text-xs text-gray-400">${r.role} • ${r.time}</p>
                </div>
              </div>
              <div class="text-xs text-amber-400 font-bold">${'★'.repeat(r.rating)}</div>
            </div>
            <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">${r.comment}</p>
            ${
              r.hasPhoto
                ? `
              <div class="mt-2.5 px-3 py-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                <span>📸</span>
                <span>${r.photoLabel || 'Verified Tree Photo'}</span>
              </div>
            `
                : ''
            }
          </div>
        `
        )
        .join('');
    }
  }

  renderStarPicker();
  const photoBtn = document.getElementById('review-photo-toggle');
  if (photoBtn) {
    photoBtn.className = state.reviewPhotoAttached
      ? 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#34a6cc]/15 text-[#34a6cc] border border-[#34a6cc] flex items-center gap-1.5'
      : 'px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 flex items-center gap-1.5';
    photoBtn.innerHTML = state.reviewPhotoAttached ? '📷 Photo Attached ✓' : '📷 Attach Photo';
  }
}

// Screen 6: 10-Second Time-Lapse & Social Share
function startTimelapse() {
  stopTimelapse();
  state.timelapseProgress = 0;
  state.timelapsePlaying = true;
  updateTimelapseVisuals();

  state.timelapseTimer = setInterval(() => {
    state.timelapseProgress += 2; // 50 ticks * 200ms = 10 seconds!
    if (state.timelapseProgress >= 100) {
      state.timelapseProgress = 100;
      state.timelapsePlaying = false;
      clearInterval(state.timelapseTimer);
    }
    updateTimelapseVisuals();
  }, 200);
}

function stopTimelapse() {
  if (state.timelapseTimer) {
    clearInterval(state.timelapseTimer);
    state.timelapseTimer = null;
  }
  state.timelapsePlaying = false;
}

function updateTimelapseVisuals() {
  const p = state.timelapseProgress;
  const bar = document.getElementById('timelapse-bar');
  const label = document.getElementById('timelapse-month-label');
  const treeGroup = document.getElementById('timelapse-tree-group');
  const playBtn = document.getElementById('timelapse-play-btn');

  if (bar) bar.style.width = `${p}%`;

  const month = Math.max(1, Math.ceil((p / 100) * 12));
  if (label) {
    if (p < 25) label.textContent = `Month ${month} • Day 1 Sapling Planted 🌱`;
    else if (p < 55) label.textContent = `Month ${month} • Root & Stem Strengthening 🌿`;
    else if (p < 85) label.textContent = `Month ${month} • Expanding Green Canopy 🌳`;
    else label.textContent = `Month 12 • 1-Year Milestone Reached! 🎉🌳`;
  }

  if (treeGroup) {
    const scale = 0.38 + (p / 100) * 0.72;
    treeGroup.style.transform = `scale(${scale})`;
    treeGroup.style.transformOrigin = '120px 175px';
  }

  if (playBtn) {
    playBtn.textContent = state.timelapsePlaying ? '⏸ Playing 10s Time-Lapse...' : '↻ Replay 10s Time-Lapse';
  }
}

function renderTimelapseScreen() {
  updateTimelapseVisuals();
}

function shareToSocial(platform) {
  addGreenPoints(10, '📣');
  showToast(`1-Year Tree Time-Lapse shared to ${platform}! (+10 Green Points)`, 'success');
}

// Initialize App on Load
document.addEventListener('DOMContentLoaded', () => {
  populateDistricts();
  const distEl = document.getElementById('input-district');
  if (distEl) {
    distEl.addEventListener('change', (e) => populateDSDivisions(e.target.value));
  }
  updateLocalizedTexts();
  navigateTo('language');
});
