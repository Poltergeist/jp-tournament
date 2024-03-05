// This is a cli tool which will add a new round to the data with new player pairings and seats in a 4 player game. The players are read from the data.json file and the new round is added to the rounds array. The new data is then written back to the data.json file.
import fs from "fs";
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

fs.readFile("./data/data.json", "utf8", (err, dataString) => {
  if (err) {
    console.error(err);
    return;
  }
  const data = JSON.parse(dataString);
  const players = shuffle(data.players);
  if (data.rounds == null) {
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
    data.rounds = [round];
  } else {
    // make a list with player names as keys and an array of player names they already played with as value
    const playerWasAlreadyPairedWith = data.rounds.reduce((acc, round) => {
      round.games.forEach((game) => {
        game.players.forEach((player) => {
          if (acc[player.name] == null) {
            acc[player.name] = [];
          }
          game.players.forEach((otherPlayer) => {
            if (player.name !== otherPlayer.name) {
              acc[player.name].push(otherPlayer.name);
            }
          });
        });
      });
      return acc;
    }, {});
    //make a list of players with with a list of seats they already played on
    const playerWasAlreadyOnSeat = data.rounds.reduce((acc, round) => {
      round.games.forEach((game) => {
        game.players.forEach((player) => {
          if (acc[player.name] == null) {
            acc[player.name] = [];
          }
          acc[player.name].push(player.seat);
        });
      });
      return acc;
    }, {});
    const players = shuffle(data.players);
    const playersAlreadySeated = [];
    const games = new Array(Math.ceil(players.length / 4)).fill({}).map(() => {
      //starting player should be the first player who has not played on seat 1 yet
      const startingPlayer =
        players.find(
          (player) =>
            !playerWasAlreadyOnSeat[player.name]?.includes(1) &&
            !playersAlreadySeated.includes(player.name),
        ) ||
        players.find((player) => !playersAlreadySeated.includes(player.name));
      playersAlreadySeated.push(startingPlayer.name);
      // a find opponent function that tries to find the first player who has not played with a list of players yet and was not on a specific seat yet
      // in case no such player exists the first player who has not played on the seat yet is returned.
      const findOpponent = (players, list, seat) => {
        const opponent = players.find(
          (player) =>
            !playersAlreadySeated.includes(player.name) &&
            !list.includes(player.name) &&
            !playerWasAlreadyOnSeat[player.name]?.includes(seat),
        );
        if (opponent) {
          playersAlreadySeated.push(opponent.name);
          return opponent;
        }
        const alternativeOpponent = players.find(
          (player) =>
            !playerWasAlreadyOnSeat[player.name]?.includes(seat) &&
            !playersAlreadySeated.includes(player.name),
        );
        if (alternativeOpponent) {
          playersAlreadySeated.push(alternativeOpponent.name);
          return alternativeOpponent;
        }
        const lastResortOpponent = players.find(
          (player) => !playersAlreadySeated.includes(player.name),
        );
        playersAlreadySeated.push(lastResortOpponent.name);
        return lastResortOpponent;
      };
      const returnVal = {
        winner: null,
        players: new Array(3).fill({}).reduce(
          (acc, _, index) => {
            acc = [
              ...acc,
              {
                ...findOpponent(
                  players,
                  [
                    ...acc.map(
                      (player) => playerWasAlreadyPairedWith[player.name],
                    ),
                  ],
                  index + 2,
                ),
                seat: index + 2,
              },
            ];
            return acc;
          },
          [{ ...startingPlayer, seat: 1 }],
        ),
      };
      return returnVal;
    });

    const round = {
      id: data.rounds?.length + 1 || 1,

      games,
    };
    data.rounds.push(round);
  }
  fs.writeFile("./data/data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Round has been added", data);
  });
});
