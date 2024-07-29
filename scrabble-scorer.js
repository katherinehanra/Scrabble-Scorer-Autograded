// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question("Let's play some Scrabble! Enter a word: ");
  return word;
}

let newPointStructure;

let simpleScorer = function (word) {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score++;
  }
  return score;
};

let vowelBonusScorer = function (word) {
  let score = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScorer;

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: oldScrabbleScorer,
  },
];

function scorerPrompt(word) {
  let scorerSelection = input.question(
    "Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "
  );
  if (scorerSelection === "0") {
    console.log(
      `Score for '${word}:`,
      scoringAlgorithms[0].scorerFunction(word)
    );
  } else if (scorerSelection === "1") {
    console.log(
      `Score for '${word}:`,
      scoringAlgorithms[1].scorerFunction(word)
    );
  } else if (scorerSelection === "2") {
    console.log(
      `Score for '${word}:`,
      scoringAlgorithms[2].scorerFunction(word)
    );
  } else {
    console.log("\nInvalid Selection.");
    console.log(scorerPrompt(word));
  }

  return scorerSelection;
}

function transform() {}

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
