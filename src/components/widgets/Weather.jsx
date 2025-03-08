import { useState, useEffect } from "react";
import "../../styles/widgets/Weather.css";

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState(() => {
        return localStorage.getItem('weatherCity') || "São Paulo";
    });
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                // Usando a API OpenWeatherMap (você precisará criar uma conta gratuita para obter uma API key)
                const apiKey = "sua_api_key_aqui"; // Substitua pela sua API key
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
                );
                
                if (!response.ok) {
                    throw new Error("Não foi possível obter os dados do clima");
                }
                
                const data = await response.json();
                setWeatherData(data);
                localStorage.setItem('weatherCity', city);
                setError(null);
            } catch (err) {
                setError("Erro ao carregar dados do clima. Tente novamente mais tarde.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
        
        // Atualizar a cada 30 minutos
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        
        return () => clearInterval(interval);
    }, [city]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setCity(searchInput);
            setSearchInput("");
            setShowSearch(false);
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        if (!showSearch) {
            setTimeout(() => document.getElementById("weather-search-input")?.focus(), 100);
        }
    };

    // Função para obter o ícone do clima
    const getWeatherIcon = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="weather-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <span className="material-symbols-outlined">cloud</span>
                    Clima
                </div>
                <span 
                    className="material-symbols-outlined search-icon" 
                    onClick={toggleSearch}
                    title="Buscar cidade"
                >
                    search
                </span>
            </div>
            
            <div className="widget-content">
                {showSearch && (
                    <form className="weather-search-form" onSubmit={handleSearchSubmit}>
                        <input
                            id="weather-search-input"
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Digite o nome da cidade"
                        />
                        <button type="submit">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </form>
                )}
                
                {loading ? (
                    <div className="weather-loading">Carregando...</div>
                ) : error ? (
                    <div className="weather-error">{error}</div>
                ) : weatherData ? (
                    <div className="weather-info">
                        <div className="weather-location">
                            <h3>{weatherData.name}, {weatherData.sys.country}</h3>
                        </div>
                        
                        <div className="weather-main">
                            <img 
                                src={getWeatherIcon(weatherData.weather[0].icon)} 
                                alt={weatherData.weather[0].description}
                                className="weather-icon"
                            />
                            <div className="weather-temp">
                                {Math.round(weatherData.main.temp)}°C
                            </div>
                        </div>
                        
                        <div className="weather-description">
                            {weatherData.weather[0].description}
                        </div>
                        
                        <div className="weather-details">
                            <div className="weather-detail">
                                <span className="material-symbols-outlined">water_drop</span>
                                <span>{weatherData.main.humidity}%</span>
                            </div>
                            <div className="weather-detail">
                                <span className="material-symbols-outlined">air</span>
                                <span>{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                            </div>
                            <div className="weather-detail">
                                <span className="material-symbols-outlined">compress</span>
                                <span>{weatherData.main.pressure} hPa</span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Weather; 