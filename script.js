'use strict';

let money = +prompt('Ваш месячный доход?', '50000');
let income = 'Фриланс';
let mission = 1000000;
let budgetDay;
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?', 'Комуналка');
let amount1 = +prompt('Во сколько это обойдется?', '10000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Еда');
let amount2 = +prompt('Во сколько это обойдется?', '10000');
let addExpenses = [expenses1, expenses2];

let showTypeOf = function (data) {
  console.log(data, typeof(data));
};

function getExpensesMonth() {
  return amount1 + amount2;
}

function getAccumulatedMonth() {
  return money - getExpensesMonth();
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
console.log('Расходы за месяц: ' + getExpensesMonth());
console.log('Возможные расходы: ' + addExpenses);
console.log('Срок достижения цели в месяцах: ' + getTargetMonth());
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome());
