import merge_piles from "./merge.js";
import arr from "./input.js";

function arrStatsCalculation(arr) {
  const n = arr.length;
  const mid = Math.floor((n - 1) / 2);
  let sum = arr[0];

  const piles = [[arr[0]]];
  let pileIndex = 0;
  let lds = [arr[0]];
  let lis = [arr[0]];
  let increasingSequence = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < piles[pileIndex][piles[pileIndex].length - 1]) {
      piles[pileIndex].push(arr[i]);

      if (increasingSequence.length) {
        if (lis.length < increasingSequence.length) {
          lis.splice(0, lis.length);
          lis = lis.concat(increasingSequence);
        }
        increasingSequence.splice(0, increasingSequence.length);
      }
    } else {
      if (lds.length < piles[pileIndex].length) {
        lds.splice(0, lds.length);
        lds = lds.concat(piles[pileIndex]);
      }
      if (!increasingSequence.length) increasingSequence.push(arr[i - 1]);
      increasingSequence.push(arr[i]);
      pileIndex++;
      piles.push([arr[i]]);
    }
    sum += arr[i];
  }

  const sorted = merge_piles(piles);

  return {
    min: sorted[0],
    max: sorted[n - 1],
    median:
      n % 2 ? Math.floor((sorted[mid] + sorted[mid + 1]) / 2) : sorted[mid],
    average: Math.floor(sum / n),
    longestDecreasingSubequence: lds,
    longestIncreasingSubequence: lis,
  };
}

console.log(arrStatsCalculation(arr));
