import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setUserData(null);

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUserData(data.user); // Zapisujemy dane o nauczycielu
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Błąd połączenia z serwerem.');
        } finally {
            setIsLoading(false);
        }
    };

    // Widok po zalogowaniu
    if (userData) {
        return (
            <div className="login-container">
                <div className="login-box tutor-info">
                    <h2>Witaj, {userData.name} {userData.surname}!</h2>
                    <hr />
                    <div className="status-badge">
                        {userData.isTutor ? (
                            <div className="tutor-yes">
                                <p className="status-title">Status: Wychowawca</p>
                                <p className="class-name">Klasa: <strong>{userData.tutorClass}</strong></p>
                            </div>
                        ) : (
                            <div className="tutor-no">
                                <p className="status-title">Status: Nauczyciel</p>
                                <p>Nie jesteś przypisany jako wychowawca do żadnej klasy.</p>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setUserData(null)} className="login-button secondary">Wyloguj</button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h2>Synergia <span className="pro">Nauczyciel</span></h2>
                    <p>Zaloguj się do swojego panelu sterowania</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="login">Login / E-mail</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Wpisz login..."
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Weryfikacja...' : 'Zaloguj się'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Zapomniałeś hasła? Skontaktuj się z administratorem szkoły.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;