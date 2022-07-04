const localJsonName = "rules";
const selectU = document.getElementById("selectUnit");
const selectCT = document.getElementById("selectConvertTo");
const selectors = document.getElementsByClassName("primeSelect");
const input = document.getElementById("inputValue");
const userInput = document.getElementById("userUnit");
const userRule = document.getElementById("userRule");
const addFields = document.getElementById("content");
const deleteFields = document.getElementById("toDeleteDiv");
const btnAdd = document.getElementById("btnAdd");
const btnDelete = document.getElementById("btnDelete");
const selectToDelete = document.getElementById("selectToDelete");

if (!localStorage.getItem(localJsonName)) {
  localStorage.setItem(
    localJsonName,
    JSON.stringify({
      m: 1,
      cm: 0.01,
      ft: 0.3048,
      in: 0.0254,
    })
  );
}
let localJson = JSON.parse(localStorage.getItem(localJsonName));

function addItem(select, item) {
  let el = document.createElement("option");
  el.value, (el.text = item);
  select.add(el);
}

function fillLists(lists, data, clear = false) {
  for (let list of lists) {
    if (clear) {
      for (let i = list.length - 1; i >= 0; i--) {
        list.remove(i);
      }
    }
    if (Array.isArray(data)) {
      data.forEach((el) => addItem(list, el));
    } else {
      addItem(list, data);
    }
  }
}

function clear() {
  input.value = userInput.value = userRule.value = "";
  selectCT.selectedIndex =
    selectU.selectedIndex =
    selectToDelete.selectedIndex =
      0;
}

function show() {
  try {
    errorHandler(input.value);
    const inputJson = {
      distance: { unit: selectU.value, value: +input.value },
      convert_to: selectCT.value,
    };

    const outputJson = {
      unit: inputJson.convert_to,
      value: +(
        (inputJson.distance.value / localJson[inputJson.convert_to]) *
        localJson[inputJson.distance.unit]
      ).toFixed(2),
    };
    console.log("Input:", JSON.stringify(inputJson));
    console.log("Output:", JSON.stringify(outputJson));
  } catch (e) {
    console.log(e.message);
  }
  clear();
}

function switchHidden(ch = 1) {
  ch !== 1
    ? (deleteFields.hidden = !deleteFields.hidden)
    : (addFields.hidden = !addFields.hidden);
  btnAdd.hidden = !btnAdd.hidden;
  btnDelete.hidden = !btnDelete.hidden;
}

function errorHandler(input, isNumber = 1) {
  if (input === "") throw new Error("Please fill in all fields");
  if (isNumber === 1) {
    if (isNaN(+input))
      throw new Error(
        `Invalid data type: '${input}' \nInput supposed to be a number value`
      );
  } else if (!isNaN(+userInput.value))
    throw new Error(
      `Invalid data type: '${userInput.value}' \nInput supposed to be a string value`
    );
}

function editJson(ch = 1) {
  if (ch === 0) {
    delete localJson[selectToDelete.value];
    fillLists(selectors, Object.keys(localJson), true);
  } else {
    try {
      if (localJson.hasOwnProperty(userInput.value))
        throw new Error(`'${userInput.value}' is already available`);
      errorHandler(userInput.value, 0);
      errorHandler(userRule.value);
      localJson[userInput.value] = +userRule.value;
      fillLists(selectors, userInput.value);
    } catch (e) {
      console.log(e.message);
    }
  }
  localStorage.setItem(localJsonName, JSON.stringify(localJson));
  back(ch);
}

function back(ch = 1) {
  switchHidden(ch);
  clear();
}

fillLists(selectors, Object.keys(localJson));