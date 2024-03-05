function Game(props: { pod: { winner: string, players: Array<{ uuid: number, name: string }> } }) {
  return (
    <div>
      <h1>Winner: {props.pod.winner}</h1>
      <ul>
        {props.pod.players?.map((player) => (
          <li key={player.uuid}>
            {player.name}
          </li>
        ))}
      </ul>
    </div>);
}

export default Game;
