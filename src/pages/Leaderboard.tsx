import { useEffect, useState } from 'react';
import '../styles/pages/Leaderboard.css';

interface Player {
  name: string;
  uuid?: string;
  playtime: number;
  balance: number;
  votes: number;
  kills: number;
  mobKills: number;
  deaths: number;
}

interface Season1Data {
  season: number;
  generatedAt: string;
  players: Array<{
    name: string;
    uuid: string;
    playtime: number;
    balance: number;
    votes: number;
    kills: number;
    mobKills: number;
    deaths: number;
  }>;
}

type Season = 1 | 2;
type LeaderboardCategory = 'playtime' | 'balance' | 'votes' | 'kills' | 'mobKills' | 'deaths';

// Categories available per season
const SEASON_CATEGORIES: Record<Season, LeaderboardCategory[]> = {
  1: ['playtime', 'balance', 'votes', 'kills', 'mobKills', 'deaths'],
  2: ['playtime', 'balance', 'votes', 'kills', 'mobKills', 'deaths']
};

// Helper to format milliseconds into readable "1,234h"
const formatTime = (ms: number) => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${hours.toLocaleString()}h`;
};

// Helper to format balance with currency symbol
const formatBalance = (balance: number) => {
  return `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper to try multiple field paths for a value
const tryGetValue = (obj: any, ...paths: string[]): number => {
  for (const path of paths) {
    const parts = path.split('.');
    let value = obj;
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) break;
    }
    if (value !== undefined && value !== null) {
      const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
      if (!isNaN(num)) return num;
    }
  }
  return 0;
};

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSeason, setActiveSeason] = useState<Season>(2);
  const [activeCategory, setActiveCategory] = useState<LeaderboardCategory>('playtime');

  // Fetch data based on selected season
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        if (activeSeason === 1) {
          // Fetch Season 1 static JSON
          const response = await fetch('/resources/seasonal-db/season1-data.json');
          if (!response.ok) {
            throw new Error(`Failed to load Season 1 data`);
          }
          const data: Season1Data = await response.json();

          const processedPlayers: Player[] = data.players.map(p => ({
            name: p.name,
            uuid: p.uuid,
            playtime: p.playtime,
            balance: p.balance || 0,
            votes: p.votes || 0,
            kills: p.kills || 0,
            mobKills: p.mobKills,
            deaths: p.deaths
          }));

          setPlayers(processedPlayers);
        } else {
          // Fetch Season 2 from PLAN API
          const response = await fetch('/api/stats', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const json = await response.json();
          const rawList = json.data || [];

          const processedPlayers: Player[] = rawList.map((p: any) => {
            const name = p.name.replace(/<[^>]*>?/gm, '');
            const playtime = tryGetValue(p, 'activePlaytime.v', 'playtime.v', 'playtime', 'activePlaytime');
            const balance = parseFloat(p.balance?.v || p.balance || '0') || 0;
            const votes = tryGetValue(p, 'votes.v', 'votes');

            return {
              name,
              playtime,
              balance,
              votes,
              kills: 0,
              mobKills: 0,
              deaths: 0
            };
          });

          setPlayers(processedPlayers);
        }
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError(`Could not load leaderboard data. ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeSeason]);

  // Reset category if not available for current season
  useEffect(() => {
    if (!SEASON_CATEGORIES[activeSeason].includes(activeCategory)) {
      setActiveCategory('playtime');
    }
  }, [activeSeason, activeCategory]);

  const handleSeasonChange = (season: Season) => {
    setActiveSeason(season);
  };

  const getSortedPlayers = () => {
    const sorted = [...players].sort((a, b) => {
      switch (activeCategory) {
        case 'playtime': return b.playtime - a.playtime;
        case 'balance': return b.balance - a.balance;
        case 'votes': return b.votes - a.votes;
        case 'kills': return b.kills - a.kills;
        case 'mobKills': return b.mobKills - a.mobKills;
        case 'deaths': return b.deaths - a.deaths;
        default: return 0;
      }
    });
    return sorted.slice(0, 10);
  };

  const sortedPlayers = getSortedPlayers();

  const getDisplayValue = (player: Player) => {
    switch (activeCategory) {
      case 'playtime': return formatTime(player.playtime);
      case 'balance': return formatBalance(player.balance);
      case 'votes': return player.votes.toLocaleString();
      case 'kills': return player.kills.toLocaleString();
      case 'mobKills': return player.mobKills.toLocaleString();
      case 'deaths': return player.deaths.toLocaleString();
      default: return '';
    }
  };

  const getColumnHeader = () => {
    switch (activeCategory) {
      case 'playtime': return 'Hours';
      case 'balance': return 'Money';
      case 'votes': return 'Votes';
      case 'kills': return 'Player Kills';
      case 'mobKills': return 'Mob Kills';
      case 'deaths': return 'Deaths';
      default: return '';
    }
  };

  const availableCategories = SEASON_CATEGORIES[activeSeason];
  const isComingSoon = activeSeason === 2 && (activeCategory === 'kills' || activeCategory === 'mobKills' || activeCategory === 'deaths');

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboards</h1>

      {/* Season Selector */}
      <div className="season-selector">
        <button
          className={`season-btn ${activeSeason === 1 ? 'active' : ''}`}
          onClick={() => handleSeasonChange(1)}
        >
          Season 1
          <span className="season-badge archived">Archived</span>
        </button>
        <button
          className={`season-btn ${activeSeason === 2 ? 'active' : ''}`}
          onClick={() => handleSeasonChange(2)}
        >
          Season 2
          <span className="season-badge current">Current</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="leaderboard-tabs">
        <button
          className={`tab-button ${activeCategory === 'playtime' ? 'active' : ''}`}
          onClick={() => setActiveCategory('playtime')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </svg>
          Playtime
        </button>

        {availableCategories.includes('balance') && (
          <button
            className={`tab-button ${activeCategory === 'balance' ? 'active' : ''}`}
            onClick={() => setActiveCategory('balance')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
            </svg>
            Money
          </button>
        )}

        {availableCategories.includes('votes') && (
          <button
            className={`tab-button ${activeCategory === 'votes' ? 'active' : ''}`}
            onClick={() => setActiveCategory('votes')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44Z" />
            </svg>
            Votes
          </button>
        )}

        {availableCategories.includes('kills') && (
          <button
            className={`tab-button ${activeCategory === 'kills' ? 'active' : ''}`}
            onClick={() => setActiveCategory('kills')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.92,5H5L14,14L15,13.06M19.96,19.12L19.12,19.96C18.73,20.35 18.1,20.35 17.71,19.96L14.59,16.84L11.91,19.5L10.5,18.09L11.92,16.67L3,7.75V3H7.75L16.67,11.92L18.09,10.5L19.5,11.91L16.83,14.58L19.95,17.7C20.35,18.1 20.35,18.73 19.96,19.12Z" />
            </svg>
            Kills
          </button>
        )}

        <button
          className={`tab-button ${activeCategory === 'mobKills' ? 'active' : ''}`}
          onClick={() => setActiveCategory('mobKills')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11Z" />
          </svg>
          Mob Kills
        </button>

        <button
          className={`tab-button ${activeCategory === 'deaths' ? 'active' : ''}`}
          onClick={() => setActiveCategory('deaths')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z" />
          </svg>
          Deaths
        </button>
      </div>

      <div className="leaderboard-card">
        {loading ? (
          <div className="status-message">Loading player stats...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : isComingSoon ? (
          <div className="coming-soon-message">
            <svg viewBox="0 0 24 24" fill="currentColor" className="coming-soon-icon">
              <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
            </svg>
            <h3>Coming Soon</h3>
            <p>This leaderboard category is under development for Season 2.</p>
          </div>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="rank-col">#</th>
                <th>Player</th>
                <th className="value-col">{getColumnHeader()}</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr key={`${activeSeason}-${activeCategory}-${player.name}`}>
                  <td className="rank-col">{index + 1}</td>
                  <td>
                    <div className="player-cell">
                      <img
                        src={`https://mc-heads.net/avatar/${player.name}/32`}
                        alt={player.name}
                        className="player-head"
                        loading="lazy"
                      />
                      <span className="player-name">{player.name}</span>
                    </div>
                  </td>
                  <td className="value-col">{getDisplayValue(player)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;