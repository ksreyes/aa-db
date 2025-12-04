import { useState } from 'react';
import './App.css'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import MapView from './components/MapView.jsx'
import LegendRaster from './components/LegendRaster.jsx'

function App() {

    const [filters, setFilters] = useState({
        country: 170,
        indicator: 1,
        lead: 1,
        idp: false,
        return: false,
        vulnerability: 1
    });

    return (
        <>
            <Header />
            <Filters 
                filters={filters} 
                setFilters={setFilters} 
            />
            <MapView filters={filters} />
            <LegendRaster filters={filters} title="Severity level" />
        </>
    )
}

export default App
