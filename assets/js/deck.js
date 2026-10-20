/* =========================================================================
   Lactalis Food Service × 75LAB — motor da apresentação
   HTML, CSS e JS puros. Sem dependências.
   ========================================================================= */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const body = document.body;
const stage = $('#stage');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MQ = matchMedia('(max-width: 820px), (orientation: portrait) and (max-width: 1100px)');
const forceDesk = /[?&]desktop(=|&|$)/.test(location.search);
const mobile = !forceDesk && MQ.matches;
if (mobile) html.classList.add('m');
if (!forceDesk) MQ.addEventListener?.('change', () => location.reload());

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
};

/* ---------------------------------------------------------------------
   Ícones SVG com microanimações em loop (traço único, 24 × 24)
   --------------------------------------------------------------------- */
const ICONS = {
  compass: '<circle cx="12" cy="12" r="9"/><g class="a-needle"><path d="m12 5.5 2.4 6.5L12 18.5 9.6 12z"/><circle class="f" cx="12" cy="12" r="1.2"/></g>',
  layers: '<path class="a-bob" d="M12 3.5 21 8l-9 4.5L3 8z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16 9 4.5 9-4.5"/>',
  spark: '<path class="a-wave" d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4"/><path class="a-wave2" d="m5.6 5.6 2.6 2.6M15.8 15.8l2.6 2.6M5.6 18.4l2.6-2.6M15.8 8.2l2.6-2.6"/><circle class="a-pulse f" cx="12" cy="12" r="2.4"/>',
  chart: '<path d="M3.5 20.5h17"/><rect class="a-rise" x="5.5" y="12" width="3" height="7" rx=".8"/><rect class="a-rise2" x="10.5" y="8" width="3" height="11" rx=".8"/><rect class="a-rise3" x="15.5" y="4.5" width="3" height="14.5" rx=".8"/>',
  kit: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6.2A1.7 1.7 0 0 1 10.7 4.5h2.6A1.7 1.7 0 0 1 15 6.2V8"/><path d="M3 13.5h18"/><rect class="a-pulse" x="10.4" y="12.3" width="3.2" height="2.6" rx=".6"/>',
  truck: '<g class="a-drive"><path d="M2.5 6.5h10.5v9.5H2.5z"/><path d="M13 9.5h4l3.5 3.5v3H13z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.8" cy="17.5" r="1.8"/></g><path class="a-road" d="M1 21.5h22"/>',
  coffee: '<path d="M4 9h12v4.5A5.5 5.5 0 0 1 10.5 19h-1A5.5 5.5 0 0 1 4 13.5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path class="a-steam" d="M8 2.8c-1 1 1 2 0 3.4"/><path class="a-steam2" d="M12 2.8c-1 1 1 2 0 3.4"/><path d="M3 21.5h14"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z"/><path class="a-tick" d="m8.5 12 2.5 2.5 4.5-5"/>',
  hospital: '<rect x="4" y="3.5" width="16" height="17.5" rx="2"/><path class="a-pulse" d="M12 7.5v6M9 10.5h6"/><path d="M10 21v-3.5h4V21"/>',
  chef: '<path d="M7 14.5V20h10v-5.5"/><path class="a-bob" d="M7 14.5a4 4 0 0 1-1.1-7.7A4.6 4.6 0 0 1 12 4a4.6 4.6 0 0 1 6.1 2.8A4 4 0 0 1 17 14.5z"/><path d="M7 17.2h10"/>',
  building: '<rect x="3" y="9" width="8" height="12" rx="1"/><rect x="11" y="3" width="10" height="18" rx="1"/><path d="M14 7h1M17.5 7h1M14 11h1M17.5 11h1M14 15h1M17.5 15h1M5.8 13h2.4M5.8 17h2.4"/><circle class="a-ping" cx="16" cy="3" r="1.6"/>',
  stand: '<path d="M4 20.5V9.5h16v11"/><path d="M2.5 9.5 5 4.5h14l2.5 5"/><path d="M8 20.5v-5h8v5"/><path class="a-wave" d="M8.5 7h7"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle class="a-pulse f" cx="12" cy="12" r="2"/>',
  users: '<rect x="3" y="3.5" width="18" height="11.5" rx="1.5"/><path class="a-draw" d="m6.5 12 3-3 2.5 2 4-4"/><path d="M12 15v3M8 21.5l4-3.5 4 3.5"/>',
  pin: '<path d="M12 21.5s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10.5" r="2.3"/><circle class="a-ping" cx="12" cy="10.5" r="2.3"/>',
  cloche: '<path d="M3 17h18"/><path d="M4.5 17a7.5 7.5 0 0 1 15 0"/><path d="M12 9.5V8M10.5 8h3"/><path d="M2 20.5h20"/><path class="a-steam" d="M8.2 3.2c-.8.8.8 1.6 0 2.6"/><path class="a-steam2" d="M15.8 3.2c-.8.8.8 1.6 0 2.6"/>',
  store: '<path d="M4.5 11v9.5h15V11"/><path d="M3 10 5 4h14l2 6"/><path d="M3 10c0 1.4 1.3 2.5 3 2.5S9 11.4 9 10c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5"/><path class="a-pulse" d="M10 20.5V16h4v4.5"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path class="a-dot" d="M9.5 7.5h5"/><path class="a-dot2" d="M9.5 10.5h5"/><path class="a-dot3" d="M9.5 13.5h3"/>',
  leaf: '<path class="a-bob" d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19 13 11"/>',
  book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/><path class="a-draw" d="M9 8h6M9 11h4"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path class="a-draw" d="M9 12h6M9 15h6M9 18h3"/>',
  chat: '<path d="M4 5h16v10H9l-5 4z"/><circle class="a-dot f" cx="9" cy="10" r="1"/><circle class="a-dot2 f" cx="12" cy="10" r="1"/><circle class="a-dot3 f" cx="15" cy="10" r="1"/>',
  route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path class="a-road" d="M8.2 18h5.8a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.8"/>',
  box: '<path d="M3.5 9.5h17v11h-17z"/><path class="a-lid" d="M2.5 9.5 4.5 5h15l2 4.5"/><path d="M10 13.5h4"/>',
  hand: '<g class="a-drive"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-4.5a1.5 1.5 0 0 1 3 0V11m0-3a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3.5 15a1.6 1.6 0 0 1 2.4-2.1L8 15"/></g>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><rect class="a-pulse f" x="13.5" y="13.5" width="3" height="3" rx=".6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path class="a-tick" d="m8 12.5 2.8 2.8 5.7-5.8"/>',
  handshake: '<circle cx="9" cy="12" r="5.5"/><circle class="a-bob" cx="15" cy="12" r="5.5"/>',
  map: '<path d="M3 6.5 9 4.5l6 2 6-2v13l-6 2-6-2-6 2z"/><path d="M9 4.5v13M15 6.5v13"/><circle class="a-ping" cx="12" cy="11" r="1.6"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/><circle class="a-dot f" cx="17.8" cy="10.5" r=".9"/>',
  qr: '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2v2h-2zM18.5 18.5h2v2h-2zM18.5 14.5h2M14.5 18.5v2"/><path class="a-scan" d="M2 12h20" opacity=".7"/>',
  wifi: '<path class="a-wave3" d="M2.5 9a14 14 0 0 1 19 0"/><path class="a-wave2" d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path class="a-wave" d="M8.5 16a5 5 0 0 1 7 0"/><circle class="f" cx="12" cy="19.3" r="1.3"/>',
  bell: '<path class="a-swing" d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  cart: '<g class="a-drive"><path d="M3 4h2.5l2.2 11h10.6L21 7H7"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/></g>',
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9.5z"/><path class="a-scan" d="M12 16.5v-5M10 13.5l2-2 2 2"/>',
  data: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/><path class="a-wave" d="M5 10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/><path class="a-wave2" d="M5 14.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/><path class="a-wave2" d="M2.5 10H4M20 10h1.5M5 4l1 1M19 4l-1 1"/><path class="a-wave" d="M12 7v3"/>',
  flag: '<path d="M5 21.5V3.5"/><path class="a-flag" d="M5 4h12l-2.5 4L17 12H5"/>',
  drop: '<path class="a-bob" d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
  cycle: '<g class="a-spin"><path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12a8 8 0 0 1 13.7-5.6"/><path d="M17.7 2.8v3.8h-3.8"/><path d="M6.3 21.2v-3.8h3.8"/></g>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><g class="a-blink"><circle cx="12" cy="12" r="3"/></g>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path class="a-bob" d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 1.9 0 2.6 5.2 1.4 5.2 4.1 0 1.1-1.1 2-2.7 2-1.2 0-2.2-.5-2.7-1.4M12 6.5V8m0 8v1.5"/>'
};
function paintIcons(root = document) {
  $$('.ic[data-ic]', root).forEach(el => {
    if (el.firstChild) return;
    const d = ICONS[el.dataset.ic];
    if (d) el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  });
}

/* ---------------------------------------------------------------------
   Preparação do conteúdo
   --------------------------------------------------------------------- */
const slides = $$('.slide');
const mainS = slides.filter(s => !s.classList.contains('apx'));
const apxS = slides.filter(s => s.classList.contains('apx'));

// variáveis de atraso a partir de data-i
$$('[data-i]').forEach(el => el.style.setProperty('--i', el.dataset.i));

// títulos: palavras sobem por máscara
function splitWords(h) {
  let wi = 0;
  const walk = (node, into) => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { into.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = part; i.style.setProperty('--wi', wi++);
          w.appendChild(i); into.appendChild(w);
        });
      } else if (n.nodeType === 1) {
        const c = n.cloneNode(false); into.appendChild(c); walk(n, c);
      }
    });
  };
  const frag = document.createDocumentFragment();
  const label = h.textContent.replace(/\s+/g, ' ').trim();
  walk(h, frag);
  h.textContent = ''; h.appendChild(frag); h.setAttribute('aria-label', label);
}
$$('.tk').forEach(splitWords);

// capa: letras do título
$$('#s0 h1 .mask').forEach((m, k) => {
  const t = m.textContent; m.textContent = '';
  [...t].forEach((ch, i) => {
    const s = document.createElement('span'); s.className = 'ch';
    s.style.setProperty('--ci', i + k * 8);
    s.textContent = ch === ' ' ? ' ' : ch; m.appendChild(s);
  });
});

// 05 · anel "cada proposta define"
(function blueprint() {
  const g = $('#bpSegs'), lab = $('#bpLabels'); if (!g) return;
  const items = [['target', 'Objetivo'], ['box', 'Entregáveis'], ['users', 'Responsabilidades'], ['calendar', 'Cronograma'], ['check', 'Aprovações'], ['coin', 'Investimento'], ['chart', 'Forma de avaliação']];
  const cx = 220, cy = 220, r = 160, n = items.length, gap = 7;
  const pt = (a, rr) => [cx + rr * Math.cos(a * Math.PI / 180), cy + rr * Math.sin(a * Math.PI / 180)];
  let svg = '';
  items.forEach((it, i) => {
    const a1 = -90 + i * 360 / n + gap / 2, a2 = -90 + (i + 1) * 360 / n - gap / 2;
    const [x1, y1] = pt(a1, r), [x2, y2] = pt(a2, r);
    svg += `<path class="seg draw" pathLength="1" style="--d:${(.35 + i * .12).toFixed(2)}s" d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}"/>`;
    const am = (a1 + a2) / 2, [lx, ly] = pt(am, 214);
    const d = document.createElement('div');
    d.className = 'bpl'; d.setAttribute('data-a', 'fade'); d.style.setProperty('--d', (.6 + i * .12).toFixed(2) + 's');
    d.style.left = (lx / 440 * 100) + '%'; d.style.top = (ly / 440 * 100) + '%';
    d.innerHTML = `<i class="ic" data-ic="${it[0]}"></i>${it[1]}`;
    lab.appendChild(d);
  });
  g.innerHTML = svg;
})();

// A2 · matriz de concorrência
(function matrix() {
  const el = $('#cmx'); if (!el) return;
  const cols = ['Linha ou área profissional', 'Receitas e aplicações', 'Treino e consultoria', 'Onde comprar e catálogo', 'Compra B2B digital', 'Ferramentas para o vendedor do distribuidor'];
  const rows = [
    ['Nestlé Professional', 'site próprio, chefs e programas', [1, 1, 1, 1, 1, 0]],
    ['Unilever Food Solutions', 'Academia UFS e rede de chefs', [1, 1, 1, 0, 0, 0]],
    ['Polenghi Profissional', 'calculadora de lucro e margem', [1, 1, 0, 1, 0, 0]],
    ['Scala Profissional', 'time dedicado e B2B regional', [1, 0, 0, 1, 1, 0]],
    ['Vigor Profissional', 'diretoria de Food Service (2026)', [1, 0, 1, 0, 0, 0]],
    ['Piracanjuba Food Service', 'representantes por região', [1, 1, 0, 1, 0, 0]],
    ['Tirolez Profissional', 'linha lançada na APAS 2025', [1, 0, 0, 0, 0, 0]]
  ];
  let h = '<div class="h0"></div>' + cols.map((c, i) => `<div class="h${i === 5 ? ' free' : ''}">${c}</div>`).join('');
  let k = 0;
  rows.forEach(r => {
    h += `<div class="r"><b>${r[0]}</b><small>${r[1]}</small></div>`;
    r[2].forEach((v, i) => { h += `<div class="c${i === 5 ? ' free' : ''}"><i class="dot${v ? '' : ' no'}" style="--k:${k++}" aria-label="${v ? 'encontrado' : 'não identificado'}"></i></div>`; });
  });
  h += '<div class="r lac"><b>Lactalis Brasil</b><small>frente Food Service em construção</small></div>';
  for (let i = 0; i < 6; i++) h += i < 5
    ? `<div class="c lac"><span class="tbc" style="--k:${k++}">a construir</span></div>`
    : `<div class="c lac free"><span class="opp" style="--k:${k++}"><i></i>espaço livre</span></div>`;
  el.innerHTML = h;
  el.setAttribute('role', 'table');
  el.setAttribute('aria-label', 'Matriz de recursos de Food Service por concorrente, a partir de fontes públicas');
})();

// A5 · camadas do kit
const KIT = {
  todos: { on: ['base', 'catalogo', 'apresentacao', 'argumentario', 'rota', 'tecnico', 'teste', 'treino'], why: '<b>Todas as camadas</b> nascem da mesma narrativa aprovada pela Lactalis. Cada público recebe a combinação que resolve a sua decisão.' },
  dist: { on: ['base', 'catalogo', 'apresentacao', 'argumentario', 'rota', 'teste', 'treino'], why: '<b>Distribuidores:</b> kit de categoria, guia de rota e apresentação de lançamento. O vendedor sai do treino com uma conversa curta e o material na mão.' },
  hotel: { on: ['base', 'catalogo', 'apresentacao', 'tecnico', 'teste'], why: '<b>Hotéis:</b> apresentação de iogurtes e manteiga blister ligada ao café da manhã, com demonstração orientada.' },
  hosp: { on: ['base', 'catalogo', 'apresentacao', 'tecnico'], why: '<b>Hospitais e institucional:</b> dossiê de produto, ficha de conservação e apresentação ao comprador e à nutricionista.' },
  rest: { on: ['base', 'catalogo', 'tecnico', 'teste', 'treino'], why: '<b>Restaurantes, padarias e confeitaria:</b> demonstrações com manteiga bloco e leite condensado, mais conteúdo de aplicação.' },
  redes: { on: ['base', 'apresentacao', 'argumentario', 'teste'], why: '<b>Redes e contas estratégicas:</b> apresentação personalizada, kit de teste e projeto de lançamento sob medida.' }
};
const KIT_NAMES = { base: 'Narrativa comercial (base)', catalogo: 'Catálogo digital e impresso', apresentacao: 'Apresentação comercial', argumentario: 'Argumentário', rota: 'Lâminas e folders de rota', tecnico: 'Conteúdo técnico e de aplicação', teste: 'Kit de teste e lançamento', treino: 'Treinamento' };
function setKit(ch) {
  const k = KIT[ch] || KIT.todos, box = $('#kit3d'); if (!box) return;
  $$('#kitTabs button').forEach(b => b.setAttribute('aria-pressed', b.dataset.ch === ch ? 'true' : 'false'));
  box.classList.toggle('dim', ch !== 'todos');
  $$('.ly', box).forEach(l => l.classList.toggle('hl', ch !== 'todos' && k.on.includes(l.dataset.k)));
  $('#kitWhy').innerHTML = k.why;
  $('#kitList').innerHTML = Object.keys(KIT_NAMES).map(n => `<li class="${k.on.includes(n) ? 'on' : ''}"><i></i>${KIT_NAMES[n]}</li>`).join('');
}

paintIcons();

/* ---------------------------------------------------------------------
   Escala do palco
   --------------------------------------------------------------------- */
function fit() {
  if (mobile) return;
  const s = Math.min(innerWidth / 1600, innerHeight / 900);
  stage.style.setProperty('--scale', s.toFixed(4));
}
fit();
addEventListener('resize', fit);

/* ---------------------------------------------------------------------
   Contadores e anéis
   --------------------------------------------------------------------- */
const nf = (v, dec) => v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
function runCounts(s) {
  $$('[data-count]', s).forEach(el => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    if (RM) { el.textContent = nf(to, dec); return; }
    const delay = 350, dur = 1700, t0 = performance.now() + delay;
    cancelAnimationFrame(el._raf);
    const step = t => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur));
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = nf(to * e, dec);
      if (p < 1) el._raf = requestAnimationFrame(step); else el.textContent = nf(to, dec);
    };
    el._raf = requestAnimationFrame(step);
  });
  $$('[data-ring]', s).forEach(el => { el.style.strokeDashoffset = 100 - parseFloat(el.dataset.ring); });
}
function resetCounts(s) {
  $$('[data-count]', s).forEach(el => { cancelAnimationFrame(el._raf); el.textContent = nf(0, +(el.dataset.dec || 0)); });
  $$('[data-ring]', s).forEach(el => { el.style.strokeDashoffset = ''; });
}
$$('[data-count]').forEach(el => { el.textContent = nf(0, +(el.dataset.dec || 0)); });

/* ---------------------------------------------------------------------
   Órbita contínua e texto girando na capa
   --------------------------------------------------------------------- */
const orbitG = $('#orbitG');
function setOrbit(s) {
  const v = (s.dataset.orbit || '0,0,0,1,.5').split(',').map(Number);
  orbitG.style.transform = `translate(${v[0]}px,${v[1]}px) rotate(${v[2]}deg) scale(${v[3]})`;
  orbitG.style.opacity = v[4];
}
const otp = $('#otextPath');
let oOff = 0, oLast = 0, oSeg = 0;
function orbitText(t) {
  if (!oSeg) { try { oSeg = $('#otext').getComputedTextLength() / 3; } catch (e) { oSeg = 1100; } }
  const dt = oLast ? Math.min(64, t - oLast) : 16; oLast = t;
  if (stage.classList.contains('on-cover') && !document.hidden) {
    oOff -= dt * 0.022; if (oOff < -oSeg) oOff += oSeg;
    otp.setAttribute('startOffset', oOff.toFixed(1));
  }
  requestAnimationFrame(orbitText);
}
if (!RM && !mobile) requestAnimationFrame(orbitText);

/* ---------------------------------------------------------------------
   Navegação
   --------------------------------------------------------------------- */
let cur = null, returnTo = mainS[0], busy = false, busyT = 0;
const curtain = $('#curtain'), sweep = $('#sweep');
const pad = n => String(n).padStart(2, '0');

// segmentos de progresso (capa + 5)
const segs = $('#segs');
mainS.forEach((s, i) => {
  const b = document.createElement('button'); b.type = 'button';
  b.setAttribute('aria-label', (i ? pad(i) + ' · ' : '') + s.dataset.title);
  b.innerHTML = '<i></i>'; b.addEventListener('click', () => go(s));
  segs.appendChild(b);
});

function setTheme(t) { body.dataset.theme = t; }
function activate(s) {
  s.classList.add('is-active');
  void s.offsetWidth;
  requestAnimationFrame(() => { s.classList.add('is-in'); runCounts(s); });
  if (s.id === 's0') coverIn();
}
function deactivate(s) {
  s.getAnimations?.().forEach(a => a.cancel());
  s.classList.remove('is-active', 'is-in');
  resetCounts(s);
}
function chrome(s) {
  const isApx = s.classList.contains('apx');
  stage.classList.toggle('in-apx', isApx);
  stage.classList.toggle('on-cover', s.id === 's0');
  $('#chap').textContent = s.dataset.label || '';
  const cnt = $('#count');
  if (isApx) {
    const i = apxS.indexOf(s);
    cnt.innerHTML = `<b>A${i + 1}</b> <span>/ ${apxS.length}</span>`;
    $('#prevBtn').disabled = i === 0; $('#nextBtn').disabled = i === apxS.length - 1;
  } else {
    const i = mainS.indexOf(s);
    cnt.innerHTML = `<b>${pad(i)}</b> <span>/ ${pad(mainS.length - 1)}</span>`;
    [...segs.children].forEach((b, k) => { b.classList.toggle('done', k < i); b.classList.toggle('cur', k === i); });
    $('#prevBtn').disabled = i === 0; $('#nextBtn').disabled = i === mainS.length - 1;
  }
  $$('#menu ol button').forEach(b => b.classList.toggle('cur', b.dataset.id === s.id));
  if (np.classList.contains('open')) fillNotes(s);
  try { history.replaceState(null, '', '#' + s.id); } catch (e) {}
}

// chama fn uma única vez: no fim da animação ou, se o navegador pausar animações, pelo relógio
function after(anim, ms, fn) {
  let ok = false; const run = () => { if (ok) return; ok = true; fn(); };
  if (anim) anim.onfinish = run;
  setTimeout(run, ms);
}
// estado final garantido: só a tela atual ativa, cortina fora da tela
function settle() {
  slides.forEach(s => { if (s !== cur && s.classList.contains('is-active')) deactivate(s); });
  if (cur && !cur.classList.contains('is-active')) activate(cur);
  if (cur) setTheme(cur.dataset.theme);
  curtain.getAnimations?.().forEach(a => a.cancel());
  busy = false;
}
function show(next, dir) {
  if (!next || next === cur) return;
  if (busy && performance.now() - busyT < 1400) return;
  if (busy) settle();
  const prev = cur; cur = next;
  slides.forEach(s => { if (s !== prev && s !== next && s.classList.contains('is-active')) deactivate(s); });
  chrome(next); setOrbit(next);
  if (!prev || RM) {
    if (prev) deactivate(prev);
    setTheme(next.dataset.theme); activate(next);
    return;
  }
  busy = true; busyT = performance.now();
  const ez = 'cubic-bezier(.7,0,.2,1)';
  if (dir === 0) {
    const a = prev.animate([{ opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }, { opacity: 0, transform: 'scale(.93)', filter: 'blur(10px)' }], { duration: 480, easing: 'cubic-bezier(.6,0,.9,.4)', fill: 'forwards' });
    after(a, 700, () => { if (prev !== cur) deactivate(prev); });
    setTimeout(() => {
      if (cur !== next) return;
      setTheme(next.dataset.theme); activate(next);
      after(next.animate([{ opacity: 0, transform: 'scale(1.07)', filter: 'blur(12px)' }, { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }], { duration: 820, easing: 'cubic-bezier(.16,.84,.24,1)' }), 1100, settle);
    }, 300);
    return;
  }
  if (prev.dataset.theme !== next.dataset.theme) {
    curtain.classList.toggle('light', next.dataset.theme === 'light');
    const from = dir > 0 ? 102 : -102;
    const c1 = curtain.animate([{ transform: `translateX(${from}%)` }, { transform: 'translateX(0%)' }], { duration: 560, easing: ez, fill: 'forwards' });
    prev.animate([{ transform: 'translateX(0)', filter: 'blur(0px)' }, { transform: `translateX(${-dir * 90}px)`, filter: 'blur(4px)' }], { duration: 560, easing: ez, fill: 'forwards' });
    after(c1, 800, () => {
      if (cur !== next) return;
      deactivate(prev); setTheme(next.dataset.theme); activate(next);
      next.animate([{ transform: `translateX(${dir * 120}px)` }, { transform: 'translateX(0)' }], { duration: 900, easing: 'cubic-bezier(.16,.84,.24,1)' });
      const c2 = curtain.animate([{ transform: 'translateX(0%)' }, { transform: `translateX(${-from}%)` }], { duration: 640, easing: ez, fill: 'forwards' });
      after(c2, 900, settle);
    });
    return;
  }
  const a = prev.animate([{ opacity: 1, transform: 'translateX(0)', filter: 'blur(0px)' }, { opacity: 0, transform: `translateX(${-dir * 70}px)`, filter: 'blur(6px)' }], { duration: 520, easing: 'cubic-bezier(.7,0,.84,0)', fill: 'forwards' });
  after(a, 760, () => { if (prev !== cur) deactivate(prev); });
  setTimeout(() => {
    if (cur !== next) return;
    activate(next);
    const clipFrom = dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
    after(next.animate([{ clipPath: clipFrom, transform: `translateX(${dir * 90}px)` }, { clipPath: 'inset(0 0 0 0%)', transform: 'translateX(0)' }], { duration: 980, easing: ez }), 1250, settle);
    sweep.animate([{ left: dir > 0 ? '100%' : '0%', opacity: 1 }, { left: dir > 0 ? '0%' : '100%', opacity: 1, offset: .92 }, { left: dir > 0 ? '0%' : '100%', opacity: 0 }], { duration: 980, easing: ez });
  }, 220);
}

function go(target, dir) {
  if (typeof target === 'string') target = document.getElementById(target);
  if (!target) return;
  if (mobile) {
    if (target.classList.contains('apx')) html.classList.add('show-apx');
    target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    return;
  }
  const fromApx = cur && cur.classList.contains('apx'), toApx = target.classList.contains('apx');
  if (toApx && cur && !fromApx) returnTo = cur;
  if (dir === undefined) {
    if (fromApx !== toApx) dir = 0;
    else {
      const list = toApx ? apxS : mainS;
      dir = list.indexOf(target) >= list.indexOf(cur) ? 1 : -1;
    }
  }
  show(target, dir);
}
function step(d) {
  if (!cur) return;
  const list = cur.classList.contains('apx') ? apxS : mainS;
  const i = list.indexOf(cur) + d;
  if (i >= 0 && i < list.length) go(list[i], d);
}
const back = () => go(returnTo || mainS[0], 0);

$('#prevBtn').addEventListener('click', () => step(-1));
$('#nextBtn').addEventListener('click', () => step(1));
$('#backBtn').addEventListener('click', back);
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]'); if (!g) return;
  e.preventDefault(); closeMenu(); go(g.dataset.goto);
});

/* ---------------------------------------------------------------------
   Capa: trailer de abertura (uma vez por sessão)
   --------------------------------------------------------------------- */
const intro = $('#intro');
let introOn = false, introTimers = [];
function coverIn() {
  if (introOn) return;
  const seen = store.sget('lfs-intro');
  if (seen || RM || mobile) { intro.classList.add('done'); return; }
  store.sset('lfs-intro', '1');
  introOn = true; intro.classList.remove('done');
  const s0 = $('#s0'); s0.classList.remove('is-in');
  const words = $$('.word', intro), line = $('.line', intro), bar = $('.ibar i', intro);
  const T = 430, total = words.length * T + 2000;
  bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: total, fill: 'forwards' });
  const bgs = $$('.ibg img', intro);
  words.forEach((w, i) => {
    introTimers.push(setTimeout(() => {
      w.classList.add('on');
      bgs.forEach(b => b.classList.toggle('on', +b.dataset.w === i));
    }, 250 + i * T));
    introTimers.push(setTimeout(() => { w.classList.remove('on'); w.classList.add('off'); }, 250 + (i + 1) * T));
  });
  introTimers.push(setTimeout(() => bgs.forEach(b => b.classList.remove('on')), 250 + words.length * T));
  introTimers.push(setTimeout(() => line.classList.add('on'), 300 + words.length * T));
  introTimers.push(setTimeout(endIntro, total + 250));
}
function endIntro() {
  if (!introOn) return;
  introOn = false; introTimers.forEach(clearTimeout); introTimers = [];
  intro.classList.add('done');
  const s0 = $('#s0');
  setTimeout(() => { if (cur === s0) { s0.classList.add('is-in'); runCounts(s0); } }, 200);
}
$('.skip', intro).addEventListener('click', e => { e.stopPropagation(); endIntro(); });
intro.addEventListener('click', endIntro);

/* ---------------------------------------------------------------------
   Teclado, roda e toque
   --------------------------------------------------------------------- */
document.addEventListener('keydown', e => {
  if (introOn) { if (!e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); endIntro(); } return; }
  if (lb.classList.contains('open')) {
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowRight') lbStep(1);
    else if (e.key === 'ArrowLeft') lbStep(-1);
    else if (e.key === 'Tab') trap(e, lb);
    return;
  }
  if (menu.classList.contains('open')) {
    if (e.key === 'Escape' || e.key === 'm' || e.key === 'M') { e.preventDefault(); closeMenu(); }
    else if (e.key === 'Tab') trap(e, menu);
    return;
  }
  const t = e.target, typing = t.matches?.('input,textarea,select');
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case 'ArrowDown':
      if (typing) return; e.preventDefault(); step(1); break;
    case ' ':
      if (t.matches?.('button,a,[role=tab]')) return; e.preventDefault(); step(1); break;
    case 'ArrowLeft': case 'PageUp': case 'ArrowUp':
      if (typing) return; e.preventDefault(); step(-1); break;
    case 'Home': e.preventDefault(); go(cur?.classList.contains('apx') ? apxS[0] : mainS[0], -1); break;
    case 'End': e.preventDefault(); go(cur?.classList.contains('apx') ? apxS[apxS.length - 1] : mainS[mainS.length - 1], 1); break;
    case 'Escape': if (np.classList.contains('open')) np.classList.remove('open'); else if (cur?.classList.contains('apx')) back(); break;
    case 'm': case 'M': e.preventDefault(); openMenu(); break;
    case 'n': case 'N': toggleNotes(); break;
    case 'f': case 'F': if (!document.fullscreenElement) html.requestFullscreen?.().catch(() => {}); else document.exitFullscreen?.(); break;
    case 'c': case 'C': toggleCursor(); break;
  }
});
if (!mobile) {
  let wAcc = 0, wLast = 0;
  addEventListener('wheel', e => {
    if (introOn || lb.classList.contains('open') || menu.classList.contains('open')) return;
    if (e.target.closest?.('.kit3d,input')) return;
    const now = performance.now();
    if (now - wLast > 260) wAcc = 0;
    wAcc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(wAcc) > 70 && now - wLast > 950) { step(wAcc > 0 ? 1 : -1); wAcc = 0; wLast = now; }
    else if (now - wLast <= 950) wLast = Math.max(wLast, now - 900);
  }, { passive: true });
  let tx = 0, ty = 0, tt = 0;
  stage.addEventListener('touchstart', e => { const p = e.changedTouches[0]; tx = p.clientX; ty = p.clientY; tt = Date.now(); }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (e.target.closest('.kit3d,input')) return;
    const p = e.changedTouches[0], dx = p.clientX - tx, dy = p.clientY - ty;
    if (Date.now() - tt < 800 && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
  }, { passive: true });
}

function trap(e, root) {
  const f = $$('button,a[href],input,[tabindex]:not([tabindex="-1"])', root).filter(x => x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------------------------------------------------------------------
   Menu de capítulos
   --------------------------------------------------------------------- */
const menu = $('#menu');
let menuFocus = null;
(function buildMenu() {
  const mk = (list, ol, isApx) => list.forEach((s, i) => {
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.dataset.id = s.id;
    b.innerHTML = `<span class="n">${isApx ? 'A' + (i + 1) : pad(i)}</span><span class="t">${s.dataset.title}</span><span class="a">${isApx ? '↗' : '→'}</span>`;
    b.addEventListener('click', () => { closeMenu(); go(s); });
    li.appendChild(b); ol.appendChild(li);
  });
  mk(mainS, $('#menuMain'), false); mk(apxS, $('#menuApx'), true);
})();
function openMenu() { menuFocus = document.activeElement; menu.classList.add('open'); setTimeout(() => ($('#menu ol button.cur') || $('#menu ol button'))?.focus(), 60); }
function closeMenu() { if (!menu.classList.contains('open')) return; menu.classList.remove('open'); menuFocus?.focus?.(); }
$('#menuBtn').addEventListener('click', openMenu);
$('#menuClose').addEventListener('click', closeMenu);
menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });

/* ---------------------------------------------------------------------
   Lightbox
   --------------------------------------------------------------------- */
const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
let lbList = [], lbI = 0, lbFocus = null;
function lbRender() {
  const el = lbList[lbI], [t, d] = (el.dataset.caption || '').split('|');
  lbImg.classList.remove('ld');
  lbImg.onload = () => requestAnimationFrame(() => lbImg.classList.add('ld'));
  lbImg.src = el.dataset.zoom;
  lbImg.alt = el.querySelector('img')?.alt || t || '';
  lbCap.innerHTML = (t ? `<small>${t}</small>` : '') + (d || '');
  $('#lbCount').textContent = lbList.length > 1 ? `${lbI + 1} / ${lbList.length}` : '';
  $('#lbPrev').style.display = $('#lbNext').style.display = lbList.length > 1 ? '' : 'none';
}
function openLb(el) {
  const g = el.dataset.gallery;
  lbList = g ? $$(`[data-zoom][data-gallery="${g}"]`) : [el];
  lbI = Math.max(0, lbList.indexOf(el));
  lbFocus = document.activeElement;
  lbRender(); lb.classList.add('open');
  setTimeout(() => $('#lbClose').focus(), 50);
}
function closeLb() { lb.classList.remove('open'); lbFocus?.focus?.(); }
function lbStep(d) { lbI = (lbI + d + lbList.length) % lbList.length; lbRender(); }
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', () => lbStep(-1));
$('#lbNext').addEventListener('click', () => lbStep(1));
lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') closeLb(); });
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z) return;
  const panel = z.closest('.acp');
  if (panel && !panel.classList.contains('open') && !mobile) return; // primeiro clique abre o canal
  e.preventDefault(); e.stopPropagation(); openLb(z);
}, true);
$$('[data-zoom]').forEach(z => { if (!z.querySelector('.zi') && z.classList.contains('crop')) z.insertAdjacentHTML('beforeend', '<span class="zi"></span>'); });
$$('.zi').forEach(z => { z.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9"/></svg>'; });

/* ---------------------------------------------------------------------
   03 · canais em acordeão
   --------------------------------------------------------------------- */
(function accordion() {
  const panels = $$('#acc .acp'); if (!panels.length) return;
  let hoverT = 0;
  const open = p => panels.forEach(x => { const on = x === p; x.classList.toggle('open', on); x.setAttribute('aria-selected', on ? 'true' : 'false'); });
  panels.forEach(p => {
    p.addEventListener('click', () => open(p));
    p.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { if (e.target === p) { e.preventDefault(); open(p); } }
    });
    p.addEventListener('focusin', () => open(p));
    p.addEventListener('mouseenter', () => { clearTimeout(hoverT); hoverT = setTimeout(() => open(p), 220); });
    p.addEventListener('mouseleave', () => clearTimeout(hoverT));
  });
})();

/* ---------------------------------------------------------------------
   A5 · kit em vista explodida: arrastar para girar
   --------------------------------------------------------------------- */
(function kit3d() {
  const box = $('#kit3d'), k3 = $('#k3'); if (!box) return;
  let rx = 60, rz = -18, drag = null;
  const apply = () => { k3.style.setProperty('--rx', rx + 'deg'); k3.style.setProperty('--rz', rz + 'deg'); };
  box.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, rx, rz }; box.classList.add('dragging'); box.setPointerCapture(e.pointerId); });
  box.addEventListener('pointermove', e => {
    if (!drag) return;
    const s = parseFloat(stage.style.getPropertyValue('--scale')) || 1;
    rz = drag.rz + (e.clientX - drag.x) / s * 0.35;
    rx = Math.max(25, Math.min(75, drag.rx - (e.clientY - drag.y) / s * 0.25));
    apply();
  });
  const end = () => { drag = null; box.classList.remove('dragging'); };
  box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
  $('#kitGap').addEventListener('input', e => k3.style.setProperty('--gap', e.target.value + 'px'));
  $$('#kitTabs button').forEach(b => b.addEventListener('click', () => setKit(b.dataset.ch)));
  setKit('todos');
})();

/* ---------------------------------------------------------------------
   Notas do apresentador (tecla N)
   --------------------------------------------------------------------- */
const np = $('#np');
function fillNotes(s) {
  const n = $('.notes', s);
  np.innerHTML = `<h5>Notas · ${s.dataset.title}</h5>` + (n ? n.innerHTML : '<p>Sem notas para esta tela.</p>');
}
function toggleNotes() { if (!cur) return; fillNotes(cur); np.classList.toggle('open'); }

/* ---------------------------------------------------------------------
   Copiar e-mail
   --------------------------------------------------------------------- */
const toast = $('#toast');
document.addEventListener('click', e => {
  const c = e.target.closest('[data-copy]'); if (!c) return;
  const done = () => { toast.textContent = 'Copiado: ' + c.dataset.copy; toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 1800); };
  if (navigator.clipboard) navigator.clipboard.writeText(c.dataset.copy).then(done, done); else done();
});

/* ---------------------------------------------------------------------
   Cursor próprio (desligado em toque; tecla C alterna)
   --------------------------------------------------------------------- */
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const ring = $('#curRing'), dot = $('#curDot'), ringT = $('span', ring);
let cursorOn = fine && !mobile && store.get('lfs-cursor') !== 'off';
function toggleCursor() {
  if (!fine || mobile) return;
  cursorOn = !cursorOn; store.set('lfs-cursor', cursorOn ? 'on' : 'off');
  html.classList.toggle('has-cursor', cursorOn);
  toast.textContent = cursorOn ? 'Cursor da apresentação ligado' : 'Cursor do sistema ligado';
  toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 1500);
}
if (fine && !mobile) {
  html.classList.toggle('has-cursor', cursorOn);
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const t = `translate(${e.clientX}px,${e.clientY}px)`;
    dot.style.transform = t; ring.style.transform = t;
    html.classList.remove('cur-hide');
  }, { passive: true });
  document.addEventListener('mouseleave', () => html.classList.add('cur-hide'));
  document.addEventListener('mouseover', e => {
    const z = e.target.closest('.zoomable,[data-zoom]');
    const k = e.target.closest('.kit3d');
    const i = e.target.closest('button,a,[role=tab],input,label');
    ring.classList.remove('hov', 'lbl');
    if (z && !(z.closest('.acp:not(.open)'))) { ring.classList.add('lbl'); ringT.textContent = 'Ampliar'; }
    else if (k) { ring.classList.add('lbl'); ringT.textContent = 'Girar'; }
    else if (i) ring.classList.add('hov');
  });
}

/* ---------------------------------------------------------------------
   Fundo: partículas suaves ("gotas de leite") com leve paralaxe
   --------------------------------------------------------------------- */
(function particles() {
  const cv = $('#particles'), cx = cv.getContext('2d'); if (!cx) return;
  const low = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const N = mobile ? 26 : low ? 34 : 70;
  let W = 0, H = 0, dpr = 1, P = [], mx = 0, my = 0, smx = 0, smy = 0, last = 0;
  const resize = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
  };
  resize(); addEventListener('resize', resize);
  for (let i = 0; i < N; i++) P.push({ x: Math.random(), y: Math.random(), r: .5 + Math.random() * 1.9, vx: (Math.random() - .5) * .00004, vy: -.00002 - Math.random() * .00005, a: .15 + Math.random() * .5, ph: Math.random() * 6.28 });
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  const draw = t => {
    const dt = last ? Math.min(50, t - last) : 16; last = t;
    smx += (mx - smx) * .04; smy += (my - smy) * .04;
    cx.clearRect(0, 0, W, H);
    const light = body.dataset.theme === 'light';
    P.forEach(p => {
      if (!RM) { p.x += p.vx * dt; p.y += p.vy * dt; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); } if (p.x < -.02) p.x = 1.02; if (p.x > 1.02) p.x = -.02; }
      const tw = .65 + .35 * Math.sin(t * .0012 + p.ph);
      const px = (p.x - smx * p.r * .012) * W, py = (p.y - smy * p.r * .012) * H;
      cx.beginPath(); cx.arc(px, py, p.r * dpr, 0, 6.283);
      cx.fillStyle = light ? `rgba(0,75,133,${p.a * .45 * tw})` : `rgba(182,230,251,${p.a * tw})`;
      cx.fill();
    });
    if (!RM && !document.hidden) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !RM) { last = 0; requestAnimationFrame(draw); } });
})();

/* ---------------------------------------------------------------------
   Celular: rolagem vertical com entrada por interseção
   --------------------------------------------------------------------- */
if (mobile) {
  html.classList.add('m');
  intro.classList.add('done');
  setTheme('dark');
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) {
      const s = en.target;
      if (!s.classList.contains('is-in')) { s.classList.add('is-active', 'is-in'); runCounts(s); }
      cur = s; $('#chap').textContent = s.dataset.label || '';
    }
  }), { threshold: .18 });
  slides.forEach(s => io.observe(s));
  $('#apxOpen').addEventListener('click', () => { html.classList.add('show-apx'); apxS[0].scrollIntoView({ behavior: 'smooth' }); });
  const h = location.hash.slice(1), t = h && document.getElementById(h);
  if (t) { if (t.classList.contains('apx')) html.classList.add('show-apx'); setTimeout(() => t.scrollIntoView(), 60); }
  setOrbit(mainS[0]);
  return;
}

/* ---------------------------------------------------------------------
   Início
   --------------------------------------------------------------------- */
const start = document.getElementById(location.hash.slice(1));
const first = start && start.classList.contains('slide') ? start : mainS[0];
if (first !== mainS[0]) store.sset('lfs-intro', '1');
show(first, 1);
addEventListener('hashchange', () => { const t = document.getElementById(location.hash.slice(1)); if (t && t !== cur && t.classList.contains('slide')) go(t); });
})();
