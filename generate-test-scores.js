import fs from "fs";
// Read data/data.json and set the winner on the round winner in the games array
fs.readFile("./data/data.json", "utf8", (err, json) => {
  if (err) {
    console.log(err);
    return;
  }
  const data = JSON.parse(json);

  data.rounds[data.rounds.length - 1].games.map((game) => {
    game.winner = [...game.players].sort((a, b) => 
      b.name > a.name ? 1 : -1, 
    )[0].name;
    return game;
  });

  fs.writeFile("./data/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
  });
});
