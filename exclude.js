import * as include from "./include.js";
import { numProp, localJson, res } from "./main.js";
import { formResult as numFormResult } from "./includeNum.js";

export const keySelect = include.keySelect;

export const formCondition = include.formCondition;

export function formResult() {
  let condition = localJson.condition.exclude
  if (!res.data.length) {
    res.data = [...localJson.data];
  }
  for (let i = 0; i < res.data.length; i++) {
    let flag = true;
    for (let cond of condition) {
      let key = Object.keys(cond)[0]
      if (numProp.includes(key)) {
        flag = !numFormResult(res.data[i], cond, key);
      } else {
        if (Array.isArray(cond[key])) {
          for (let el of cond[key]) {
            if (res.data[i][key] !== el) {
              flag = true;
              break;
            }
            flag = false;
          }
        } else {
          if (res.data[i][key] === cond[key]) {
            flag = false;
          }
        }
      }
      if (!flag) {
        res.data.splice(i, 1);
        i--;
      };
    }
  }
}
