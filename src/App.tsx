import "./App.css";
import data from "../data/data.json";
import PlayerList from "./PlayerList";
import Round from "./Round";

function App() {
  return (
    <>
      <div>
        <h1>jp tournament</h1>
        <PlayerList players={data.players} />
        {data.rounds.map((round, index) => (<Round key={index} round={round} />))}
      </div>
    </>
  );
}

export default App;
