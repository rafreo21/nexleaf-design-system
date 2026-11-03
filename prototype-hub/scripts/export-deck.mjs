#!/usr/bin/env node
// Exports the Visa V2 deck frames from the running hub (npx vite prototype-hub --port 5173).
// PNGs are screenshots of the real page. SVGs are read from the rendered DOM, so
// they carry real <text> and match the components exactly.
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(here, '../../package.json'));
const { chromium } = require('playwright');
const OUT = resolve(here, '../../visa-v2-screens');
const FONT = ['inter', 'roboto'].map((name) => readFileSync(resolve(here, `../src/projects/visa-v2-deck/${name}.css`), 'utf8')).join('');
mkdirSync(OUT, { recursive: true });

// Mobile screens are 360 × 800 dp inside a handset frame; web sliders use the 560 panel.
const MOBILE = { width: 404, height: 852, dsf: 3 };
const SLIDER = { width: 560, height: 900 };
const FRAMES = {
  'P1-hero': { width: 800, height: 1063, slot: [620, 824], dsf: 1240 / 800, float: true },
  'P5-workshop': { width: 760, height: 824 },
  'P6a-alert': MOBILE, 'P6b-checking': MOBILE, 'P6c-troubleshoot': MOBILE, 'P6d-confirm': MOBILE, 'P6e-raised': MOBILE,
  'P7-confirm': { ...MOBILE, times: [0, 1.2, 1.7, 2.7], total: 6 },
  'P8-channels': { width: 664, height: 852, times: [0.5, 1.3, 2.1, 3.7, 4.4, 5.2, 6.1, 6.9], total: 14 },
  'P9-failure': MOBILE,
  'P11-working': { ...MOBILE, times: [0, 1, 2, 3], total: 8 },
  'P12-mvp': { width: 398, height: 380 },
  'P13-live': SLIDER,
  'W6b-checking': SLIDER, 'W6c-troubleshoot': SLIDER, 'W6d-confirm': SLIDER, 'W6e-raised': SLIDER,
  'W7-confirm': { ...SLIDER, times: [0, 1.2, 1.7, 2.7], total: 6 },
  'W9-failure': SLIDER,
  'W11-working': { ...SLIDER, times: [0, 1, 2, 3], total: 8 },
  'W14-feedback': SLIDER,
  'P14-v3': MOBILE,
  'P16-fairmoney': { width: 800, height: 1030, slot: [640, 824], dsf: 1280 / 800 },
  'P19-language': { ...MOBILE, times: [0, 1.2, 2.4, 3.6], total: 8 },
};

// Runs in the page: walks the rendered DOM into SVG markup.
function domToSvg(prefix) {
  let uid = 0;
  const defs = [];
  const num = (n) => +n.toFixed(2);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const canvas = document.createElement('canvas').getContext('2d');
  const family = (cs) => (cs.fontFamily.startsWith('Roboto') ? 'Roboto' : 'Inter');
  const ascent = (cs) => {
    canvas.font = `${cs.fontWeight} ${cs.fontSize} ${family(cs)}`;
    return canvas.measureText('Hg').fontBoundingBoxAscent;
  };
  const opaque = (c) => c && c !== 'transparent' && !/rgba\(.*, 0\)$/.test(c);
  const radii = (cs, w, h) => ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].map((k) => {
    const v = cs[k].split(' ')[0];
    const r = v.endsWith('%') ? (parseFloat(v) / 100) * Math.min(w, h) : parseFloat(v);
    return Math.min(r || 0, w / 2, h / 2);
  });
  const box = (x, y, w, h, [a, b, c, d]) => `M${num(x + a)} ${num(y)}H${num(x + w - b)}A${b} ${b} 0 0 1 ${num(x + w)} ${num(y + b)}V${num(y + h - c)}A${c} ${c} 0 0 1 ${num(x + w - c)} ${num(y + h)}H${num(x + d)}A${d} ${d} 0 0 1 ${num(x)} ${num(y + h - d)}V${num(y + a)}A${a} ${a} 0 0 1 ${num(x + a)} ${num(y)}Z`;
  const shadows = (v) => (v === 'none' ? [] : v.split(/,(?![^(]*\))/).map((s) => {
    const color = s.match(/rgba?\([^)]*\)/)[0];
    const n = s.replace(color, '').match(/-?[\d.]+px/g).map(parseFloat);
    return { color, x: n[0], y: n[1], blur: n[2] || 0, spread: n[3] || 0, inset: /inset/.test(s) };
  }));
  const blurId = (b) => {
    const id = `${prefix}b${String(b).replace('.', '_')}`;
    if (!defs.some((d) => d.includes(`id="${id}"`))) defs.push(`<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${b / 2}"/></filter>`);
    return id;
  };

  function paint(el, cs, r) {
    let out = '';
    const rad = radii(cs, r.width, r.height);
    const path = box(r.left, r.top, r.width, r.height, rad);
    const sh = shadows(cs.boxShadow);
    for (const s of sh.filter((q) => !q.inset).reverse()) {
      const p = box(r.left + s.x - s.spread, r.top + s.y - s.spread, r.width + s.spread * 2, r.height + s.spread * 2, rad.map((q) => q + s.spread));
      out += `<path d="${p}" fill="${s.color}"${s.blur ? ` filter="url(#${blurId(s.blur)})"` : ''}/>`;
    }
    if (opaque(cs.backgroundColor)) out += `<path d="${path}" fill="${cs.backgroundColor}"/>`;
    const inset = sh.filter((q) => q.inset);
    if (inset.length) {
      const id = `${prefix}c${++uid}`;
      defs.push(`<clipPath id="${id}"><path d="${path}"/></clipPath>`);
      for (const s of inset.reverse()) {
        const hole = box(r.left + s.x + s.spread, r.top + s.y + s.spread, r.width - s.spread * 2, r.height - s.spread * 2, rad.map((q) => Math.max(q - s.spread, 0)));
        const outer = `M${r.left - 40} ${r.top - 40}H${r.right + 40}V${r.bottom + 40}H${r.left - 40}Z`;
        out += `<g clip-path="url(#${id})"><path d="${outer}${hole}" fill-rule="evenodd" fill="${s.color}"${s.blur ? ` filter="url(#${blurId(s.blur)})"` : ''}/></g>`;
      }
    }
    const sides = ['Top', 'Right', 'Bottom', 'Left'].map((k) => ({ w: parseFloat(cs[`border${k}Width`]), c: cs[`border${k}Color`], s: cs[`border${k}Style`] }));
    const on = sides.filter((s) => s.w > 0 && s.s !== 'none' && opaque(s.c));
    if (on.length === 4 && sides.every((s) => s.w === sides[0].w && s.c === sides[0].c)) {
      const w = sides[0].w;
      out += `<path d="${box(r.left + w / 2, r.top + w / 2, r.width - w, r.height - w, rad.map((q) => Math.max(q - w / 2, 0)))}" fill="none" stroke="${sides[0].c}" stroke-width="${w}"/>`;
    } else {
      const [t, ri, b, l] = sides;
      const line = (s, x1, y1, x2, y2) => (s.w > 0 && s.s !== 'none' && opaque(s.c) ? `<line x1="${num(x1)}" y1="${num(y1)}" x2="${num(x2)}" y2="${num(y2)}" stroke="${s.c}" stroke-width="${s.w}"/>` : '');
      out += line(t, r.left, r.top + t.w / 2, r.right, r.top + t.w / 2) + line(ri, r.right - ri.w / 2, r.top, r.right - ri.w / 2, r.bottom) + line(b, r.left, r.bottom - b.w / 2, r.right, r.bottom - b.w / 2) + line(l, r.left + l.w / 2, r.top, r.left + l.w / 2, r.bottom);
    }
    return out;
  }

  function text(node, cs) {
    const value = node.nodeValue;
    if (!value.trim()) return '';
    const range = document.createRange();
    const lines = [];
    for (let i = 0; i < value.length; i += 1) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getClientRects()[0];
      if (!rect || rect.width === 0) continue;
      const last = lines[lines.length - 1];
      if (last && Math.abs(last.top - rect.top) < 2) last.s += value[i];
      else lines.push({ top: rect.top, left: rect.left, height: rect.height, s: value[i] });
    }
    const asc = ascent(cs);
    return lines.map((l) => {
      const s = l.s.replace(/\s+$/, '');
      if (!s.trim()) return '';
      const spacing = parseFloat(cs.letterSpacing);
      return `<text x="${num(l.left)}" y="${num(l.top + asc)}"${family(cs) === 'Roboto' ? ' style="font-family:Roboto"' : ''} font-size="${cs.fontSize}" font-weight="${cs.fontWeight}" fill="${cs.color}"${spacing ? ` letter-spacing="${spacing}"` : ''} xml:space="preserve">${esc(s)}</text>`;
    }).join('');
  }

  function vector(el, cs, r) {
    const copy = el.cloneNode(true);
    const w = el.width?.baseVal?.value || r.width;
    const h = el.height?.baseVal?.value || r.height;
    copy.removeAttribute('style');
    copy.removeAttribute('class');
    copy.setAttribute('width', w);
    copy.setAttribute('height', h);
    if (!copy.getAttribute('viewBox')) copy.setAttribute('viewBox', `0 0 ${w} ${h}`);
    copy.setAttribute('color', cs.color);
    copy.setAttribute('overflow', 'visible');
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const m = [cs.transform, getComputedStyle(el.parentElement).transform].map((t) => (t && t.startsWith('matrix') ? t.match(/-?[\d.e-]+/g).map(Number) : null));
    const a = m[0] && (m[0][0] !== 1 || m[0][1] !== 0) ? m[0] : m[1] && (m[1][0] !== 1 || m[1][1] !== 0) ? m[1] : null;
    const rotate = a ? ` matrix(${a[0]} ${a[1]} ${a[2]} ${a[3]} 0 0)` : '';
    const spin = cs.animationName !== 'none' ? ' class="spin"' : '';
    return `<g transform="translate(${num(cx)} ${num(cy)})${rotate} translate(${num(-w / 2)} ${num(-h / 2)})"><g${spin}>${new XMLSerializer().serializeToString(copy)}</g></g>`;
  }

  function walk(el) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || el.hidden) return '';
    const r = el.getBoundingClientRect();
    if (el.tagName.toLowerCase() === 'svg') return r.width ? vector(el, cs, r) : '';
    let inner = paint(el, cs, r);
    if (['INPUT', 'TEXTAREA'].includes(el.tagName) && el.placeholder && !el.value) {
      const color = getComputedStyle(el, '::placeholder').color;
      const line = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.25;
      canvas.font = `${cs.fontWeight} ${cs.fontSize} Inter`;
      const m = canvas.measureText('Hg');
      const y = r.top + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + (line - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
      inner += `<text x="${num(r.left + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth))}" y="${num(y)}" font-size="${cs.fontSize}" font-weight="${cs.fontWeight}" fill="${color}">${esc(el.placeholder)}</text>`;
    }
    for (const child of el.childNodes) {
      if (child.nodeType === 3) inner += text(child, cs);
      else if (child.nodeType === 1 && !['STYLE', 'SCRIPT'].includes(child.tagName)) inner += walk(child);
    }
    if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
      const id = `${prefix}c${++uid}`;
      defs.push(`<clipPath id="${id}"><path d="${box(r.left, r.top, r.width, r.height, radii(cs, r.width, r.height))}"/></clipPath>`);
      inner = `<g clip-path="url(#${id})">${inner}</g>`;
    }
    const attrs = [];
    if (+cs.opacity < 1) attrs.push(`opacity="${cs.opacity}"`);
    if (el.dataset.float) attrs.push(`class="${el.dataset.float}"`);
    if (el.classList.contains('nx-ai-chat-typing__dot')) attrs.push('class="dot"');
    return attrs.length ? `<g ${attrs.join(' ')}>${inner}</g>` : inner;
  }

  return { body: walk(document.body), defs: defs.join('') };
}

const BASE = 'text{font-family:Inter,Arial,sans-serif}.spin{transform-box:fill-box;transform-origin:center;animation:sp .8s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}.dot{animation:dt 1.2s ease-in-out infinite}@keyframes dt{0%,100%{opacity:.3}40%{opacity:1}}';
const only = process.argv[2]?.split(',');
const browser = await chromium.launch();
const report = [];
for (const [id, f] of Object.entries(FRAMES)) {
  if (only && !only.includes(id)) continue;
  const dsf = f.dsf ?? 2;
  const context = await browser.newContext({ viewport: { width: f.width, height: f.height }, deviceScaleFactor: dsf });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const states = f.times?.length ?? 1;
  const layers = [];
  const defs = [];
  let css = BASE + (f.float ? '@keyframes fl{0%,100%{transform:translateY(1px)}50%{transform:translateY(-1px)}}.f1{animation:fl 6s ease-in-out infinite}.f2{animation:fl 6s ease-in-out -3s infinite}' : '');
  for (let state = 0; state < states; state += 1) {
    await page.goto(`http://localhost:5173/frames.html?id=${id}&state=${state}`);
    await page.addStyleTag({ content: FONT });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    await page.evaluate(() => {
      document.activeElement?.blur();
      document.querySelectorAll('div').forEach((el) => {
        if (getComputedStyle(el).overflowY === 'auto') el.scrollTop = el.scrollHeight;
      });
    });
    await page.waitForTimeout(80);
    const { body, defs: d } = await page.evaluate(domToSvg, `${id.split('-')[0]}s${state}`);
    defs.push(d);
    if (f.times) {
      const p = (t) => +((t / f.total) * 100).toFixed(2);
      const t = f.times[state];
      css += state === 0 ? '' : `@keyframes L${state}{0%,${p(t)}%{opacity:0}${p(t + 0.2)}%,${p(f.total - 0.3)}%{opacity:1}100%{opacity:0}}.L${state}{animation:L${state} ${f.total}s linear infinite}`;
      layers.push(`<g class="L${state}">${body}</g>`);
    } else layers.push(body);
    if (state === states - 1) await page.screenshot({ path: `${OUT}/${id}.png` });
  }
  const [w, h] = f.slot ?? [f.width, f.height];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${f.width} ${f.height}"><style>${FONT}${css}</style><defs>${defs.join('')}</defs><rect width="${f.width}" height="${f.height}" fill="#f1f1f1"/>${layers.join('')}</svg>`;
  writeFileSync(`${OUT}/${id}.svg`, svg);
  report.push(`${id}: ${errors.length ? errors.slice(0, 2).join(' | ') : 'ok'}`);
  await context.close();
}
await browser.close();
console.log(report.join('\n'));
