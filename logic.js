//Logic of Lexic analizer
const characters = new RegExp("^[a-zA-Z]+$");
const numbers = new RegExp("^[0-9]+$");

const isCharacter = (input) => characters.test(input);
const isNumber = (input) => numbers.test(input);
const mapCharToTag = (input) => {
  //this strategy is called early return, to gain time in the process;
  if (input === ">") return "<greather than>";
  if (input === ">=") return "<equal/greather than>";
  if (input === "<") return "<lower than>";
  if (input === "<=") return "<equal/lower than>";
  if (input === "=") return "<asign>";
  if (input === "!") return "<error>";
  if (input === "==") return "<equals>";
  if (isCharacter(input)) return `<var>`;
  if (input === ";") return "<term>";
  if (input === "!=") return "<distinct>"; 
  if (input === "(") return "<open>";
  if (input === ")") return "<close>";  
  return `<num>`;
};

//Lexic analizer
module.exports = { analize: (input) => {
  const arr = [];
  //
  let current = 0;
  //Principio de transparencia referencial
  for (let i = 0; i < input.length; i++) {
    if (isCharacter(input[i])) {
      if (arr[current]) {
        arr[current] = arr[current].concat(input[i]);
      } else {
        arr[current] = input[i];
      }
      if (!isCharacter(input[i + 1]) && !isNumber(input[i + 1])) {
        current++;
      }
    } else if (input[i] === ">" || input[i] === "<") {
      arr[current] = input[i];
      input[i + 1] !== "=" && current++;
    } else if (isNumber(input[i])) {
      if (arr[current]) {
        arr[current] = arr[current].concat(input[i]);
      } else {
        arr[current] = input[i];
      }
      !isNumber(input[i + 1]) && current++;
    } else if (input[i] === "!") {
      arr[current] = input[i];
      input[i + 1] !== "=" && current++;
    } else if (input[i] === "=") {
      if (arr[current]) {
        arr[current] = arr[current].concat(input[i]);
      } else {
        arr[current] = input[i];
      }
      input[i + 1] !== "=" && current++;
    } else if (input[i] === ";") {
      arr[current] = input[i];
      current++;
    }
  }
  return arr.map(mapCharToTag);
  }
};