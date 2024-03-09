// load data.json file and parse json data
// then set the score of each player in the player array to 1000
// then check each game in each round for the winner and adjust the score of each player,
// loser will loose 7% of their current score and winner will gain all the lost points from the loser
// then write the new data to data.json file
import fs from "fs";

fs.readFile("./data/data.json", "utf8", (err, json) => {
  if (err) {
    console.log(err);
    return;
  }

  const data = JSON.parse(json);
  data.players = data.players.map((player) => ({ ...player, score: 1000, wins: 0, losses: 0, draw: 0 }))

  data.rounds.map((round) => {
    round.games.map((game) => {
      const winner = game.winner;
      const losers = game.players.filter((player) => player.name !== winner).map(player => player.name);
      let winnerScore = 0
      let winnerIndex = 0
      data.players = data.players.map((player, index) => {
        if (losers.includes(player.name)) {
          const loss = Math.round(player.score * 0.07);
          winnerScore += loss;
          if (winner === "draw") {
            return { ...player, score: player.score - loss, draw: player.draw + 1 }
          }
          return { ...player, score: player.score - loss, losses: player.losses + 1 }
        }
        if (player.name === winner) {
          winnerIndex = index
        }
        return player;
      });
      if (winner !== "draw") {
        data.players[winnerIndex].score += winnerScore;
        data.players[winnerIndex].wins += 1
      }
    });
  });

  fs.writeFile("./data/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Scores calculated");
  });
}); 
