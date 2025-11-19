
export default function createRasterCanvas(points, options = {}) {

    const {
        width = 800,
        height = 800,
        colorMap = (v) => `rgba(${255 - v * 20}, 0, ${v * 20}, 0.7)`,
        filters
    } = options;

    // Extract bounding box
    const lats = points.map(p => p.lat);
    const lons = points.map(p => p.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Draw each point
    const rectSize = filters.indicator === 2 ? 4 : 19.5;
    points.forEach(p => {
        const x = ((p.lon - minLon) / (maxLon - minLon)) * width;
        const y = height - ((p.lat - minLat) / (maxLat - minLat)) * height;

        ctx.fillStyle = colorMap(Number(p.v));
        ctx.fillRect(x, y, rectSize, rectSize + 3);
    });

    return {
        canvas,
        bounds: [
            [minLat, minLon],
            [maxLat, maxLon]
        ]
    };
}
