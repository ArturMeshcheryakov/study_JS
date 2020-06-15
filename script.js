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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome = '';
      let cashIncome = '';

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');

        if (isNumber(itemIncome) || itemIncome === '') {
          alert('Такое заполнение не подойдет');
        } else {
          do {
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            appData.income[itemIncome] = cashIncome;

            if (!isNumber(cashIncome)) {
              alert('Такое значение не подойдет');
            }
          } while (!isNumber(cashIncome));
        }
      } while (isNumber(itemIncome) || itemIncome === '');
    }

    let addExpenses = prompt('Перечислите возможные расходы через запятую', '');
    appData.addExpenses = addExpenses.toLowerCase().split(',');

    if (appData.addExpenses !== '') {
      appData.addExpensesCase(appData.addExpenses);
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let sum = 0;
    let expenditure;

    for (let i = 0; i < 2; i++) {
      do {
        expenditure = prompt('Введите обязательную статью расходов?');

        if (isNumber(expenditure) || expenditure === '') {
          alert('Такое заполнение не подойдет');
        } else {
          do {
            sum = prompt('Во сколько это обойдется?');

            if (isNumber(sum)) {
              appData.expenses[expenditure] = +sum;
            } else {
              alert('Такое значение не подойдет');
            }
          } while (!isNumber(sum));
        }
      } while (isNumber(expenditure) || expenditure === '');
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
        if (isNumber(appData.percentDeposit)) {
          do {
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

            if (!isNumber(appData.moneyDeposit)) {
              alert('Такое значение не подойдет');
            }
          } while (!isNumber(appData.moneyDeposit));
        } else {
          alert('Такое значение не подойдет');
        }
      } while (!isNumber(appData.percentDeposit));


    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
  addExpensesCase: function (data) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      let str = data[i].trim();
      arr[i] = str[0].toUpperCase() + str.slice(1);
    }

    console.log(arr.join(', '));
  }
};

appData.asking();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log('Цель будет достугнута за: ' + appData.getTargetMonth() + ' (месяцев)');
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
}

