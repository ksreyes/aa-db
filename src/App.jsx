import { useState } from 'react';
import './App.css'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import MapView from './components/MapView.jsx'

function App() {

    const [filters, setFilters] = useState({
        country: 170,
        indicator: 1,
        lead: 1,
        idp: false,
        return: false
    });
    
    return (
        <>
            <Header />
            <Filters 
                filters={filters} 
                setFilters={setFilters} 
            />
            <MapView filters={filters} />
        </>
    )
}

export default App
