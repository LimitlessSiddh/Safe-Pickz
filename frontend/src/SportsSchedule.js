import React from "react";
import "./SportsSchedule.css"; // If you want to add specific styles for this component

const SportsSchedule = ({ liveGames, upcomingGames }) => {
    return (
        <div className="sports-schedule">
            <h2>Upcoming Games</h2>
            <ul>
                {upcomingGames.length > 0 ? (
                    upcomingGames.map((game) => (
                        <li key={game.id} className="game-item">
                            <p>{game.team1} vs {game.team2}</p>
                            <p>{new Date(game.date).toLocaleString()}</p>
                        </li>
                    ))
                ) : (
                    <p>No upcoming games available.</p>
                )}
            </ul>

            <h2>Live Games</h2>
            <ul>
                {liveGames.length > 0 ? (
                    liveGames.map((game) => (
                        <li key={game.id} className="game-item live-game">
                            <p>{game.team1} vs {game.team2}</p>
                            <p>Score: {game.score1} - {game.score2}</p>
                        </li>
                    ))
                ) : (
                    <p>No live games currently.</p>
                )}
            </ul>
        </div>
    );
};

export default SportsSchedule;
