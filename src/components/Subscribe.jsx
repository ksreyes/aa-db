import { useState } from 'react';
import SubscribeIndicator from './SubscribeIndicator.jsx';
import SubscribeLead from './SubscribeLead.jsx';
import SubscribeCountry from './SubscribeCountry.jsx';
import SubscribeSeverity from './SubscribeSeverity.jsx';
import SubscribeVulnerability from './SubscribeVulnerability.jsx';
import './Subscribe.css'

export default function Subscribe({ isOpen, onClose }) {

    const [subFilters, setSubFilters] = useState({
        country: 170,
        indicator: 1,
        lead: 1,
        vulnerability: 1
    });

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={onClose}>
        <div className="modal subscribe" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={onClose}>×</button>

            <h2 className="subscribe-title">Subscribe to receive alerts</h2>
            <form>
                <SubscribeIndicator 
                    subFilters={subFilters} 
                    setSubFilters={setSubFilters} 
                />
                <SubscribeLead 
                    subFilters={subFilters} 
                    setSubFilters={setSubFilters} 
                />
                <SubscribeCountry 
                    subFilters={subFilters} 
                    setSubFilters={setSubFilters} 
                />
                <SubscribeSeverity 
                    subFilters={subFilters}
                />
                <SubscribeVulnerability 
                    subFilters={subFilters}
                    setSubFilters={setSubFilters} 
                />
                <div className="email-field">
                    <input type="email" placeholder="Email address" required />
                    <button type="submit">Subscribe</button>
                </div>
            </form>
        </div>
        </div>
    );
}
