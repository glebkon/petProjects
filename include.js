import { localJson, res, numProp, fillList, ifMisclick } from "./main.js";
import * as num from "./includeNum.js";

export function keySelect(currDiv, key) {
  ifMisclick(key);
  if (numProp.includes(key.value)) {
    num.keySelect(currDiv);
  } else {
    currDiv.insertAdjacentHTML("beforeend", '<select id="value"></select>');
    let currentValue = currDiv.querySelector("#value");
    fillList(currentValue, [
      ...(function () {
        let set = new Set();
        for (let el of localJson.data) {
          set.add(el[key.value]);
        }
        return set;
      })(),
    ]);
    currentValue.onchange = () =>
      (document.querySelector("#btnAccept").hidden = false);
  }
}

export function formCondition(rule, key, value) {
  if (document.querySelector("#comparison")) {
    let currentCompVal = document.querySelectorAll(".comparisonValue");
    for (let input of currentCompVal) {
      errorHandler(input.value);
    }
    num.formCondition(rule, key, document.querySelector(".comparisonValue"));
  } else {
    let arr = localJson.condition[rule.value];
    let isNew = true;
    for (let el of arr) {
      if (el.hasOwnProperty(key.value)) {
        isNew = false;
        break;
      }
    }
    if (isNew) {
      let obj = {};
      obj[key.value] = value.value;
      arr.push(obj);
    }
  }
}

export function formResult() {
  let data = !res.data.length ? [...localJson.data] : res.data;
  let condition = localJson.condition.include;
  for (let i = 0; i < data.length; i++) {
    let flag = true;
    for (let cond of condition) {
      let key = Object.keys(cond)[0];
      if (numProp.includes(key)) {
        flag = num.formResult(data[i], cond, key);
      } else {
        if (data[i][key] !== cond[key]) {
          flag = false;
        }
      }
      if (!flag) break;
    }
    if (!flag) {
      data.splice(i, 1);
      i--;
    }
  }
  res.data = [...data];
}

function errorHandler(input) {
  if (input === "") throw new Error("Please fill in all fields");
  if (isNaN(+input))
    throw new Error(
      `Invalid data type: '${input}' \nInput supposed to be a number value`
    );
}
