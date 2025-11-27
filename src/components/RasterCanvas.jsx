import computeGridResolution from './GridResolution.jsx';
import countryData from "../countryData.json";

export default function createRasterCanvas(points, filters) {

    const country = Number(filters.country);
    const indicator = Number(filters.indicator);
    const lead = Number(filters.lead);
    const countryBounds = countryData[country].bounds;
    const [[minLat, minLon], [maxLat, maxLon]] = countryBounds;

    // Compute grid resolution
    const checkPoints = points.filter(p => p.indicator === indicator);
    const resAxis = computeGridResolution(checkPoints, { method: 'axis' });
    const latSpacingDeg = resAxis.latSpacingDeg;

    function filterPoints(points) {
        return points.filter(
            p => p.admin0 === country && 
                p.indicator === indicator &&
                p.lead === lead
        );
    }

    let filteredPoints = filterPoints(points);
    if (filteredPoints.length === 0) return;

    // Compute canvas size from country bounding box
    const EARTH_RADIUS = 6371; // km

    // Height (north–south): 1° lat = 111 km approx
    const heightKm = (maxLat - minLat) * 111;

    // Width (east–west): 1° lon = 111 km * cos(latitude)
    const midLat = (minLat + maxLat) / 2;
    const widthKm = (maxLon - minLon) * 111 * Math.cos(midLat * Math.PI / 180);

    const aspectRatio = heightKm / widthKm;
    const baseWidth = 1200;
    const width = baseWidth;
    const height = Math.round(baseWidth * aspectRatio);

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Compute cell size in pixels
    const cellWidth  = width / ((maxLon - minLon) / latSpacingDeg);
    const cellHeight = height / ((maxLat - minLat) / latSpacingDeg);

    const fills = {
        1: "hsla(40, 100%, 90%, 0.50)",
        2: "hsla(31, 100%, 78%, 0.50)",
        3: "hsla(12, 100%, 72%, 0.50)",
        4: "hsla(15, 100%, 62%, 0.60)",
        5: "hsla(351, 80%, 60%, 0.60)",
        6: "hsla(357, 69%, 49%, 0.70)",
        7: "hsla(357, 69%, 49%, 0.75)",
        8: "hsla(357, 69%, 49%, 0.80)",
        9: "hsla(357, 69%, 40%, 0.85)"
    };

    function fillMap(v) {
        return fills[v] || "rgba(0,0,0,0)";
    }

    filteredPoints.forEach(p => {
        const x = ((p.lon - minLon) / (maxLon - minLon)) * width;
        const y = height - ((p.lat - minLat) / (maxLat - minLat)) * height;

        ctx.fillStyle = fillMap(Number(p.v));
        ctx.fillRect(x, y, cellWidth, cellHeight);
    });

    return {
        canvas,
        bounds: [
            [minLat, minLon],
            [maxLat, maxLon]
        ]
    };
}
