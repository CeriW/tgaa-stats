import './App.css';
import { useState, useEffect } from 'react';
import { getFormattedAchievements } from './data.js';
import ReactGA from 'react-ga';
ReactGA.initialize('G-2962N8TTQJ');

const dataList = await getFormattedAchievements();

const AchievementList = ({ showHiddenAchievements }) => {
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
        {achievement.percent.toFixed(1)}
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
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const [showHiddenAchievements, toggleHiddenAchievements] = useState(false);

  const toggleHidden = () => {
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
