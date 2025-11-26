import countryData from "../countryData.json";

export default function FilterCountry({ filters, setFilters }) {
    
    const handleChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            country: event.target.value,
            lead: 1
        }));
    };

    return (
        <div className="filter country-filter">
            <h2 htmlFor="country-filter" className="filter-label block">
                Country
            </h2>

            <select
                id="country-filter"
                value={filters.country}
                onChange={handleChange}
                className="mgn-t-1"
            >
                {Object.entries(countryData).map(([key, country]) => (
                    <option key={key} value={key}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
