
function PlayerList(props: { players: Array<{ uuid: number, name: string }> }) {
  return (
    <>
      <ul>
        {props.players?.map((player) => (
          <li key={player.uuid}>
            {player.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlayerList;
