import { map } from "./script.js";

function paths() {
  let arr = [];
  arr.push([1]);
  for (let i = 1; i < map.size; i++) {
    let a = map.get(i).answ1[1];
    let b = map.get(i).answ2[1];
    let indx = arr.indexOf(arr.find((el) => el.includes(i)));
    if (a === -1 && b === -1) arr[indx].push("ab");
    else if (a !== -1 && b !== -1) {
      arr.push([...arr[indx], "a", a]);
      arr.push([...arr[indx], "b", b]);
      arr.splice(indx, 1);
    } else {
      if (a !== -1) arr[indx].push("a", a);
      else arr.push([...arr[indx], "a"]);
      if (b !== -1) arr[indx].push("b", b);
      else arr.push([...arr[indx], "b"]);
    }
  }
  return arr;
}

export function formJson() {
  let arr = paths();
  let json = { paths: { number: 0, list: [] } };
  json.paths.number = arr.length;
  let k = 0;
  for (let el of arr) {
    json.paths.list.push([]);
    for (let i = 0; i < el.length; i += 2) {
      let tmp = {};
      let answer;
      switch (el[i + 1]) {
        case "a":
          answer = map.get(el[i]).answ1[0];
          break;
        case "b":
          answer = map.get(el[i]).answ2[0];
          break;
        case "ab":
          answer = `${map.get(el[i]).answ1[0]}/${map.get(el[i]).answ2[0]}`;
      }
      tmp[map.get(el[i]).q] = answer;
      json.paths.list[k].push(tmp);
    }
    k++;
  }
  return json;
}
