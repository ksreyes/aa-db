import './LegendRaster.css'
import legendData from "../legendData.json";

export default function Legend({ filters, title = "Legend" }) {

    const indicator = filters.indicator;
    const items = legendData[indicator];
    console.log(items);

    return (
        <div className="map-legend">
        <div className="legend-title">{title}</div>
        {Object.entries(items).map(([key, value]) => (
            <div key={key} className="legend-row">
            <span
                className="legend-color"
                style={{ backgroundColor: value.color }}
            />
            <span className="legend-label">{value.label}</span>
            </div>
        ))}
        </div>
    );
}
