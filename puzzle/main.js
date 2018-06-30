const Game = require("../src/Game/api.js");
const fs = require("fs");
const N = 10000;
console.log("Generating " + N + " files. . .");
for (var i = 0; i < N; i++) {
  g = new Game();
  fs.writeFile("./puzzle/" + g.id + ".robot", g, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}
console.log("Done");
