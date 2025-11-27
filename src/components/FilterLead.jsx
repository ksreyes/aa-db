export default function FilterLead({ filters, setFilters }) {

    const handleChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            lead: Number(event.target.value),
        }));
    };

    let unit;
    if (filters.indicator !== 2 && filters.lead === 1) {
        unit = "month";
    } else if (filters.indicator !== 2 && filters.lead !== 1) {
        unit = "months";
    } else if (filters.indicator === 2 && filters.lead === 1) {
        unit = "day";
    } else if (filters.indicator === 2 && filters.lead !== 1) {
        unit = "days";
    }

    const max = filters.indicator === 2 ? 29 : 6;

    return (
        <div className="filter lead-filter">
            <h2 htmlFor="lead-filter" className="filter-label block">
                Lead: {filters.lead} {unit}
            </h2>

            <input
                id="lead-filter"
                type="range"
                min="0"
                max={max}
                step="1"
                value={filters.lead}
                onChange={handleChange}
                className="mgn-t-2"
            />
        </div>
    );
}