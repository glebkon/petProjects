export let map = new Map([
  [
    1,
    {
      q: "What is your marital status?",
      answ1: ["single", 2],
      answ2: ["married", 3],
    },
  ],
  [
    2,
    {
      q: "Are you planning on getting married next year?",
      answ1: ["yes", -1],
      answ2: ["no", 5],
    },
  ],
  [
    3,
    {
      q: "How long have you been married?",
      answ1: ["less than a year", -1],
      answ2: ["more than a year", 4],
    },
  ],
  [
    4,
    {
      q: "Have you celebrated your one year anniversary?",
      answ1: ["yes", -1],
      answ2: ["no", -1],
    },
  ],
  [
    5,
    {
      q: "Are you dating someone?",
      answ1: ["yes", 7],
      answ2: ["no", 6],
    },
  ],
  [
    6,
    {
      q: "When was the last time you were in a relationship?",
      answ1: ["more than a year ago", -1],
      answ2: ["less than a year ago", -1],
    },
  ],
  [
    7,
    {
      q: "How long have you been in a relationship?",
      answ1: ["more than a year", -1],
      answ2: ["less than a year", -1],
    },
  ],
  [-1, "finish"],
]);

let outputJson = { paths: { number: 0, list: [] } };

import {formJson} from "./allPaths.js";
let autoJson = formJson(); // an object that is the result of the test script, with information about
// the number of all possible polling paths (paths.number), 
// and all possible sequences of questions with answers (paths.list)
// console.log(JSON.stringify(autoJson, null, "\t"));

do {
  let obj = map.get(1);
  let question = `${obj.q} \n 1-${obj.answ1[0]} \n 2-${obj.answ2[0]}`;
  let answer = +prompt(question);
  let arr = [];
  while (true) {
    let tmp = {};
    if (answer === 1 || answer === 2) {
      let currChoice = answer === 1 ? obj.answ1 : obj.answ2;
      tmp[obj.q] = currChoice[0];
      obj = map.get(currChoice[1]);
    } else break;
    arr.push(tmp);
    if (obj === "finish") break;
    question = `${obj.q} \n 1-${obj.answ1[0]} \n 2-${obj.answ2[0]}`;
    answer = +prompt(question);
  }
  if (arr.length) {
    outputJson.paths.number++;
    outputJson.paths.list.push(arr);
    if (confirm("Again?") !== true) break;
  } else break;
} while (true);

if (outputJson.paths.list.length)
  console.log(JSON.stringify(outputJson, null, "\t"));
