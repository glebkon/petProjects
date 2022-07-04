import * as include from "./include.js";
import * as sortBy from "./sortBy.js";
import * as exclude from "./exclude.js";
import { json } from "./input.js";

const localJsonName = "input";
if (!localStorage.getItem(localJsonName)) {
  localStorage.setItem(localJsonName, JSON.stringify(json));
}
export let localJson = JSON.parse(localStorage.getItem(localJsonName));
export const res = { data: [] };
export let numProp = (() => {
  let arr = [];
  for (let key of Object.keys(localJson.data[0])) {
    if (!isNaN(+localJson.data[0][key])) {
      arr.push(key);
    }
  }
  return arr;
})();

const rules = ["include", "sort_by", "exclude" /*...*/];
let formCondition;
let formResult;

document.querySelector("#btnAddNewRule").addEventListener("click", addNewRule);
document.querySelector("#btnAccept").addEventListener("click", form);
document.querySelector("#btnGetResult").addEventListener("click", getResult);
document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  let div = document.createElement("div");
  div.id = "main";
  div.innerHTML = `<select id="rule"></select>`;
  div.style.display = "none";
  btnAddNewRule.before(div);

  fillList(document.body.querySelector("#rule"), rules);
}

function addNewRule() {
  btnAddNewRule.hidden = btnGetResult.hidden = true;
  document.querySelector("#main").style.display = "inline";

  let currentRule = document.body.querySelector("#rule");

  currentRule.onchange = () => {
    ifMisclick(currentRule);
    document
      .querySelector("#main")
      .insertAdjacentHTML("beforeend", '<select id="key"></select>');
    let currentKey = document.body.querySelector("#key");
    fillList(currentKey, [...Object.keys(localJson.data[0])]);

    if (!localJson.condition.hasOwnProperty(currentRule.value)) {
      localJson.condition[currentRule.value] = [];
    }
    toggle(currentRule, currentKey);
  };
}

function toggle(rule, key) {
  switch (rule.value) {
    case "include":
      key.addEventListener("change", () => {
        include.keySelect(document.querySelector("#main"), key);
      });
      formCondition = include.formCondition;
      formResult = include.formResult;
      break;
    case "sort_by":
      key.addEventListener("change", () => {
        sortBy.keySelect();
      });
      formCondition = sortBy.formCondition;
      formResult = sortBy.formResult;
      break;
    case "exclude":
      key.addEventListener("change", () => {
        exclude.keySelect(document.querySelector("#main"), key);
      });
      formCondition = exclude.formCondition;
      formResult = exclude.formResult;
      break;
    // ...
  }
}

function form() {
  let currentRule = document.querySelector("#rule");
  let currentKey = document.querySelector("#key");
  try {
    formCondition(currentRule, currentKey, document.querySelector("#value"));
    formResult();
    showMainStage();
    console.log(JSON.stringify(localJson.condition));
  } catch (e) {
    console.log(e.message);
  }
}

function showMainStage() {
  btnAddNewRule.hidden = btnGetResult.hidden = false;
  btnAccept.hidden = true;
  document.querySelector("#main").style.display = "none";
  ifMisclick(document.querySelector("#key"));
  document.querySelectorAll("select").forEach((el) => (el.selectedIndex = 0));
}

function getResult() {
  if (res.data.length) {
    console.log(JSON.stringify(res, null, "\t"));
  } else {
    console.log("Sorry, we didn't find anything :(");
  }
}

function addItem(select, item) {
  let el = document.createElement("option");
  el.value, (el.text = item);
  select.add(el);
}

export const fillList = (list, data) => {
  data.forEach((el) => addItem(list, el));
  list.insertAdjacentHTML(
    "afterbegin",
    '<option value="" disabled selected hidden>Please choose...</option>'
  );
};

export function ifMisclick(elem) {
  if (elem.nextElementSibling) {
    while (elem.nextElementSibling) elem.nextElementSibling.remove();
  }
}
