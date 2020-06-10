'use strict';


//1
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let arr = [];

for (let i = 0; i < 7; i++) {
  let number;
  do {
    number = prompt('Введите число');

    if (isNumber(number)) {
      arr[i] = number;
    } else {
      alert('нужно ввести число!');
    }
  } while (!isNumber(number));
}


for (let i = 0; i < arr.length; i++) {

  let strFirst;
  strFirst = arr[i].split('');

  if (+strFirst[0] === 2 || +strFirst[0] === 4) {
    console.log(strFirst.join(''));
  } else {
    console.log(strFirst.join('') + ' Такое число не подойдет, должно быть значений, которые начинаются с "2" или "4"');
  }
}

//2
let result;
let test;

for (let i = 1; i <= 100; i++) {
  for (let j = 2; j <= 100; j++) {
    if (i % j !== 0 || i === j) {
      test = i;
      result = true;
    } else {
      result = false;
      break;
    }
  }

  if (result === true) {
    console.log(i + ' - Делители этого числа: 1 и ' + i);
  }
}