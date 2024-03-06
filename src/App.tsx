import data from "../data/data.json";
import PlayerList from "./PlayerList";
import Round from "./Round";

import { Heading, Box, Tabs, TabList, TabPanel, Tab, TabPanels } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Box p={4}>
        <Heading>jp tournament</Heading>
        <Tabs>
          <TabList>
            <Tab>Player List</Tab>
            {data.rounds.map((_, index) => (<Tab key={index}>Round {index + 1}</Tab>))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <PlayerList players={data.players} />
            </TabPanel>
            {data.rounds.map((round, index) => (<TabPanel key={index}><Round round={round} /></TabPanel>))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default App;
