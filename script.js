'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы через запятую', '');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let sum = 0;
    let expenditure;

    for (let i = 0; i < 2; i++) {
      expenditure = prompt('Введите обязательную статью расходов?');

      do {
        sum = prompt('Во сколько это обойдется?');

        if (isNumber(sum)) {
          appData.expenses[expenditure] = +sum;
        }
      } while (!isNumber(sum));
    }
  },
  getExpensesMonth: function () {
    let result = 0;

    for (let key in appData.expenses) {
      result += appData.expenses[key];
    }

    return result;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    let budgetDay = appData.budgetDay;

    if (budgetDay > 1200) return ('У вас высокий уровень дохода');
    else if (budgetDay > 600 && budgetDay < 1200) return ('У вас средний уровень дохода');
    else if (budgetDay < 0) return ('Что то пошло не так');
    else if (budgetDay === 0) return ('Ваш доход 0');
    else if (budgetDay < 600) return ('К сожалению у вас уровень дохода ниже среднего');
    else if (budgetDay === 1200) return ('Ваш доход 1200');
    else if (budgetDay === 600) return ('Ваш доход 600');
  }
};

appData.asking();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log('Цель будет достугнута за: ' + appData.getTargetMonth() + ' (месяцев)');
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for(let key in appData){
  console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
}
