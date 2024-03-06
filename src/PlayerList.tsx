import { TableContainer, Thead, Tr, Th, Table, Tbody, Td } from "@chakra-ui/react";

function PlayerList(props: { players: Array<{ uuid: number, name: string, score?: number }> }) {
  const players = props.players[0].score ? props.players.sort((a, b) => b.score - a.score) : props.players;
  return (
    <>
      <TableContainer>
        <Table variant="striped" >
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Name</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>

            {players?.map((player, index) => (
              <Tr key={player.uuid}>
                <Td>{player.score ? index + 1 : "-"}</Td>
                <Td>{player.name}</Td>
                <Td isNumeric>{player.score || "-"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PlayerList;
