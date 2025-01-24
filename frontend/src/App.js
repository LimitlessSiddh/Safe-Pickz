import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SportsSchedule from "./SportsSchedule"; // Import the new SportsSchedule component

function App() {
    const [input, setInput] = useState(""); // For user input
    const [results, setResults] = useState(""); // For displaying results
    const [upcomingGames, setUpcomingGames] = useState([]);
    const [liveGames, setLiveGames] = useState([]);

    // API endpoint and key
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const apiUrl = "https://api.sportsdata.io/v3/soccer/scores/json/GamesLive"; // Example URL

    useEffect(() => {
        // Fetch live games
        axios
            .get(`${apiUrl}?key=${apiKey}`)
            .then((response) => {
                setLiveGames(response.data);
            })
            .catch((error) => console.error("Error fetching live games:", error));

        // Fetch upcoming games (You can update the URL as needed for your API)
        axios
            .get(`https://api.sportsdata.io/v3/soccer/scores/json/GamesBySeason/2025?key=${apiKey}`)
            .then((response) => {
                setUpcomingGames(response.data);
            })
            .catch((error) => console.error("Error fetching upcoming games:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock response for now
        setResults(`Fetching recommendations for: "${input}"`);
        setInput("");
    };

    return (
        <div className="App">
            <header className="header">
                <h1 className="logo">Pick Pocket</h1>
            </header>
            <main className="main">
                <form onSubmit={handleSubmit} className="form">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your bet specifications (e.g., 'Safe bets for tonight's NBA games')"
                        rows="5"
                        className="input-box"
                    />
                    <button type="submit" className="submit-button">
                        Generate Safe Bets
                    </button>
                </form>

                {/* Displaying Results */}
                <div className="results">
                    {results && (
                        <div className="results-box">
                            <h3>Recommendations:</h3>
                            <p>{results}</p>
                        </div>
                    )}
                </div>

                {/* Sports Schedule Section */}
                <SportsSchedule liveGames={liveGames} upcomingGames={upcomingGames} />
            </main>
        </div>
    );
}

export default App;




