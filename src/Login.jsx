import { useState, useRef, useEffect } from 'react';
import App from './App';
import './Login.css'

const PASSWORD = 'iomint';

export default function ProtectedApp() {
    const [authenticated, setAuthenticated] = useState(false);
    const [input, setInput] = useState("");

    // Focus on textbox input by default
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Use Enter to press button
    function handleKeyDown(event) {
        if (event.key === 'Enter' && input === PASSWORD) {
            setAuthenticated(true);
        } else if (event.key === 'Escape') {
            setInput('');
        }
    }

    if (!authenticated) {
        return (
            <div className="login-overlay">
                <div className="login-box">
                    <h2 className="login-title">Log in</h2>
                    <input
                        className="login-input"
                        type="password"
                        value={input}
                        ref={inputRef}
                        yplaceholder="Enter password"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        className="login-button"
                        onClick={() => input === PASSWORD && setAuthenticated(true)}
                    >
                        Login
                    </button>
                    <p className="login-text">
                        Contact kereyes@iom.int for access.
                    </p>
                </div>
            </div>
        );
    }

    return <App />;
}
