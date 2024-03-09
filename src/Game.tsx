import { Box, Badge, UnorderedList, ListItem } from "@chakra-ui/react";

function Game(props: { pod: { winner: string | null, players: Array<{ uuid: string, seat: number, name: string }> } }) {
  return (
    <Box>
      <UnorderedList>
        {props.pod.players?.sort((a, b) => a.seat < b.seat ? -1 : 1).map((player) => (
          <ListItem key={player.uuid}>
            {player.seat + ". "}
            {player.name + " "}
            {player.name === props.pod.winner && <Badge colorScheme="green">Winner</Badge>}
            {props.pod.winner === "draw" && <Badge colorScheme="yellow">draw</Badge>}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>);
}

export default Game;
