import Game from './Game';

function Round(props: { round: { games: Array<{ winner: string, players: Array<{ uuid: number, name: string }> }> } }) {
  return (
    <div>
      <h1>Round</h1>
      <ul>
        {props.round.games.map((game, index) => (
          <Game key={index} pod={game} />
        ))}
      </ul>
    </div>
  );
}

export default Round;
