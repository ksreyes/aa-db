import indicatorsData from "../indicatorsData.json";

export default function SubscribeIndicator({ subFilters, setSubFilters }) {

    const handleChange = (event) => {
        setSubFilters((prevFilters) => ({
            ...prevFilters,
            indicator: +event.target.value,
            lead: 1
        }));
    };

    return (
        <div className="subscribe-filter">
            <h2 className="filter-label">Indicator</h2>
            <div className="flex-row col-gap-2">
                {Object.entries(indicatorsData).map(([key, indicator]) => (
                    <label key={key} className="mgn-t-1 mgn-r-1">
                        <input
                            type="radio"
                            name="option"
                            value={+key}
                            checked={subFilters.indicator === +key}
                            onChange={handleChange}
                            className="mgn-r-1"
                        />
                        <span>{indicator.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
