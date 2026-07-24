/* ═══════════════════════════════════════════════
   PRANCHETA TÁTICA — Application Logic
   ═══════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════

let state = {
  teamName: 'Tabajara FC',
  players: [],
  sport: 'soccer',
  presentationActive: false
};

// ── Default roster (4-3-3, vertical layout) ──
const defaultPlayers = [
  // Home starters
  { id: 'h1', name: 'Goleiro', number: '1', team: 'home', active: true, position: { x: 50, y: 92 }, role: 'GK' },
  { id: 'h2', name: 'Lat. Direito', number: '2', team: 'home', active: true, position: { x: 15, y: 75 }, role: 'LD' },
  { id: 'h3', name: 'Zag. Direito', number: '3', team: 'home', active: true, position: { x: 38, y: 78 }, role: 'ZGD' },
  { id: 'h4', name: 'Zag. Esquerdo', number: '4', team: 'home', active: true, position: { x: 62, y: 78 }, role: 'ZGE' },
  { id: 'h5', name: 'Lat. Esquerdo', number: '6', team: 'home', active: true, position: { x: 85, y: 75 }, role: 'LE' },
  { id: 'h6', name: 'Volante', number: '5', team: 'home', active: true, position: { x: 50, y: 55 }, role: 'VOL' },
  { id: 'h7', name: 'Meio-Campo', number: '8', team: 'home', active: true, position: { x: 30, y: 42 }, role: 'MC' },
  { id: 'h8', name: 'Meio-Campo', number: '10', team: 'home', active: true, position: { x: 70, y: 42 }, role: 'MC' },
  { id: 'h9', name: 'Ponta Direita', number: '7', team: 'home', active: true, position: { x: 18, y: 22 }, role: 'PD' },
  { id: 'h10', name: 'Ponta Esquerda', number: '11', team: 'home', active: true, position: { x: 82, y: 22 }, role: 'PE' },
  { id: 'h11', name: 'Centroavante', number: '9', team: 'home', active: true, position: { x: 50, y: 18 }, role: 'CA' },
  // Home reserves
  { id: 'h12', name: 'Zecão', number: '12', team: 'home', active: false, position: { x: 50, y: 50 } },
  { id: 'h13', name: 'Pedrinho', number: '13', team: 'home', active: false, position: { x: 50, y: 50 } },
  { id: 'h14', name: 'Juninho', number: '14', team: 'home', active: false, position: { x: 50, y: 50 } },
  { id: 'h15', name: 'Chico', number: '15', team: 'home', active: false, position: { x: 50, y: 50 } },
  // Away bench
  { id: 'a1', name: 'Goleiro Adv', number: '1', team: 'away', active: false, position: { x: 50, y: 8 } },
  { id: 'a2', name: 'Zagueiro Adv', number: '3', team: 'away', active: false, position: { x: 50, y: 22 } },
  { id: 'a3', name: 'Atacante Adv', number: '9', team: 'away', active: false, position: { x: 50, y: 70 } }
];

// ── Formation presets (x/y percentages, vertical layout) ──
const formations = {
  // Soccer (11 players)
  '442': [
    { x: 50, y: 92, role: 'GK' }, { x: 15, y: 75, role: 'LD' },
    { x: 38, y: 78, role: 'ZGD' }, { x: 62, y: 78, role: 'ZGE' },
    { x: 85, y: 75, role: 'LE' }, { x: 35, y: 55, role: 'VOL' },
    { x: 65, y: 55, role: 'MC' }, { x: 20, y: 40, role: 'MD' },
    { x: 80, y: 40, role: 'ME' }, { x: 38, y: 20, role: 'CA' },
    { x: 62, y: 20, role: 'CA' }
  ],
  '433': [
    { x: 50, y: 92, role: 'GK' }, { x: 15, y: 75, role: 'LD' },
    { x: 38, y: 78, role: 'ZGD' }, { x: 62, y: 78, role: 'ZGE' },
    { x: 85, y: 75, role: 'LE' }, { x: 50, y: 55, role: 'VOL' },
    { x: 30, y: 42, role: 'MC' }, { x: 70, y: 42, role: 'MC' },
    { x: 18, y: 22, role: 'PD' }, { x: 82, y: 22, role: 'PE' },
    { x: 50, y: 18, role: 'CA' }
  ],
  '352': [
    { x: 50, y: 92, role: 'GK' }, { x: 28, y: 78, role: 'ZGD' },
    { x: 50, y: 80, role: 'ZGC' }, { x: 72, y: 78, role: 'ZGE' },
    { x: 15, y: 60, role: 'ALD' }, { x: 38, y: 58, role: 'VOL' },
    { x: 62, y: 58, role: 'VOL' }, { x: 85, y: 60, role: 'ALE' },
    { x: 50, y: 40, role: 'MCO' }, { x: 38, y: 20, role: 'CA' },
    { x: 62, y: 20, role: 'CA' }
  ],
  '4231': [
    { x: 50, y: 92, role: 'GK' }, { x: 15, y: 75, role: 'LD' },
    { x: 38, y: 78, role: 'ZGD' }, { x: 62, y: 78, role: 'ZGE' },
    { x: 85, y: 75, role: 'LE' }, { x: 35, y: 56, role: 'VOL' },
    { x: 65, y: 56, role: 'VOL' }, { x: 20, y: 38, role: 'MEID' },
    { x: 50, y: 38, role: 'MEIC' }, { x: 80, y: 38, role: 'MEIE' },
    { x: 50, y: 18, role: 'CA' }
  ],
  '532': [
    { x: 50, y: 92, role: 'GK' }, { x: 12, y: 74, role: 'ALD' },
    { x: 30, y: 78, role: 'ZGD' }, { x: 50, y: 80, role: 'ZGC' },
    { x: 70, y: 78, role: 'ZGE' }, { x: 88, y: 74, role: 'ALE' },
    { x: 50, y: 55, role: 'VOL' }, { x: 30, y: 42, role: 'MC' },
    { x: 70, y: 42, role: 'MC' }, { x: 38, y: 20, role: 'CA' },
    { x: 62, y: 20, role: 'CA' }
  ],
  '343': [
    { x: 50, y: 92, role: 'GK' }, { x: 25, y: 78, role: 'ZGD' },
    { x: 50, y: 80, role: 'ZGC' }, { x: 75, y: 78, role: 'ZGE' },
    { x: 15, y: 52, role: 'MD' }, { x: 38, y: 54, role: 'VOL' },
    { x: 62, y: 54, role: 'VOL' }, { x: 85, y: 52, role: 'ME' },
    { x: 20, y: 24, role: 'PD' }, { x: 80, y: 24, role: 'PE' },
    { x: 50, y: 18, role: 'CA' }
  ],
  // Futsal (5 players)
  '22': [
    { x: 50, y: 92, role: 'GK' }, { x: 25, y: 70, role: 'DEF' },
    { x: 75, y: 70, role: 'DEF' }, { x: 25, y: 30, role: 'ALA' },
    { x: 75, y: 30, role: 'ALA' }
  ],
  '31': [
    { x: 50, y: 92, role: 'GK' }, { x: 50, y: 72, role: 'FIXO' },
    { x: 20, y: 50, role: 'ALA' }, { x: 80, y: 50, role: 'ALA' },
    { x: 50, y: 22, role: 'PIVO' }
  ],
  '40': [
    { x: 50, y: 92, role: 'GK' }, { x: 20, y: 65, role: 'ALA' },
    { x: 40, y: 65, role: 'FIXO' }, { x: 60, y: 65, role: 'FIXO' },
    { x: 80, y: 65, role: 'ALA' }
  ],
  '121': [
    { x: 50, y: 92, role: 'GK' }, { x: 50, y: 74, role: 'FIXO' },
    { x: 22, y: 48, role: 'ALA' }, { x: 78, y: 48, role: 'ALA' },
    { x: 50, y: 22, role: 'PIVO' }
  ]
};

// ══════════════════════════════════════════════
// DOM REFERENCES
// ══════════════════════════════════════════════

const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

const teamNameInput = $('teamNameInput');
const sportSelect = $('sportSelect');
const togglePresentation = $('togglePresentation');
const exitPresentationFloat = $('exitPresentationFloat');
const statusDot = $('statusDot');
const statusText = $('statusText');
const addPlayerForm = $('addPlayerForm');
const playerNameInput = $('playerName');
const playerNumberInput = $('playerNumber');
const playerRoleSelect = $('playerRole');
const rosterList = $('rosterList');
const playerCount = $('playerCount');
const pitch = $('pitch');
const btnHome = $('btnHome');
const btnAway = $('btnAway');
const hamburgerBtn = $('hamburgerBtn');
const sidebar = $('sidebar');
const mobileOverlay = $('mobileOverlay');
const mobileExpandBtn = $('mobileExpandBtn');

// ══════════════════════════════════════════════
// GHOST DRAG STATE
// ══════════════════════════════════════════════

let ghost = null;        // The cloned element following cursor
let ghostRafId = null;   // requestAnimationFrame id

// ══════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════

function init() {
  loadState();
  syncUIFromState();
  setupSidebarSections();
  setupMobileDrawer();
  setupRadioButtons();
  setupFormListeners();
  setupPresentationMode();
  setupStorageActions();
  renderFormations();
  render();
  setupInteract();
  setupGhostSafetyCleanup();
}

// ── Load persisted state from localStorage ──
function loadState() {
  try {
    const saved = localStorage.getItem('prancheta_tatica_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        state = parsed;
        // Ensure required fields
        if (!Array.isArray(state.players)) state.players = deepClone(defaultPlayers);
        if (!state.teamName) state.teamName = 'Tabajara FC';
        if (!state.sport) state.sport = 'soccer';
        if (state.presentationActive == null) state.presentationActive = false;
      }
    } else {
      state.players = deepClone(defaultPlayers);
    }
  } catch (e) {
    console.error('[Prancheta] Erro ao ler localStorage. Carregando padrão.', e);
    state.players = deepClone(defaultPlayers);
  }
}

// ── Sync form/select values from state ──
function syncUIFromState() {
  teamNameInput.value = state.teamName;
  sportSelect.value = state.sport;
  updatePageTitle();
  updateCourtLayout();
  setPresentationMode(state.presentationActive);
}

// ══════════════════════════════════════════════
// SIDEBAR — COLLAPSIBLE SECTIONS
// ══════════════════════════════════════════════

const SIDEBAR_STATE_KEY = 'prancheta_sidebar_state';

function setupSidebarSections() {
  const savedSections = getSidebarState();

  $$('.section-header').forEach((btn) => {
    const sectionId = btn.getAttribute('aria-controls'); // e.g. "section-body-add-player"
    const body = document.getElementById(sectionId);
    if (!body) return;

    // Restore saved collapsed state
    if (savedSections[sectionId] === 'collapsed') {
      collapseSection(btn, body, false);
    }

    // Toggle on click
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        collapseSection(btn, body, true);
      } else {
        expandSection(btn, body, true);
      }
    });

    // Keyboard: Enter or Space
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

function collapseSection(btn, body, save) {
  btn.setAttribute('aria-expanded', 'false');
  body.classList.add('is-collapsed');
  if (save) persistSectionState(body.id, 'collapsed');
}

function expandSection(btn, body, save) {
  btn.setAttribute('aria-expanded', 'true');
  body.classList.remove('is-collapsed');
  if (save) persistSectionState(body.id, 'expanded');
}

function getSidebarState() {
  try {
    return JSON.parse(localStorage.getItem(SIDEBAR_STATE_KEY)) || {};
  } catch { return {}; }
}

function persistSectionState(sectionId, value) {
  const current = getSidebarState();
  current[sectionId] = value;
  localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(current));
}

// ══════════════════════════════════════════════
// MOBILE DRAWER
// ══════════════════════════════════════════════

function setupMobileDrawer() {
  hamburgerBtn.addEventListener('click', toggleDrawer);
  mobileOverlay.addEventListener('click', closeDrawer);

  // Mobile expand button (floating button on field, mobile only)
  if (mobileExpandBtn) {
    mobileExpandBtn.addEventListener('click', openDrawer);
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

function toggleDrawer() {
  const isOpen = sidebar.classList.contains('is-open');
  isOpen ? closeDrawer() : openDrawer();
}

function openDrawer() {
  sidebar.classList.add('is-open');
  mobileOverlay.classList.add('is-active');
  hamburgerBtn.classList.add('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  mobileOverlay.removeAttribute('aria-hidden');
}

function closeDrawer() {
  sidebar.classList.remove('is-open');
  mobileOverlay.classList.remove('is-active');
  hamburgerBtn.classList.remove('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  mobileOverlay.setAttribute('aria-hidden', 'true');
}

// ══════════════════════════════════════════════
// RADIO BUTTONS — TEAM SELECTOR
// ══════════════════════════════════════════════

function setupRadioButtons() {
  $$('input[name="playerTeam"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      btnHome.classList.toggle('home-active', e.target.value === 'home');
      btnAway.classList.toggle('away-active', e.target.value === 'away');
    });
  });
}

// ══════════════════════════════════════════════
// FORM LISTENERS
// ══════════════════════════════════════════════

function setupFormListeners() {
  // Add player
  addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = playerNameInput.value.trim();
    const number = playerNumberInput.value || String(Math.floor(Math.random() * 99) + 1);
    const team = document.querySelector('input[name="playerTeam"]:checked').value;
    const role = playerRoleSelect.value;

    if (!name) return;

    const player = {
      id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name,
      number: String(number),
      team,
      active: false,
      position: { x: 50, y: 50 }
    };
    if (role) player.role = role;

    state.players.push(player);
    saveState();
    render();

    // Reset form
    playerNameInput.value = '';
    playerNumberInput.value = '';
    playerRoleSelect.value = '';
    playerNameInput.focus();
  });

  // Team name
  teamNameInput.addEventListener('input', (e) => {
    state.teamName = e.target.value.trim() || 'Sem Nome';
    updatePageTitle();
    saveState();
  });

  // Sport select
  sportSelect.addEventListener('change', (e) => {
    state.sport = e.target.value;
    updateCourtLayout();
    renderFormations();
    applyFormation(state.sport === 'soccer' ? '433' : '121');
    saveState();
  });
}

// ══════════════════════════════════════════════
// PRESENTATION MODE
// ══════════════════════════════════════════════

function setupPresentationMode() {
  togglePresentation.addEventListener('click', () => {
    setPresentationMode(true);
    saveState();
  });

  exitPresentationFloat.addEventListener('click', () => {
    setPresentationMode(false);
    saveState();
  });
}

function setPresentationMode(active) {
  state.presentationActive = active;
  document.body.classList.toggle('presentation-mode', active);
}

// ══════════════════════════════════════════════
// STORAGE ACTIONS (Export / Import / Reset)
// ══════════════════════════════════════════════

function setupStorageActions() {
  // Export
  $('exportJson').addEventListener('click', () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const name = state.teamName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    a.href = url;
    a.download = `prancheta-${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Import trigger
  const importTrigger = $('importJsonTrigger');
  const importFile = $('importJsonFile');

  importTrigger.addEventListener('click', () => importFile.click());

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data && typeof data === 'object') {
          state.teamName = data.teamName || 'Importado';
          state.players = Array.isArray(data.players) ? data.players : [];
          state.sport = data.sport || 'soccer';
          state.presentationActive = data.presentationActive || false;

          syncUIFromState();
          renderFormations();
          saveState();
          render();
          alert('Configuração importada com sucesso!');
        } else {
          alert('Arquivo inválido. Formato não suportado.');
        }
      } catch (err) {
        alert('Erro ao processar o arquivo JSON.');
        console.error(err);
      }
    };
    reader.readAsText(file);
    importFile.value = '';
  });

  // Reset board
  $('resetBoard').addEventListener('click', () => {
    state.players.forEach((p) => (p.active = false));
    saveState();
    render();
  });
}

// ══════════════════════════════════════════════
// SAVE STATE (localStorage)
// ══════════════════════════════════════════════

let saveTimer = null;

function saveState() {
  showSavingStatus(true);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem('prancheta_tatica_state', JSON.stringify(state));
    showSavingStatus(false);
  }, 300);
}

function showSavingStatus(saving) {
  if (saving) {
    statusDot.classList.add('saving');
    statusText.textContent = 'Salvando…';
  } else {
    statusDot.classList.remove('saving');
    statusText.textContent = 'Salvo';
  }
}

// ══════════════════════════════════════════════
// PLAYER ACTIONS
// ══════════════════════════════════════════════

function deletePlayer(id) {
  state.players = state.players.filter((p) => p.id !== id);
  saveState();
  render();
}

function togglePlayer(id) {
  const p = findPlayer(id);
  if (!p) return;
  p.active = !p.active;
  if (p.active) {
    p.position = {
      x: 50 + (Math.random() * 14 - 7),
      y: 50 + (Math.random() * 14 - 7)
    };
  }
  saveState();
  render();
}

function sendToBench(id) {
  const p = findPlayer(id);
  if (p) { p.active = false; saveState(); render(); }
}

function activatePlayer(id, pctX, pctY) {
  const p = findPlayer(id);
  if (!p) return;
  p.active = true;
  p.position = {
    x: clamp(pctX, 2, 98),
    y: clamp(pctY, 2, 98)
  };
  saveState();
  render();
}

function updatePlayerPosition(id, pctX, pctY) {
  const p = findPlayer(id);
  if (!p) return;
  p.position = { x: pctX, y: pctY };
  saveState();
  render();
}

function findPlayer(id) {
  return state.players.find((p) => p.id === id) || null;
}

// ══════════════════════════════════════════════
// FORMATIONS
// ══════════════════════════════════════════════

function renderFormations() {
  const grid = $('formationsGrid');
  grid.innerHTML = '';

  const list = state.sport === 'soccer'
    ? [
      { key: '442', label: '4-4-2' },
      { key: '433', label: '4-3-3' },
      { key: '352', label: '3-5-2' },
      { key: '4231', label: '4-2-3-1' },
      { key: '532', label: '5-3-2' },
      { key: '343', label: '3-4-3' }
    ]
    : [
      { key: '121', label: '1-2-1 (Diamante)' },
      { key: '22', label: '2-2 (Quadrado)' },
      { key: '31', label: '3-1 (Padrão)' },
      { key: '40', label: '4-0 (Linha)' }
    ];

  list.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = 'formation-btn';
    btn.textContent = label;
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', () => applyFormation(key));
    grid.appendChild(btn);
  });
}

function applyFormation(formationKey) {
  const coords = formations[formationKey];
  if (!coords) return;

  const targetCount = state.sport === 'soccer' ? 11 : 5;

  let homePlayers = state.players.filter((p) => p.team === 'home');

  // Create placeholder players if not enough
  while (homePlayers.length < targetCount) {
    const n = homePlayers.length + 1;
    const ph = {
      id: 'h_ph_' + Date.now() + '_' + n,
      name: `Jogador ${n}`,
      number: String(n),
      team: 'home',
      active: false,
      position: { x: 50, y: 50 }
    };
    state.players.push(ph);
    homePlayers.push(ph);
  }

  let active = homePlayers.filter((p) => p.active);
  let inactive = homePlayers.filter((p) => !p.active);

  // Activate inactive players up to targetCount
  while (active.length < targetCount && inactive.length > 0) {
    const p = inactive.shift();
    p.active = true;
    active.push(p);
  }

  // Send excess active home players to bench
  if (active.length > targetCount) {
    active.slice(targetCount).forEach((p) => (p.active = false));
    active = active.slice(0, targetCount);
  }

  // Assign coordinates and roles
  active.forEach((player, i) => {
    const c = coords[i];
    player.position = { x: c.x, y: c.y };
    player.role = c.role;
  });

  saveState();
  render();
}

// ══════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════

function render() {
  // Clear bench list and field players
  rosterList.innerHTML = '';
  pitch.querySelectorAll('.field-player').forEach((el) => el.remove());

  let total = 0;

  state.players.forEach((player) => {
    total++;
    if (player.active) {
      renderFieldPlayer(player);
    } else {
      renderBenchPlayer(player);
    }
  });

  playerCount.textContent = total;

}

// ── Render a player pin on the field ──
function renderFieldPlayer(player) {
  const pin = document.createElement('div');
  pin.className = `field-player ${player.team}`;
  pin.setAttribute('data-id', player.id);
  pin.style.left = `${player.position.x}%`;
  pin.style.top = `${player.position.y}%`;
  pin.textContent = player.number;

  // Role badge (home team only)
  if (player.role) {
    const badge = document.createElement('div');
    badge.className = 'field-player-role';
    badge.textContent = player.role;
    pin.appendChild(badge);
  }

  // Name label
  const nameLabel = document.createElement('div');
  nameLabel.className = 'field-player-name';
  nameLabel.textContent = player.name;
  pin.appendChild(nameLabel);

  // Double click / double tap → send to bench
  pin.addEventListener('dblclick', () => sendToBench(player.id));
  addDoubleTap(pin, () => sendToBench(player.id));

  pitch.appendChild(pin);
}

// ── Render a player card on the bench ──
function renderBenchPlayer(player) {
  const card = document.createElement('div');
  card.className = 'bench-player';
  card.setAttribute('data-id', player.id);
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${player.name} — ${player.number}. Duplo clique para colocar no campo.`);

  // Shirt
  const shirt = document.createElement('div');
  shirt.className = `player-shirt ${player.team}`;
  shirt.textContent = player.number;

  // Role badge on shirt
  if (player.role) {
    const badge = document.createElement('div');
    badge.className = 'player-role-badge';
    badge.textContent = player.role;
    shirt.appendChild(badge);
  }

  card.appendChild(shirt);

  // Player info text
  const info = document.createElement('div');
  info.className = 'bench-player-info';

  const nameEl = document.createElement('div');
  nameEl.className = 'bench-player-name';
  nameEl.textContent = player.name;

  const metaEl = document.createElement('div');
  metaEl.className = 'bench-player-meta';
  metaEl.textContent = player.role ? `#${player.number} · ${player.role}` : `#${player.number}`;

  info.appendChild(nameEl);
  info.appendChild(metaEl);
  card.appendChild(info);

  // Delete button — always visible, with trash icon
  const delBtn = document.createElement('button');
  delBtn.className = 'delete-player-btn';
  delBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
  delBtn.setAttribute('aria-label', `Excluir ${player.name}`);
  delBtn.setAttribute('type', 'button');
  delBtn.setAttribute('tabindex', '0');
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deletePlayer(player.id);
  });
  card.appendChild(delBtn);

  // Double click / double tap → toggle onto field
  card.addEventListener('dblclick', () => togglePlayer(player.id));
  addDoubleTap(card, () => togglePlayer(player.id));

  rosterList.appendChild(card);
}

// ══════════════════════════════════════════════
// INTERACT.JS — DRAG & DROP
// ══════════════════════════════════════════════

// Called ONCE on init — InteractJS uses CSS selectors so it works on any element matching the selector
function setupInteract() {
  setupInteractFieldPlayers();
  setupInteractBench();
}

// ── Field players: drag inside the pitch ──
function setupInteractFieldPlayers() {
  interact('.field-player').draggable({
    listeners: {
      start(event) {
        const el = event.target;
        el.classList.add('is-dragging');
        // Reset any transform offset
        el.setAttribute('data-drag-x', 0);
        el.setAttribute('data-drag-y', 0);
      },

      move(event) {
        const el = event.target;
        const dx = (parseFloat(el.getAttribute('data-drag-x')) || 0) + event.dx;
        const dy = (parseFloat(el.getAttribute('data-drag-y')) || 0) + event.dy;

        // Animate using transform (no top/left changes during drag)
        el.style.transform = `translate3d(calc(-50% + ${dx}px), calc(-50% + ${dy}px), 0)`;
        el.setAttribute('data-drag-x', dx);
        el.setAttribute('data-drag-y', dy);
      },

      end(event) {
        const el = event.target;
        el.classList.remove('is-dragging');

        const pitchRect = pitch.getBoundingClientRect();
        const playerRect = el.getBoundingClientRect();
        const cx = playerRect.left + playerRect.width / 2 - pitchRect.left;
        const cy = playerRect.top + playerRect.height / 2 - pitchRect.top;

        let pctX = (cx / pitchRect.width) * 100;
        let pctY = (cy / pitchRect.height) * 100;

        const playerId = el.getAttribute('data-id');

        if (pctX < -4 || pctX > 104 || pctY < -4 || pctY > 104) {
          // Dragged outside → send to bench
          sendToBench(playerId);
        } else {
          pctX = clamp(pctX, 2, 98);
          pctY = clamp(pctY, 2, 98);
          updatePlayerPosition(playerId, pctX, pctY);
        }

        // Reset transform — positions are stored as % (left/top)
        el.style.transform = 'translate3d(-50%, -50%, 0)';
        el.removeAttribute('data-drag-x');
        el.removeAttribute('data-drag-y');
      }
    }
  });
}

// ── Bench players: drag a ghost onto the field ──
function setupInteractBench() {
  interact('.bench-player').draggable({
    ignoreFrom: '.delete-player-btn',  // don't start drag when clicking delete
    listeners: {
      start(event) {
        const original = event.currentTarget;
        original.classList.add('is-dragging');

        // Build the ghost from the shirt element
        const shirtEl = original.querySelector('.player-shirt');
        ghost = shirtEl.cloneNode(true);
        ghost.classList.add('drag-ghost');
        // Remove role badge from ghost for cleanliness
        const badge = ghost.querySelector('.player-role-badge');
        if (badge) badge.remove();

        const size = Math.max(shirtEl.offsetWidth, 44);
        ghost.style.width = size + 'px';
        ghost.style.height = size + 'px';

        // Position at cursor (guard against missing pointer data)
        const ptr = event.pointers && event.pointers[0];
        if (ptr) positionGhost(ptr.clientX, ptr.clientY);
        else positionGhost(window.innerWidth / 2, window.innerHeight / 2);

        document.body.appendChild(ghost);
      },

      move(event) {
        if (!ghost) return;
        const ptr = event.pointers[0];
        // Schedule position update via RAF for smooth movement
        if (ghostRafId) cancelAnimationFrame(ghostRafId);
        ghostRafId = requestAnimationFrame(() => {
          if (ghost) positionGhost(ptr.clientX, ptr.clientY);
          ghostRafId = null;
        });

        // Highlight field if ghost is over it
        const pitchRect = pitch.getBoundingClientRect();
        const overPitch = (
          ptr.clientX >= pitchRect.left &&
          ptr.clientX <= pitchRect.right &&
          ptr.clientY >= pitchRect.top &&
          ptr.clientY <= pitchRect.bottom
        );
        pitch.classList.toggle('drop-active', overPitch);
      },

      end(event) {
        const original = event.currentTarget;
        original.classList.remove('is-dragging');
        pitch.classList.remove('drop-active');

        if (ghostRafId) { cancelAnimationFrame(ghostRafId); ghostRafId = null; }

        if (ghost) {
          const ptr = event.pointers[0];
          const pitchRect = pitch.getBoundingClientRect();
          const px = ptr.clientX, py = ptr.clientY;

          const droppedOnPitch = (
            px >= pitchRect.left && px <= pitchRect.right &&
            py >= pitchRect.top && py <= pitchRect.bottom
          );

          if (droppedOnPitch) {
            const pctX = clamp(((px - pitchRect.left) / pitchRect.width) * 100, 2, 98);
            const pctY = clamp(((py - pitchRect.top) / pitchRect.height) * 100, 2, 98);
            const playerId = original.getAttribute('data-id');
            activatePlayer(playerId, pctX, pctY);

            // Trigger pop-in animation on the newly placed pin
            requestAnimationFrame(() => {
              const pin = pitch.querySelector(`.field-player[data-id="${playerId}"]`);
              if (pin) {
                pin.classList.add('pop-in');
                pin.addEventListener('animationend', () => pin.classList.remove('pop-in'), { once: true });
              }
            });
          }

          ghost.remove();
          ghost = null;
        }
      }
    }
  });
}


// ── Move ghost element to cursor position (uses transform for GPU performance) ──
function positionGhost(clientX, clientY) {
  // Using transform3d for GPU-composited movement — avoids layout thrashing
  ghost.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0) scale(1.18)`;
}

// ── Safety net: remove any orphaned ghost on pointer/touch release ──
function setupGhostSafetyCleanup() {
  function cleanupGhost() {
    if (ghost) {
      ghost.remove();
      ghost = null;
    }
    if (ghostRafId) {
      cancelAnimationFrame(ghostRafId);
      ghostRafId = null;
    }
    // Also clean up any lingering is-dragging classes
    document.querySelectorAll('.bench-player.is-dragging').forEach(el => {
      el.classList.remove('is-dragging');
    });
    pitch.classList.remove('drop-active');
  }

  // Capture phase so it fires before interact.js can swallow the event
  window.addEventListener('pointerup', cleanupGhost, true);
  window.addEventListener('touchend', cleanupGhost, { passive: true, capture: true });
  window.addEventListener('touchcancel', cleanupGhost, { passive: true, capture: true });
}

// ══════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function updatePageTitle() {
  document.title = `Prancheta Tática — ${state.teamName}`;
}

function updateCourtLayout() {
  const wrapper = document.querySelector('.pitch-wrapper');
  if (state.sport === 'futsal') {
    wrapper.classList.add('futsal-active');
    pitch.classList.add('futsal');
  } else {
    wrapper.classList.remove('futsal-active');
    pitch.classList.remove('futsal');
  }
}

// ── Double-tap helper for touch devices ──
function addDoubleTap(el, callback) {
  let lastTap = 0;
  el.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTap < 300 && now - lastTap > 0) {
      callback();
      e.preventDefault();
    }
    lastTap = now;
  });
}

// ══════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', init);
