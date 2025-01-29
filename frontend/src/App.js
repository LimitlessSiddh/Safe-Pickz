import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SportsSchedule from "./SportsSchedule"; // Import the new SportsSchedule component

function App() {
    const [input, setInput] = useState(""); // For user input
    const [results, setResults] = useState(""); // For displaying results
    const [upcomingGames, setUpcomingGames] = useState([]);
    const [liveGames, setLiveGames] = useState([]);

    // API credentials
    const apiKey = "5b0e3d947emshcb885ce237a24f3p1a647ajsn0cedbf51183a";
    const apiHost = "api-nba-v1.p.rapidapi.com";

    useEffect(() => {
        // Fetch live games using Axios
        const fetchLiveGames = async () => {
            try {
                const response = await axios.get("https://api-nba-v1.p.rapidapi.com/games", {
                    headers: {
                        "x-rapidapi-key": apiKey,
                        "x-rapidapi-host": apiHost
                    }
                });
                setLiveGames(response.data.response || []);
            } catch (error) {
                console.error("Error fetching live games:", error);
            }
        };

        fetchLiveGames();
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








