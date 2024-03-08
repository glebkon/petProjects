import { createReadStream } from "fs";
import readline from "readline";

async function readNumbersFromFile(filePath) {
  try {
    // Create a readline interface
    const rl = readline.createInterface({
      input: createReadStream(filePath),
      crlfDelay: Infinity,
    });

    // Initialize an empty array to store the numbers
    const numbers = [];

    // Iterate through each line in the file
    for await (const line of rl) {
      const number = parseInt(line);
      numbers.push(number);
    }

    return numbers;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

const filePath = "10m.txt";
const arr = await readNumbersFromFile(filePath);

export default arr;
