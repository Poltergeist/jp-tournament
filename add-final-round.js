import fs from "fs";
fs.readFile("./data/data.json", "utf8", (err, dataString) => {
  if (err) {
    console.error(err);
    return;
  }
  const data = JSON.parse(dataString);
  const players = data.players.sort((a, b) => a.score < b.score ? 1 : -1);
  const round = {
    id: data.rounds?.length + 1 || 1,

    games: new Array(Math.ceil(players.length / 4))
      .fill({})
      .map((_, tableIndex) => ({
        winner: null,
        players: players
          .slice(tableIndex * 4, tableIndex * 4 + 4)
          .map((player, index) => ({
            ...player,
            seat: index + 1,
          })),
      })),
  };
  data.rounds.push(round);
  fs.writeFile("./data/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Round has been added", data);
  });
});
