import { useState } from 'react';
import './App.css'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import MapView from './components/MapView.jsx'
import LegendRaster from './components/LegendRaster.jsx'
import Subscribe from "./components/Subscribe.jsx";

function App() {

    const [isOpen, setIsOpen] = useState(false);

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
            <Header setIsOpen={setIsOpen}/>
            <Filters 
                filters={filters} 
                setFilters={setFilters} 
            />
            <MapView filters={filters} />
            <LegendRaster filters={filters} title="Severity level" />

            <Subscribe
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}

export default App
