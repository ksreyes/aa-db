export default function SubscribeLead({ subFilters, setSubFilters }) {

    const handleChange = (event) => {
        setSubFilters((prevFilters) => ({
            ...prevFilters,
            lead: Number(event.target.value),
        }));
    };

    let unit;
    if (subFilters.indicator !== 1 && subFilters.lead === 1) {
        unit = "day";
    } else if (subFilters.indicator !== 1 && subFilters.lead !== 1) {
        unit = "days";
    } else if (subFilters.indicator === 1 && subFilters.lead === 1) {
        unit = "month";
    } else if (subFilters.indicator === 1 && subFilters.lead !== 1) {
        unit = "months";
    }

    let max;
    if (subFilters.indicator === 1 ) {
        max = 5;
    } else if (subFilters.indicator === 2 ) {
        max = 29;
    } else if (subFilters.indicator === 3 ) {
        max = 10;
    } else if (subFilters.indicator === 4 ) {
        max = 7;
    }

    return (
        <div className="subscribe-filter lead-filter">
            <h2 htmlFor="lead-filter" className="filter-label block">
                Lead: {subFilters.lead} {unit}
            </h2>

            <input
                id="lead-filter"
                type="range"
                min="0"
                max={max}
                step="1"
                value={subFilters.lead}
                onChange={handleChange}
                className="mgn-t-2"
            />
        </div>
    );
}