import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import Papa from "papaparse";

export default function BubbleOverlay({ filters }) {
    const map = useMap();
    const [bubbles, setBubbles] = useState([]);

    // Load the bubble dataset
    useEffect(() => {
        Papa.parse(`${import.meta.env.BASE_URL}data_idp.csv`, {
            download: true,
            header: true,
            complete: (results) => {
                const clean = results.data
                    .filter(row => row.lat && row.lon)
                    .map(row => ({
                        ...row,
                        lat: Number(row.lat),
                        lon: Number(row.lon),
                        geo: Number(row.geo),
                        type: Number(row.type),
                        n: Number(row.n)   // whatever numeric metric you want to size by
                    }));
                setBubbles(clean);
            }
        });
    }, []);

    // Draw & update bubbles
    useEffect(() => {
        if (bubbles.length === 0) return;

        const layerGroup = L.layerGroup();

        const filtered = bubbles.filter(b =>
            b.geo === Number(filters.country) &&
            (
                (filters.idp && b.type === 0) ||   // show type 0 if idp is true
                (filters.return && b.type === 1)   // show type 1 if return is true
            )
        );

        filtered.forEach(b => {
            const radius = 1 + Math.sqrt(b.n) * 0.2;
            const color = b.type === 0 ? "#0033A0" : "#D22630";
            const fill = b.type === 0 ? "#B3C2E3" : "#F2BEC1";

            const circle = L.circleMarker([b.lat, b.lon], {
                radius,
                color: color,
                fillColor: fill,
                fillOpacity: 0.1,
                weight: 1
            });

            circle.bindTooltip(
                `${b.type === 0 ? "IDPs" : "Returnees"}: ${b.n}`
            );
            circle.addTo(layerGroup);
        });

        layerGroup.addTo(map);

        return () => {
            layerGroup.remove(); // cleanup when filters change
        };
    }, [bubbles, filters, map]);

    return null;
}
