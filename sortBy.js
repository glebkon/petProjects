import { localJson, res } from "./main.js";

export const keySelect = () => {
  document.querySelector("#btnAccept").hidden = false;
};

export const formCondition = (rule, key) => {
  localJson.condition[rule.value].push(key.value);
};

export function formResult() {
  if (!res.data.length) {
    res.data = localJson.data;
  } // применяем правило ко всем данным без фильтра
  let sortBy = localJson.condition.sort_by;
  res.data.sort((a, b) => (a[sortBy[0]] > b[sortBy[0]] ? 1 : -1));
  if (sortBy.length > 1) {
    let prevProp = sortBy[0];
    for (let prop of sortBy.slice(1)) {
      let prev = {};
      let map = new Map();
      res.data.forEach((el) => {
        if (el[prevProp] === prev[prevProp]) {
          if (compare(el, prev, prop, sortBy)) {
            if (!map.has(el[prevProp])) {
              map.set(el[prevProp], [res.data.indexOf(el) - 1, res.data.indexOf(el)]);
            } else {
              let tmp = map.get(el[prevProp]);
              tmp[1] = res.data.indexOf(el);
              map.set(el[prevProp], tmp);
            }
          }
        }
        prev = el;
      });
      prevProp = prop;

      let tmp = [];
      for (let key of map.keys()) {
        let start = map.get(key)[0];
        let end = map.get(key)[1];
        tmp = res.data.slice(start, end + 1);
        tmp.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
        res.data = [
          ...res.data.slice(0, start),
          ...tmp,
          ...res.data.slice(end + 1, res.data.length),
        ];
      }
    }
  }
}

function compare(cur, prev, prop, sortBy) {
  for (let pr of sortBy.slice(0, sortBy.indexOf(prop))) {
    if (cur[pr] !== prev[pr]) return false;
  }
  return true;
}
