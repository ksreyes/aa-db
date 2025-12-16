import './LegendRaster.css'
import legendData from "../legendData.json";

export default function SubscribeSeverity({ subFilters }) {

    const indicator = subFilters.indicator;
    const items = legendData[indicator];

    return (
        <div className="subscribe-filter severity-filter">
            
            <h2 htmlFor="severity-filter" className="filter-label block">
                Severity level
            </h2>

            <div className="filter-items"> 
                {Object.entries(items).map(([key, value]) => (
                    <div className="severity-item">
                        <label>
                            <input
                                type="checkbox"
                                // checked={filters.idp}
                                // onChange={() => toggle("idp")}
                            />
                            <span className="severity-number">{key}</span> {value.label}
                        </label>
                    </div>
                ))}
            </div>

        </div>
    );
}
