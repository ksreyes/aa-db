
export default function FilterBubbles({ filters, setFilters }) {

    const toggle = (key) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: !filters[key]
        }));
    };

    return (
        <div className="filter bubble-filter">
            
            <h2 htmlFor="bubble-filter" className="filter-label block">
                Show
            </h2>

            <div className="filter-items"> 
                <label>
                    <input
                        type="checkbox"
                        checked={filters.idp}
                        onChange={() => toggle("idp")}
                    />
                    IDPs
                </label>

                {/* <label>
                    <input
                        type="checkbox"
                        checked={filters.return}
                        onChange={() => toggle("return")}
                    />
                    returnees
                </label> */}
            </div>

        </div>
    );
}
