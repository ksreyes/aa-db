import FilterCountry from './FilterCountry.jsx';
import FilterIndicator from './FilterIndicator.jsx';
import FilterLead from './FilterLead.jsx';
import FilterBubbles from './FilterBubbles.jsx';
import './Filters.css';
import FilterVulnerability from './FilterVulnerability.jsx';

function Filters({ filters, setFilters }) {
    return (
        <div className="filters-container fill-blue pad-t-5 pad-b-5 pad-x-5 flex-col">
            <div>
                <h2 className="mgn-b-4 text-white text-size-2 text-bold">
                    Visualize forecasts of environmental risks by adjusting the filters below.
                </h2>
            </div>
            <div className="filters flex-row">
                <FilterCountry filters={filters} setFilters={setFilters} />
                <FilterIndicator filters={filters} setFilters={setFilters} />
                <FilterLead filters={filters} setFilters={setFilters} />
                <FilterBubbles filters={filters} setFilters={setFilters} />
                <FilterVulnerability filters={filters} setFilters={setFilters} />
            </div>

            
        </div>
    );
}

export default Filters;
