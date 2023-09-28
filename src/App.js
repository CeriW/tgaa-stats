import './App.css';
import { useState } from 'react';

const steamGameID = 1158850;
const apiKey = '9C744478D34930318FB5C67B3613E409';

const apiAddresses = {
  achievementNames: `https://corsproxy.io/?http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appid=${steamGameID}&l=english&format=json`,
  achievementPercentages: `https://corsproxy.io/?http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${steamGameID}&format=json`,
};

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// myThing();

const formatAchievements = async () => {
  const info = await fetchData(apiAddresses.achievementNames);
  const percentages = await fetchData(apiAddresses.achievementPercentages);

  const formattedData = info.game.availableGameStats.achievements.map((item, index) => {
    return { ...item, percent: percentages.achievementpercentages.achievements[index].percent };
  });

  return formattedData;
};

const dataList = await formatAchievements();

const AchievementList = ({ showHiddenAchievements }) => {
  console.log(showHiddenAchievements);

  return (
    <ul show-hidden-achievements={showHiddenAchievements.toString()}>
      {dataList.map((item, index) => (
        <AchievementCard key={index} achievement={item} />
      ))}
    </ul>
  );
};

const AchievementCard = ({ achievement }) => {
  const isHidden = (achievement.hidden > 0).toString();

  return (
    <div className="achievement-card" hidden-achievement={isHidden}>
      <div
        className="pie"
        style={{
          backgroundImage: `conic-gradient(var(--gold) 0%, var(--gold) ${achievement.percent}%, var(--blue) ${achievement.percent}%, var(--blue) 100%)`,
        }}
      >
        {Math.round(achievement.percent)}
        <div>%</div>
      </div>
      <img src={achievement.icon} width="75" alt="" />
      <div>
        <h3>{achievement.displayName}</h3>
        <div>{achievement.description}</div>
      </div>
    </div>
  );
};

function App() {
  const [showHiddenAchievements, toggleHiddenAchievements] = useState(false);

  const toggleHidden = () => {
    console.log(showHiddenAchievements);
    toggleHiddenAchievements(!showHiddenAchievements);
  };

  return (
    <div className="App">
      <header>
        <h1>THE GREAT ACE ATTORNEY CHRONICLES</h1>
        <h2>player achievements</h2>
      </header>
      <div className="toggle-menu">
        <label for="toggle-hidden">Show hidden achievements:</label>
        <input id="toggle-hidden" type="checkbox" onClick={toggleHidden}></input>
      </div>
      <AchievementList showHiddenAchievements={showHiddenAchievements} />
    </div>
  );
}

export default App;
