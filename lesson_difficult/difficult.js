'use strict';


//1
let arr = ['1234','2345','3456','4567','213','23445436','566456546'];

for (let i = 0; i < arr.length; i++) {
  let strFirst;
  strFirst = arr[i].split('');

  if (+strFirst[0] === 2 || +strFirst[0] === 4) {
    console.log(strFirst.join(''));
  } else {
    console.log(strFirst.join('') + ' Такое число не подойдет, должно быть значение, которое начинается с "2" или "4"');
  }
}

//2
let result;

for (let i = 1; i <= 100; i++) {
  for (let j = 2; j <= 100; j++) {
    if (i % j !== 0 || i === j) {
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