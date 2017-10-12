/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */

const romanNumbersTable = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function toArabicNumber(romanNumber) {
  let number = 0;
  let index = 0;

  while (index < romanNumber.length) {
    const curLetter = romanNumber[index];
    const nextLetter = romanNumber[index + 1];
    const curArabic = romanNumbersTable[curLetter];
    const nextArabic = romanNumbersTable[nextLetter];

    if (nextArabic > curArabic) {
      number += nextArabic - curArabic;
      index += 2;
    } else {
      number += curArabic;
      index += 1;
    }
  }

  return number;
}

const targetPrototype = Object.getPrototypeOf(Number.prototype);

const proxy = new Proxy(targetPrototype, {
  get: (target, name) => (name in target ? target.name : [...new Array(toArabicNumber(name)).keys()])
});

Object.setPrototypeOf(Number.prototype, proxy);
