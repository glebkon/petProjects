import { localJson, fillList, ifMisclick } from "./main.js";

let compCase;

export function keySelect(currentDiv) {
  currentDiv.insertAdjacentHTML(
    "beforeend",
    '<select id="comparison"></select>'
  );
  let currentComparison = document.querySelector("#comparison");
  fillList(currentComparison, [
    "equal to (=)",
    "greater than (>)",
    "lesser than (<)",
    "in between",
  ]);
  currentComparison.addEventListener("change", () => {
    ifMisclick(currentComparison);
    compCase = currentComparison.selectedIndex;
    let input = '<input class = "comparisonValue">';
    if (currentComparison.selectedIndex === 4) {
      input += ' <input class = "comparisonValue">';
    }
    currentDiv.insertAdjacentHTML("beforeend", input);
    document.querySelector("#btnAccept").hidden = false;
  });
}

export function formCondition(rule, key, comparisonValue) {
  let index = localJson.condition[rule.value].indexOf(
    localJson.condition[rule.value].find((el) => el.hasOwnProperty(key.value))
  );
  let obj = index === -1 ? {} : localJson.condition[rule.value][index];
  switch (
    compCase
  ) {
    case 1: // equal to
      obj[key.value] = comparisonValue.value;
      break;
    case 2: // greater than
      obj[key.value] = [comparisonValue.value, "-1"];
      break;
    case 3: // lesser than
      obj[key.value] = ["-1", comparisonValue.value];
      break;
    case 4: // in between
      obj[key.value] = [
        comparisonValue.value,
        comparisonValue.nextElementSibling.value,
      ];
      break;
  }
  if (index === -1) localJson.condition[rule.value].push(obj);
}

export function formResult(data, cond, key) {
  let flag = true;
  switch (compCase) {
    case 1: // equal to
      if (data[key] !== cond[key]) flag = false;
      break;
    case 2: // greater than
      if (+data[key] <= +cond[key][0]) flag = false;
      break;
    case 3: // lesser than
      if (+data[key] >= +cond[key][1]) flag = false;
      break;
    case 4: // in between
      if (+data[key] <= +cond[key][0] || +data[key] >= +cond[key][1])
        flag = false;
      break;
  }
  return flag;
}
