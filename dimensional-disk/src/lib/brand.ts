// Brändin "halkeama"-tunnus vektorina. Muoto on jäljitetty brändikuvasta
// (halkeama ilman tekstiä); koordinaatisto 1860 × 140.
export const CRACK_W = 1860;
export const CRACK_H = 140;

export const crackPoints: [number, number][] = [
	// yläreuna vasemmalta oikealle (V-lovi = I-kirjaimen kohta)
	[0, 0], [493, 0], [562, 108], [613, 0], [860, 0], [915, 30], [895, 0], [1860, 0],
	// alareuna oikealta vasemmalle
	[1450, 33], [1480, 90], [1425, 53], [1255, 26], [985, 60], [1010, 88], [795, 26],
	[630, 66], [570, 140], [460, 56], [422, 79], [385, 30], [293, 71], [315, 33],
];

export const crackPolygon = crackPoints.map(([x, y]) => `${x},${y}`).join(' ');

/** Logon kiven sävyt (tummasta vaaleaan). */
export const rockShades = ['#1a2237', '#202b42', '#26344f', '#2e3e5c', '#364966', '#415570'];

/** Logon kuparipinnan sävyt. */
export const copper = { dark: '#a0522f', base: '#c8764b', light: '#e79664' };

/** Deterministinen näennäissatunnaisluku, jotta kuvitus on joka buildissa sama. */
function rng(seed: number) {
	let s = seed >>> 0;
	return () => {
		s = (s * 1664525 + 1013904223) >>> 0;
		return s / 4294967296;
	};
}

export interface Facet {
	points: string;
	fill: string;
}

/**
 * Kolmiofasetit alueelle w × h (kuten logon kivipinta). Reunapisteitä ei
 * jitteröidä, joten fasettikuvio peittää alueen aukottomasti.
 */
export function facets(w: number, h: number, cols: number, rows: number, shades: string[], seed = 7): Facet[] {
	const rand = rng(seed);
	const cw = w / cols;
	const rh = h / rows;
	const pts: [number, number][][] = [];
	for (let r = 0; r <= rows; r++) {
		const row: [number, number][] = [];
		for (let c = 0; c <= cols; c++) {
			const edgeX = c === 0 || c === cols;
			const edgeY = r === 0 || r === rows;
			const x = c * cw + (edgeX ? 0 : (rand() - 0.5) * cw * 0.7);
			const y = r * rh + (edgeY ? 0 : (rand() - 0.5) * rh * 0.7);
			row.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
		}
		pts.push(row);
	}
	const out: Facet[] = [];
	const pick = () => shades[Math.floor(rand() * shades.length)];
	const fmt = (p: [number, number][]) => p.map(([x, y]) => `${x},${y}`).join(' ');
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
			if (rand() > 0.5) {
				out.push({ points: fmt([a, b, e]), fill: pick() }, { points: fmt([a, e, d]), fill: pick() });
			} else {
				out.push({ points: fmt([a, b, d]), fill: pick() }, { points: fmt([b, e, d]), fill: pick() });
			}
		}
	}
	return out;
}
