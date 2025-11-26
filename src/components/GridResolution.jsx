// utils: compute grid resolution from points = [{lat, lon, ...}, ...]
export default function computeGridResolution(points, opts = {}) {
    const {
        method = 'axis',       // 'axis' or 'nn' (nearest neighbor)
        roundingDecimals = 6,  // used when clustering diffs for mode
        minNonZero = 1e-9      // treat anything <= this as zero
    } = opts;

    const valid = (points || []).filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lon));
    if (valid.length === 0) return null;

    const lats = Array.from(new Set(valid.map(p => p.lat))).sort((a,b) => a - b);
    const lons = Array.from(new Set(valid.map(p => p.lon))).sort((a,b) => a - b);

    // helper: adjacent diffs
    const adjacentDiffs = arr => {
        const diffs = [];
        for (let i = 1; i < arr.length; i++) {
        const d = Math.abs(arr[i] - arr[i-1]);
        if (d > minNonZero) diffs.push(d);
        }
        return diffs;
    };

    // helper: median
    const median = arr => {
        if (!arr.length) return null;
        const a = arr.slice().sort((x,y) => x - y);
        const mid = Math.floor(a.length/2);
        return (a.length % 2) ? a[mid] : (a[mid-1] + a[mid]) / 2;
    };

    // helper: mode by rounding/clustering
    const modeByRounding = (arr, decimals=6) => {
        if (!arr.length) return null;
        const counts = new Map();
        for (const v of arr) {
        const key = Number(v.toFixed(decimals));
        counts.set(key, (counts.get(key) || 0) + 1);
        }
        // pick most frequent key
        let bestKey = null, bestCount = -1;
        for (const [k,c] of counts.entries()) {
        if (c > bestCount) { bestCount = c; bestKey = k; }
        }
        return bestKey;
    };

    // helper: meters conversion (approx)
    const metersPerDegLat = 111320; // approximate
    const midLat = valid.reduce((s,p) => s + p.lat, 0) / valid.length;
    const metersPerDegLon = metersPerDegLat * Math.cos(midLat * Math.PI / 180);

    if (method === 'axis') {
        // compute diffs on unique arrays
        const latDiffs = adjacentDiffs(lats);
        const lonDiffs = adjacentDiffs(lons);

        // choose representative spacing: prefer mode, fall back to median
        const latMode = modeByRounding(latDiffs, roundingDecimals);
        const lonMode = modeByRounding(lonDiffs, roundingDecimals);

        const latSpacingDeg = (latMode != null) ? latMode : median(latDiffs);
        const lonSpacingDeg = (lonMode != null) ? lonMode : median(lonDiffs);

        return {
        method: 'axis',
        latSpacingDeg: latSpacingDeg || 0,
        lonSpacingDeg: lonSpacingDeg || 0,
        latSpacingMeters: (latSpacingDeg || 0) * metersPerDegLat,
        lonSpacingMeters: (lonSpacingDeg || 0) * metersPerDegLon,
        uniqueLatCount: lats.length,
        uniqueLonCount: lons.length,
        midLat
        };
    }

    // method === 'nn' (nearest neighbor median)
    // naive O(n^2) approach, fine for moderate-sized datasets (<=~10k)
    const pts = valid.map(p => [p.lat, p.lon]);
    const n = pts.length;
    if (n === 1) {
        return {
        method: 'nn',
        latSpacingDeg: 0,
        lonSpacingDeg: 0,
        latSpacingMeters: 0,
        lonSpacingMeters: 0,
        midLat
        };
    }

    const nnDistances = []; // store nearest neighbor distances (in degrees)
    for (let i = 0; i < n; i++) {
        let best = Infinity;
        for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const dlat = pts[i][0] - pts[j][0];
        const dlon = pts[i][1] - pts[j][1];
        const distDeg = Math.sqrt(dlat*dlat + dlon*dlon); // Euclidean in degrees (good approximation for small spacing)
        if (distDeg < best) best = distDeg;
        }
        if (best < Infinity) nnDistances.push(best);
    }

    const medNNdeg = median(nnDistances);
    // approximate split into lat/lon by looking at differences to nearest neighbor: compute signed components for each pair
    // We'll estimate typical lat and lon steps by taking medians of abs lat differences to nearest neighbors and abs lon differences.
    const latNN = [];
    const lonNN = [];
    for (let i = 0; i < n; i++) {
        let best = Infinity, bestJ = -1;
        for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const dlat = pts[i][0] - pts[j][0];
        const dlon = pts[i][1] - pts[j][1];
        const distDeg = Math.sqrt(dlat*dlat + dlon*dlon);
        if (distDeg < best) { best = distDeg; bestJ = j; }
        }
        if (bestJ >= 0) {
        latNN.push(Math.abs(pts[i][0] - pts[bestJ][0]));
        lonNN.push(Math.abs(pts[i][1] - pts[bestJ][1]));
        }
    }

    const latSpacingDeg = median(latNN) || 0;
    const lonSpacingDeg = median(lonNN) || 0;

    return {
        method: 'nn',
        nearestNeighborMedianDeg: medNNdeg,
        latSpacingDeg,
        lonSpacingDeg,
        latSpacingMeters: latSpacingDeg * metersPerDegLat,
        lonSpacingMeters: lonSpacingDeg * metersPerDegLon,
        midLat
    };
}
