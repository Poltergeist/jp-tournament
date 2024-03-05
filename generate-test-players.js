// use unique names generator to generate a list of 64 unique names prefixed with 3 numbers and a dash
// then write this list to a file called players.json seperated by new lines
import fs from "fs";
import { uniqueNamesGenerator, names, NumberDictionary } from "unique-names-generator";

const players = new Array(64).fill("").map(() => uniqueNamesGenerator({ dictionaries: [NumberDictionary.generate({ min: 100, max: 999 }), names], length: 2, separator: "_", style: "capital" }));

fs.writeFile("./players.md", players.join("\n"), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File has been created");
});
