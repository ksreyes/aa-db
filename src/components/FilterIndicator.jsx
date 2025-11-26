import indicatorsData from "../indicatorsData.json";

function FilterIndicator({ filters, setFilters }) {

    const handleChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            indicator: +event.target.value,
            lead: 1
        }));
    };

    return (
        <div className="filter">
            <h2 className="filter-label">Indicator</h2>
            <div className="flex-row col-gap-2">
                {Object.entries(indicatorsData).map(([key, indicator]) => (
                    <label key={key} className="mgn-t-1 mgn-r-1">
                        <input
                            type="radio"
                            name="option"
                            value={+key}
                            checked={filters.indicator === +key}
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

export default FilterIndicator;