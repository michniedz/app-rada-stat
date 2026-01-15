import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
    // Funkcja pomocnicza do pobierania inicjałów
    const getInitials = (name, surname) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <div className="user-avatar">{getInitials(user.name, user.surname)}</div>
                    <div className="user-info-text">
                        <span className="user-name">{user.name} {user.surname}</span>
                        <span className="user-role">{user.isTutor ? `Wychowawca klasy ${user.tutorClass}` : 'Nauczyciel'}</span>
                    </div>
                </div>
                <button onClick={onLogout} className="logout-button-small">Wyloguj</button>
            </nav>

            <main className="dashboard-content">
                <header className="welcome-header">
                    <h1>Dzień dobry, prof. {user.surname}</h1>
                    <p>Oto podsumowanie statystyk dla Twojej rady pedagogicznej.</p>
                </header>

                <div className="stats-grid">
                    {/* Kafelki statystyk */}
                    <div className="stat-card">
                        <h3>Moja Klasa</h3>
                        <div className="stat-value">{user.tutorClass || 'Brak'}</div>
                        <p>Kliknij, aby zobaczyć listę uczniów</p>
                    </div>

                    <div className="stat-card highlight">
                        <h3>Średnia Ocen</h3>
                        <div className="stat-value">4.12</div>
                        <p>Średnia Twoich oddziałów</p>
                    </div>

                    <div className="stat-card warning">
                        <h3>Frekwencja</h3>
                        <div className="stat-value">92%</div>
                        <p>Ostatnie 7 dni</p>
                    </div>

                    <div className="stat-card info">
                        <h3>Zastępstwa</h3>
                        <div className="stat-value">2</div>
                        <p>Zaplanowane na dziś</p>
                    </div>
                </div>

                <div className="stats-grid">
                    {user.classes && user.classes.length > 0 ? (
                        user.classes.map((cls, index) => (
                            <div key={index} className="stat-card">
                                <h3>Klasa {cls.name}</h3>
                                <div className="stat-value">--</div>
                                <p>Przedmiot: {cls.subject || 'Wiele'}</p>
                                <button className="analyze-button">Generuj statystyki</button>
                            </div>
                        ))
                    ) : (
                        <div className="stat-card">
                            <h3>Brak danych</h3>
                            <p>Nie odnaleziono przypisanych klas w systemie Librus.</p>
                        </div>
                    )}
                </div>

                <section className="recent-activity">
                    <h2>Ostatnie zadania</h2>
                    <div className="activity-list">
                        <div className="activity-item">✓ Wpisano oceny z matematyki - klasa 2A</div>
                        <div className="activity-item">✓ Zatwierdzono frekwencję - klasa 3B</div>
                        <div className="activity-item">! Brak wpisu w dzienniku - lekcja 4 (1C)</div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;