import { Box, Badge, UnorderedList, ListItem } from "@chakra-ui/react";

function Game(props: { pod: { winner: string, players: Array<{ uuid: number, name: string }> } }) {
  return (
    <Box>
      <UnorderedList>
        {props.pod.players?.map((player) => (
          <ListItem key={player.uuid}>
            {player.name + " "}
            {player.name === props.pod.winner && <Badge colorScheme="green">Winner</Badge>}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>);
}

export default Game;
