import logo from './logo.svg';
import './App.css';

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

  console.log(percentages);

  const formattedData = info.game.availableGameStats.achievements.map((item, index) => {
    return { ...item, percent: percentages.achievementpercentages.achievements[index].percent };
  });

  console.log(formattedData);
  return formattedData;
};

const dataList = await formatAchievements();

const AchievementList = () => {
  console.log(dataList);

  return (
    <ul>
      {/* {dataList.game.availableGameStats.achievements.forEach((item, index) => {
        return <AchievementCard key={index} achievement={item} />;
      })} */}

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
      <img src={achievement.icon} width="100" alt="" />
      <h3>{achievement.displayName}</h3>
      <div>{achievement.description}</div>
      <div className="percentage">{achievement.percent}%</div>
      {/* {JSON.stringify(achievement)} */}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AchievementList />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
