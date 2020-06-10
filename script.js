'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Фриланс';
let mission = 1000000;
let addExpenses = prompt('Перечислите возможные расходы через запятую', '');
let deposit = confirm('Есть ли у вас депозит в банке?');
let budgetDay;
let expenses = [];

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');

let showTypeOf = function (data) {
  console.log(data, typeof(data));
};

function getExpensesMonth() {
  let sum = 0;
  let result = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      sum = prompt('Во сколько это обойдется?');

      if (isNumber(sum)) {
        result += +sum;
      }
    } while (!isNumber(sum));
  }

  console.log('обязательная статья расходов: ' + expenses);
  return result;
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function () {
  if (budgetDay > 1200) return ('У вас высокий уровень дохода');
  else if (budgetDay > 600 && budgetDay < 1200) return ('У вас средний уровень дохода');
  else if (budgetDay < 0) return ('Что то пошло не так');
  else if (budgetDay === 0) return ('Ваш доход 0');
  else if (budgetDay < 600) return ('К сожалению у вас уровень дохода ниже среднего');
  else if (budgetDay === 1200) return ('Ваш доход 1200');
  else if (budgetDay === 600) return ('Ваш доход 600');
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ' + expensesAmount);
console.log('Возможные расходы: ' + addExpenses);


if (getTargetMonth() < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута');
}

console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome());
