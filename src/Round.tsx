import { SimpleGrid } from '@chakra-ui/react';
import Game from './Game';

function Round(props: { round: { games: Array<{ winner: string | null, players: Array<{ uuid: string, name: string, seat: number }> }> } }) {
  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={10}>
      {props.round.games.map((game, index) => (
        <Game key={index} pod={game} />
      ))}
    </SimpleGrid>
  );
}

export default Round;
