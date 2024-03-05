import fs from "fs";
import { v4 as uuid } from "uuid";

const data = {};

fs.readFile("./players.md", "utf8", (err, playerString) => {
  if (err) {
    console.error(err);
    return;
  }
  // split players by line and add to array as an object with an uuid and a name
  const players = playerString
    .split("\n")
    .filter((x) => x !== "")
    .map((name) => ({ uuid: uuid(), name }));
  data.players = players;
  fs.writeFile("./data/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created", data);
  });
});
