import "./App.css";
import data from "../data/data.json";

function App() {
  return (
    <>
      <div>
        <h1>jp tournament</h1>
        {data.players?.map((player) => (
          <div key={player.uuid}>
            <h2>{player.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
