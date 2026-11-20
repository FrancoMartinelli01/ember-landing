/**
 * Máscara de cierre "TABLE": disolución orgánica que empieza por arriba.
 * Campo de ruido determinístico + marching squares → contornos suavizados con curvas
 * cuadráticas → clip-path: path(evenodd, ...). Es geometría calculada en CPU, no una simulación.
 */

const fract = (x: number) => x - Math.floor(x);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const H = (x: number, y: number, s: number) => fract(Math.sin(127.1 * x + 311.7 * y + 74.7 * s) * 43758.5453);

/** Ruido de valor coherente (interpolación bilineal suavizada de hashes en la grilla entera). */
const N = (x: number, y: number, s: number) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  let fx = x - ix;
  let fy = y - iy;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  const a = H(ix, iy, s);
  const b = H(ix + 1, iy, s);
  const c = H(ix, iy + 1, s);
  const d = H(ix + 1, iy + 1, s);
  return lerp(lerp(a, b, fx), lerp(c, d, fx), fy);
};

const Q = (x: number, y: number, s: number) => {
  const i = 0.8 * x + 0.6 * y;
  const j = -0.6 * x + 0.8 * y;
  const a = N(0.7 * x + 3.1, 0.7 * y + 7.3, s + 11.3) - 0.5;
  const b = N(0.7 * x + 9.7, 0.7 * y + 1.9, s + 23.9) - 0.5;
  const c = N(x + 1.6 * a, y + 1.6 * b, s);
  const d = N(2.13 * i + 5.2, 2.13 * j + 1.3, s + 31.7);
  const e = N(4.7 * x + 2.6, 4.7 * y + 8.4, s + 57.1);
  return Math.tanh(((c + 0.3 * d + 0.15 * e) / 1.45 - 0.5) / 0.17);
};

const BORDE = 1e9;
const AREA_MIN = 9 * 9 * 0.25;

export type CampoCierre = {
  W: number;
  H: number;
  cell: number;
  nx: number;
  ny: number;
  n0: Float32Array;
  n1: Float32Array;
  slope: Float32Array;
  borde: Uint8Array;
  // buffers reutilizados entre cuadros
  valores: Float64Array;
  px: Float32Array;
  py: Float32Array;
  l1: Int32Array;
  l2: Int32Array;
  visto: Uint8Array;
};

/** Precalcula (y cachea) los dos campos de ruido y la pendiente para un tamaño de escenario. */
export const crearCampo = (W: number, Hh: number): CampoCierre => {
  const cell = Math.max(12, Math.sqrt((W * Hh) / 14000));
  const nx = Math.ceil(W / cell) + 2;
  const ny = Math.ceil(Hh / cell) + 2;
  const n = nx * ny;
  const n0 = new Float32Array(n);
  const n1 = new Float32Array(n);
  const slope = new Float32Array(n);
  const borde = new Uint8Array(n);
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const k = j * nx + i;
      if (i === 0 || j === 0 || i === nx - 1 || j === ny - 1) {
        borde[k] = 1;
        continue;
      }
      const x = -cell + i * cell;
      const y = -cell + j * cell;
      slope[k] = (clamp01(y / Hh) - 0.3 * (0.5 - 0.5 * Math.cos(Math.PI * clamp01(x / W)))) * 4.5;
      n0[k] = Q(x / 140, y / 140, 1);
      n1[k] = Q(x / 140 + 17.3, y / 140 + 5.9, 138.13);
    }
  }
  const aristasH = (nx - 1) * ny;
  const aristas = aristasH + nx * (ny - 1);
  return {
    W,
    H: Hh,
    cell,
    nx,
    ny,
    n0,
    n1,
    slope,
    borde,
    valores: new Float64Array(n),
    px: new Float32Array(aristas),
    py: new Float32Array(aristas),
    l1: new Int32Array(aristas),
    l2: new Int32Array(aristas),
    visto: new Uint8Array(aristas),
  };
};

const r1 = (v: number) => Math.round(v * 10) / 10;

/**
 * Devuelve el path evenodd (rectángulo exterior + agujeros) para el progreso q ya suavizado.
 * Los agujeros son las zonas con campo por debajo del umbral: ahí el escenario desaparece.
 */
export const pathCierre = (c: CampoCierre, q: number): string => {
  const { nx, ny, cell, n0, n1, slope, borde, valores: v, px, py, l1, l2, visto } = c;
  const fase = q * 0.35 * (Math.PI / 2);
  const cs = Math.cos(fase);
  const sn = Math.sin(fase);
  for (let k = 0; k < nx * ny; k++) v[k] = borde[k] ? BORDE : n0[k] * cs + n1[k] * sn + slope[k];
  const t = lerp(-2.4, 5.55, q);

  const aristasH = (nx - 1) * ny;
  l1.fill(-1);
  l2.fill(-1);
  visto.fill(0);

  const idH = (i: number, j: number) => j * (nx - 1) + i;
  const idV = (i: number, j: number) => aristasH + j * nx + i;

  const nodo = (id: number, xa: number, ya: number, va: number, xb: number, yb: number, vb: number) => {
    const den = vb - va;
    const u = den === 0 ? 0.5 : clamp01((t - va) / den);
    px[id] = xa + (xb - xa) * u;
    py[id] = ya + (yb - ya) * u;
    return id;
  };
  const unir = (a: number, b: number) => {
    if (l1[a] === -1) l1[a] = b;
    else if (l2[a] === -1) l2[a] = b;
    if (l1[b] === -1) l1[b] = a;
    else if (l2[b] === -1) l2[b] = a;
  };

  const usados: number[] = [];
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const tl = v[j * nx + i];
      const tr = v[j * nx + i + 1];
      const br = v[(j + 1) * nx + i + 1];
      const bl = v[(j + 1) * nx + i];
      const caso = (tl < t ? 8 : 0) | (tr < t ? 4 : 0) | (br < t ? 2 : 0) | (bl < t ? 1 : 0);
      if (caso === 0 || caso === 15) continue;
      const x0 = -cell + i * cell;
      const y0 = -cell + j * cell;
      const x1 = x0 + cell;
      const y1 = y0 + cell;
      const T = () => nodo(idH(i, j), x0, y0, tl, x1, y0, tr);
      const B = () => nodo(idH(i, j + 1), x0, y1, bl, x1, y1, br);
      const L = () => nodo(idV(i, j), x0, y0, tl, x0, y1, bl);
      const R = () => nodo(idV(i + 1, j), x1, y0, tr, x1, y1, br);
      let a: number, b: number;
      switch (caso) {
        case 1:
        case 14:
          a = L(); b = B(); unir(a, b); usados.push(a, b); break;
        case 2:
        case 13:
          a = B(); b = R(); unir(a, b); usados.push(a, b); break;
        case 3:
        case 12:
          a = L(); b = R(); unir(a, b); usados.push(a, b); break;
        case 4:
        case 11:
          a = T(); b = R(); unir(a, b); usados.push(a, b); break;
        case 6:
        case 9:
          a = T(); b = B(); unir(a, b); usados.push(a, b); break;
        case 7:
        case 8:
          a = T(); b = L(); unir(a, b); usados.push(a, b); break;
        case 5:
        case 10: {
          const media = (tl + tr + br + bl) / 4;
          const tt = T(), rr = R(), bb = B(), ll = L();
          if ((caso === 5) === (media < t)) {
            unir(tt, ll); unir(bb, rr);
          } else {
            unir(tt, rr); unir(ll, bb);
          }
          usados.push(tt, rr, bb, ll);
          break;
        }
      }
    }
  }

  let d = `M0 0H${r1(c.W)}V${r1(c.H)}H0Z`;
  const pts: number[] = [];
  for (const inicio of usados) {
    if (visto[inicio]) continue;
    pts.length = 0;
    let prev = -1;
    let cur = inicio;
    let cerrado = false;
    for (let guard = 0; guard < 200000; guard++) {
      visto[cur] = 1;
      pts.push(px[cur], py[cur]);
      const sig = l1[cur] !== prev ? l1[cur] : l2[cur];
      if (sig === -1) break;
      if (sig === inicio) { cerrado = true; break; }
      if (visto[sig]) break;
      prev = cur;
      cur = sig;
    }
    const nv = pts.length / 2;
    if (!cerrado || nv < 3) continue;
    let area = 0;
    for (let k = 0; k < nv; k++) {
      const m = (k + 1) % nv;
      area += pts[2 * k] * pts[2 * m + 1] - pts[2 * m] * pts[2 * k + 1];
    }
    if (Math.abs(area) / 2 < AREA_MIN) continue;
    const lx = pts[2 * nv - 2], ly = pts[2 * nv - 1];
    d += `M${r1((lx + pts[0]) / 2)} ${r1((ly + pts[1]) / 2)}`;
    for (let k = 0; k < nv; k++) {
      const m = (k + 1) % nv;
      const x = pts[2 * k], y = pts[2 * k + 1];
      d += `Q${r1(x)} ${r1(y)} ${r1((x + pts[2 * m]) / 2)} ${r1((y + pts[2 * m + 1]) / 2)}`;
    }
    d += "Z";
  }
  return d;
};

export const soportaPath = () =>
  typeof CSS !== "undefined" && CSS.supports?.("clip-path", 'path(evenodd, "M0 0H1V1H0Z")');
