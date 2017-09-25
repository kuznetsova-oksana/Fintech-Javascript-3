/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  let max;
  let min;
  let str = string;

  while (str !== '') {
    const newNum = parseFloat(str);
    const newNumLength = String(newNum).length;

    if (isNaN(newNum)) {
      str = str.substr(1, str.length - 1);
    } else {
      max = (max === undefined || newNum > max) ? newNum : max;
      min = (min === undefined || newNum < min) ? newNum : min;
      str = str.substr(newNumLength, str.length - newNumLength);
    }
  }
  return { max, min };
}


/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  if (x === 0) { return 0; }
  if (x === 1) { return 1; }
  return fibonacciSimple(x - 2) + fibonacciSimple(x - 1);
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
  const cache = [0, 1];

  const fibonacci = n => {
    if (cache[n] === undefined) {
      cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    }
    return cache[n];
  };

  return fibonacci(x);
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  const rows = Math.ceil((max + 1) / cols);
  let output = '';
  let nextNum = 0;

  for (let i = 0; i < rows; i++) {
    nextNum = i;
    for (let j = 0; j < cols && nextNum <= max; j++) {
      const spacesBefore = String(nextNum).length === 1 ? ' ' : '';
      const spacesAfter = (j === cols - 1 || nextNum === max) ? '' : ' ';

      output = output + spacesBefore + nextNum + spacesAfter;
      nextNum += rows;
    }
    if (i !== (rows - 1)) {
      output += '\n';
    }
  }
  return output;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(value) {
  let output = '';
  const inputLength = value.length;

  for (let i = 0; i < inputLength;) {
    const curChar = value.charAt(i);
    let counter = 1;

    for (let j = i + 1; j < inputLength && curChar === value.charAt(j); j++) {
      counter += 1;
    }
    output += curChar;
    if (counter > 1) {
      output += counter;
    }
    i += counter;
  }
  return output;
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
